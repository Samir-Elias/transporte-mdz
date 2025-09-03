const mongoose = require('mongoose');
const logger = require('./logger');

const connectDB = async () => {
  try {
    console.log('🔍 Iniciando connectDB...');
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/transporte_mdz';
    console.log('📋 URI de MongoDB:', mongoURI.substring(0, 50) + '...');
    
    const options = {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      maxPoolSize: 10,
      serverApi: {
        version: '1',
        strict: true,
        deprecationErrors: true,
      }
    };
    console.log('⚙️ Opciones de conexión configuradas');

    console.log('🔄 Intentando conectar a MongoDB...');
    const conn = await mongoose.connect(mongoURI, options);
    console.log('✅ Conexión exitosa a MongoDB!');
    console.log('📍 Host:', conn.connection.host);
    console.log('🗄️ Database:', conn.connection.name);
    
    logger.info(`✅ MongoDB conectado: ${conn.connection.host}`);
    
    // Configurar eventos de conexión
    mongoose.connection.on('connected', () => {
      logger.info('🟢 Mongoose conectado a MongoDB');
      console.log('🟢 Evento: Mongoose conectado a MongoDB');
    });

    mongoose.connection.on('error', (err) => {
      logger.error('🔴 Error de conexión MongoDB:', err);
    });

    mongoose.connection.on('disconnected', () => {
      logger.warn('🟡 Mongoose desconectado de MongoDB');
    });

    // Manejar cierre graceful de la aplicación
    process.on('SIGINT', async () => {
      try {
        await mongoose.connection.close();
        logger.info('MongoDB desconectado por cierre de la aplicación');
        process.exit(0);
      } catch (err) {
        logger.error('Error al cerrar conexión MongoDB:', err);
        process.exit(1);
      }
    });

    return conn;
  } catch (error) {
    console.log('❌ ERROR en connectDB:');
    console.log('🔴 Mensaje:', error.message);
    console.log('🔴 Nombre:', error.name);
    console.log('🔴 Stack:', error.stack);
    
    logger.error('❌ Error conectando a MongoDB:', error.message);
    
    // En desarrollo, intentar conectar a MongoDB local
    if (process.env.NODE_ENV === 'development') {
      logger.info('🔄 Intentando conectar a MongoDB local...');
      try {
        const localConn = await mongoose.connect('mongodb://localhost:27017/transporte_mdz', {
          serverSelectionTimeoutMS: 10000,
          socketTimeoutMS: 45000,
        });
        logger.info('✅ Conectado a MongoDB local');
        return localConn;
      } catch (localError) {
        logger.error('❌ No se pudo conectar a MongoDB local:', localError.message);
        logger.info('💡 Para desarrollo local, instala MongoDB o usa MongoDB Atlas');
      }
    }
    
    // En producción, fallar rápido
    if (process.env.NODE_ENV === 'production') {
      logger.error('🚨 Error crítico de base de datos en producción');
      process.exit(1);
    }
    
    throw error;
  }
};

// Función para verificar el estado de la conexión
const getConnectionStatus = () => {
  const state = mongoose.connection.readyState;
  const states = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting'
  };
  return states[state] || 'unknown';
};

// Función para obtener estadísticas de la conexión
const getConnectionStats = () => {
  return {
    host: mongoose.connection.host,
    port: mongoose.connection.port,
    name: mongoose.connection.name,
    readyState: getConnectionStatus(),
    collections: Object.keys(mongoose.connection.collections).length
  };
};

module.exports = { connectDB, getConnectionStatus, getConnectionStats };
