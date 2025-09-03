const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

// Importar configuraciones
const { connectDB, getConnectionStatus, getConnectionStats } = require('./config/database');
const logger = require('./config/logger');

// Importar rutas
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const routeRoutes = require('./routes/routes');
const paymentRoutes = require('./routes/payments');
const notificationRoutes = require('./routes/notifications');
const incidentRoutes = require('./routes/incidents');
const mendotranRoutes = require('./routes/mendotran');

const app = express();
const PORT = process.env.PORT || 5000;

// Configuración de rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // máximo 100 requests por ventana
  message: 'Demasiadas requests desde esta IP, intenta nuevamente en 15 minutos.',
  standardHeaders: true,
  legacyHeaders: false,
});

// Middlewares de seguridad y optimización
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(compression());
app.use(limiter);
app.use(morgan('combined', { stream: { write: message => logger.info(message.trim()) } }));

// Middlewares de parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Middleware de logging personalizado
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

// Rutas de la API
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/routes', routeRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/incidents', incidentRoutes);
app.use('/api/mendotran', mendotranRoutes);

// Ruta de health check
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'Transporte MDZ API funcionando correctamente',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    database: {
      status: getConnectionStatus(),
      stats: getConnectionStats()
    }
  });
});

// Ruta raíz
app.get('/', (req, res) => {
  res.json({
    message: 'Bienvenido a la API de Transporte MDZ',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      users: '/api/users',
      routes: '/api/routes',
      payments: '/api/payments',
      notifications: '/api/notifications',
      incidents: '/api/incidents',
      mendotran: '/api/mendotran'
    }
  });
});

// Middleware de manejo de errores
app.use((err, req, res, next) => {
  logger.error(`Error: ${err.message}`);
  
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      error: 'Error de validación',
      details: err.message
    });
  }
  
  if (err.name === 'CastError') {
    return res.status(400).json({
      error: 'ID inválido',
      details: 'El formato del ID proporcionado no es válido'
    });
  }
  
  if (err.code === 11000) {
    return res.status(400).json({
      error: 'Dato duplicado',
      details: 'El registro ya existe en la base de datos'
    });
  }
  
  res.status(err.status || 500).json({
    error: 'Error interno del servidor',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Algo salió mal'
  });
});

// Middleware para rutas no encontradas
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Ruta no encontrada',
    message: `La ruta ${req.originalUrl} no existe en esta API`
  });
});

// Función para iniciar el servidor
const startServer = async () => {
  try {
    // Conectar a la base de datos
    await connectDB();
    logger.info('✅ Base de datos conectada exitosamente');
    
    // Iniciar servidor
    app.listen(PORT, () => {
      logger.info(`🚀 Servidor iniciado en puerto ${PORT}`);
      logger.info(`📱 API disponible en: http://localhost:${PORT}`);
      logger.info(`🔍 Health check: http://localhost:${PORT}/api/health`);
    });
  } catch (error) {
    logger.error('❌ Error al iniciar el servidor:', error);
    process.exit(1);
  }
};

// Manejo de señales de terminación
process.on('SIGTERM', () => {
  logger.info('SIGTERM recibido, cerrando servidor...');
  process.exit(0);
});

process.on('SIGINT', () => {
  logger.info('SIGINT recibido, cerrando servidor...');
  process.exit(0);
});

// Iniciar servidor
startServer();
