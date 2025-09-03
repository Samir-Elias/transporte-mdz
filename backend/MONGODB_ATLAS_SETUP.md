# 🗄️ Configuración MongoDB Atlas para Portfolio

## 🚀 Pasos para MongoDB Atlas (Gratis)

### 1. Crear cuenta en MongoDB Atlas
- Ve a [mongodb.com/atlas](https://mongodb.com/atlas)
- Haz clic en "Try Free"
- Completa el registro con tu email

### 2. Crear Cluster
- Selecciona el plan **FREE** (M0)
- Elige un proveedor (AWS, Google Cloud, Azure)
- Selecciona una región cercana (ej: São Paulo para Argentina)
- Haz clic en "Create"

### 3. Configurar Seguridad
- **Database Access**: Crea un usuario de base de datos
  - Username: `transporte_mdz_user`
  - Password: `[genera una contraseña segura]`
  - Role: `Read and write to any database`
- **Network Access**: Permite acceso desde cualquier lugar
  - IP Address: `0.0.0.0/0` (para desarrollo)
  - O agrega IPs específicas para producción

### 4. Obtener URI de Conexión
- Haz clic en "Connect"
- Selecciona "Connect your application"
- Copia la URI que se ve así:
```
mongodb+srv://transporte_mdz_user:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

### 5. Configurar .env
Reemplaza en tu archivo `.env`:
```env
MONGODB_URI=mongodb+srv://transporte_mdz_user:TU_PASSWORD@cluster0.xxxxx.mongodb.net/transporte_mdz?retryWrites=true&w=majority
```

## 🔧 Configuración del Proyecto

### 1. Instalar dependencias
```bash
cd backend
npm install
```

### 2. Ejecutar configuración
```bash
npm run setup
```

### 3. Editar .env
Edita el archivo `.env` con tu URI de MongoDB Atlas

### 4. Probar conexión
```bash
npm run dev
```

## 🌐 Deploy para Portfolio

### Opción 1: Render (Recomendado - Gratis)
1. Ve a [render.com](https://render.com)
2. Conecta tu repositorio de GitHub
3. Crea un nuevo **Web Service**
4. Configuración:
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Environment Variables**: Copia todas las variables de tu `.env`

### Opción 2: Railway
1. Ve a [railway.app](https://railway.app)
2. Conecta tu repositorio
3. Agrega las variables de entorno
4. Deploy automático

### Opción 3: Heroku (Requiere tarjeta de crédito)
1. Ve a [heroku.com](https://heroku.com)
2. Crea una nueva app
3. Conecta tu repositorio
4. Configura las variables de entorno

## 📱 Frontend para Portfolio

### Deploy en Vercel (Gratis)
1. Ve a [vercel.com](https://vercel.com)
2. Conecta tu repositorio
3. Configuración automática para React Native Web
4. Deploy instantáneo

### Deploy en Netlify (Gratis)
1. Ve a [netlify.com](https://netlify.com)
2. Conecta tu repositorio
3. Build command: `cd frontend && npm run build`
4. Publish directory: `frontend/build`

## 🔐 Variables de Entorno para Producción

```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://usuario:password@cluster.mongodb.net/transporte_mdz
JWT_SECRET=clave_super_secreta_y_larga_para_produccion
FRONTEND_URL=https://tu-dominio.com
CORS_ORIGIN=https://tu-dominio.com
```

## 📊 Monitoreo y Logs

### MongoDB Atlas
- Dashboard con métricas en tiempo real
- Alertas automáticas
- Backup automático

### Render/Railway
- Logs en tiempo real
- Métricas de rendimiento
- Alertas de errores

## 🚨 Troubleshooting

### Error de conexión MongoDB
- Verifica que la URI sea correcta
- Asegúrate de que la IP esté permitida
- Verifica usuario y contraseña

### Error de CORS
- Configura `CORS_ORIGIN` correctamente
- Verifica que `FRONTEND_URL` coincida

### Error de JWT
- Cambia `JWT_SECRET` por una clave segura
- Verifica que `JWT_EXPIRES_IN` sea válido

## 🎯 Próximos Pasos

1. ✅ Configurar MongoDB Atlas
2. ✅ Configurar variables de entorno
3. 🔄 Deploy en Render/Railway
4. 🔄 Deploy frontend en Vercel/Netlify
5. 🔄 Configurar dominio personalizado
6. 🔄 Agregar SSL/HTTPS
7. 🔄 Configurar monitoreo

## 📞 Soporte

- **MongoDB Atlas**: [docs.mongodb.com/atlas](https://docs.mongodb.com/atlas)
- **Render**: [render.com/docs](https://render.com/docs)
- **Railway**: [docs.railway.app](https://docs.railway.app)

---

**✨ ¡Con esta configuración tendrás tu proyecto corriendo 24/7 para tu portfolio!**
