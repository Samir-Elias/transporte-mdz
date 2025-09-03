const mongoose = require('mongoose');
const logger = require('./logger');

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/transporte-mdz';
    
    const conn = await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });

    logger.info(`✅ MongoDB conectado: ${conn.connection.host}`);
    
    // Configurar eventos de conexión
    mongoose.connection.on('error', (err) => {
      logger.error('❌ Error de MongoDB:', err);
    });

    mongoose.connection.on('disconnected', () => {
      logger.warn('⚠️ MongoDB desconectado');
    });

    mongoose.connection.on('reconnected', () => {
      logger.info('🔄 MongoDB reconectado');
    });

    // Manejo de señales de terminación
    process.on('SIGINT', async () => {
      try {
        await mongoose.connection.close();
        logger.info('✅ Conexión a MongoDB cerrada');
        process.exit(0);
      } catch (err) {
        logger.error('❌ Error al cerrar conexión MongoDB:', err);
        process.exit(1);
      }
    });

  } catch (error) {
    logger.error('❌ Error al conectar a MongoDB:', error.message);
    throw error;
  }
};

module.exports = connectDB;
