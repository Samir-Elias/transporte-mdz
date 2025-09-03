#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🚀 Configurando Transporte MDZ Backend...\n');

// Verificar si existe el archivo .env
const envPath = path.join(__dirname, '.env');
const envExamplePath = path.join(__dirname, 'env.example');

if (!fs.existsSync(envPath)) {
  console.log('📝 Creando archivo .env...');
  
  if (fs.existsSync(envExamplePath)) {
    // Copiar desde env.example
    const envContent = fs.readFileSync(envExamplePath, 'utf8');
    fs.writeFileSync(envPath, envContent);
    console.log('✅ Archivo .env creado desde env.example');
  } else {
    // Crear .env básico
    const basicEnv = `# Configuración del servidor
PORT=5000
NODE_ENV=development

# Configuración de la base de datos
MONGODB_URI=mongodb://localhost:27017/transporte_mdz

# Configuración JWT
JWT_SECRET=transporte_mdz_jwt_secret_2024_super_seguro
JWT_EXPIRES_IN=7d

# Configuración del frontend
FRONTEND_URL=http://localhost:3000

# Configuración de logging
LOG_LEVEL=info
LOG_FILE=logs/app.log

# Configuración de rate limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
`;
    
    fs.writeFileSync(envPath, basicEnv);
    console.log('✅ Archivo .env básico creado');
  }
  
  console.log('\n📋 IMPORTANTE: Edita el archivo .env con tus configuraciones reales');
  console.log('   - MONGODB_URI: Para MongoDB Atlas o local');
  console.log('   - JWT_SECRET: Cambia por una clave segura');
  console.log('   - Otras APIs según necesites\n');
} else {
  console.log('✅ Archivo .env ya existe');
}

// Crear directorio de logs si no existe
const logsDir = path.join(__dirname, 'logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
  console.log('✅ Directorio logs creado');
}

// Verificar dependencias
console.log('\n📦 Verificando dependencias...');
const packagePath = path.join(__dirname, 'package.json');

if (fs.existsSync(packagePath)) {
  const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
  console.log(`✅ Package.json encontrado - Versión: ${packageJson.version}`);
  
  if (packageJson.dependencies) {
    console.log(`📋 Dependencias principales: ${Object.keys(packageJson.dependencies).length}`);
  }
} else {
  console.log('❌ Package.json no encontrado');
}

// Instrucciones finales
console.log('\n🎯 Próximos pasos:');
console.log('1. Edita el archivo .env con tus configuraciones');
console.log('2. Para MongoDB Atlas:');
console.log('   - Ve a mongodb.com/atlas');
console.log('   - Crea un cluster gratuito');
console.log('   - Copia la URI de conexión al .env');
console.log('3. Ejecuta: npm install');
console.log('4. Ejecuta: npm run dev');
console.log('\n🌐 Para portfolio:');
console.log('- Usa MongoDB Atlas (gratis)');
console.log('- Deploy en Render/Railway (gratis)');
console.log('- Frontend en Vercel/Netlify (gratis)');

console.log('\n✨ ¡Configuración completada!');
