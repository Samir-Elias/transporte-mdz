# 🚌 Transporte MDZ - Backend

Backend API para la aplicación de transporte público de Mendoza, Argentina.

## 🚀 Características

- **Express.js** - Framework web rápido y minimalista
- **MongoDB** - Base de datos NoSQL
- **JWT** - Autenticación segura
- **Rate Limiting** - Protección contra spam
- **Logging** - Sistema de logs con Winston
- **Validación** - Validación de datos con express-validator
- **Seguridad** - Helmet, CORS, y otras medidas de seguridad
- **APIs Externas** - Integración con Mendoza Tránsito y Google Maps

## 📋 Prerrequisitos

- Node.js >= 18.0.0
- npm >= 8.0.0
- MongoDB (local o Atlas)
- Redis (opcional)

## 🛠️ Instalación

1. **Clonar el repositorio**
   ```bash
   cd backend
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   ```bash
   cp env.example .env
   # Editar .env con tus configuraciones
   ```

4. **Iniciar en desarrollo**
   ```bash
   npm run dev
   ```

## 🔧 Scripts Disponibles

- `npm start` - Iniciar servidor en producción
- `npm run dev` - Iniciar servidor en desarrollo con nodemon
- `npm test` - Ejecutar tests
- `npm run lint` - Verificar código con ESLint
- `npm run lint:fix` - Corregir problemas de ESLint automáticamente

## 🌐 Endpoints de la API

### Autenticación
- `POST /api/auth/register` - Registro de usuarios
- `POST /api/auth/login` - Inicio de sesión
- `POST /api/auth/refresh` - Renovar token

### Usuarios
- `GET /api/users/profile` - Obtener perfil del usuario
- `PUT /api/users/profile` - Actualizar perfil
- `DELETE /api/users/profile` - Eliminar cuenta

### Rutas
- `GET /api/routes` - Obtener rutas disponibles
- `POST /api/routes/plan` - Planificar ruta
- `GET /api/routes/:id` - Obtener detalles de ruta

### Pagos
- `POST /api/payments/create` - Crear pago
- `GET /api/payments/history` - Historial de pagos
- `POST /api/payments/verify` - Verificar pago

### Notificaciones
- `GET /api/notifications` - Obtener notificaciones
- `POST /api/notifications/mark-read` - Marcar como leída
- `DELETE /api/notifications/:id` - Eliminar notificación

### Incidentes
- `POST /api/incidents/report` - Reportar incidente
- `GET /api/incidents` - Obtener incidentes
- `PUT /api/incidents/:id` - Actualizar incidente

### Mendoza Tránsito
- `GET /api/mendotran/buses` - Obtener buses en tiempo real
- `GET /api/mendotran/stops` - Obtener paradas
- `GET /api/mendotran/routes` - Obtener rutas de Mendotran

## 🔐 Variables de Entorno

| Variable | Descripción | Valor por defecto |
|----------|-------------|-------------------|
| `NODE_ENV` | Entorno de ejecución | `development` |
| `PORT` | Puerto del servidor | `5000` |
| `MONGODB_URI` | URI de conexión a MongoDB | `mongodb://localhost:27017/transporte-mdz` |
| `JWT_SECRET` | Clave secreta para JWT | Requerida |
| `MENDOTRAN_API_URL` | URL de la API de Mendotran | Requerida |
| `GOOGLE_MAPS_API_KEY` | Clave de API de Google Maps | Requerida |

## 🗄️ Estructura de la Base de Datos

### Colecciones principales:
- **users** - Información de usuarios
- **routes** - Rutas de transporte
- **payments** - Historial de pagos
- **notifications** - Notificaciones del sistema
- **incidents** - Reportes de incidentes
- **buses** - Información de buses en tiempo real

## 🔒 Seguridad

- **Helmet** - Headers de seguridad HTTP
- **CORS** - Control de acceso entre dominios
- **Rate Limiting** - Protección contra ataques DDoS
- **JWT** - Autenticación stateless
- **Validación** - Validación de entrada de datos
- **Sanitización** - Limpieza de datos de entrada

## 📊 Logging

El sistema utiliza Winston para logging con:
- Logs en consola (desarrollo)
- Logs en archivos (producción)
- Rotación automática de archivos
- Diferentes niveles de log

## 🧪 Testing

```bash
# Ejecutar todos los tests
npm test

# Ejecutar tests en modo watch
npm run test:watch

# Ejecutar tests con coverage
npm run test:coverage
```

## 🚀 Despliegue

### Producción
```bash
npm start
```

### Docker (próximamente)
```bash
docker build -t transporte-mdz-backend .
docker run -p 5000:5000 transporte-mdz-backend
```

## 📝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

## 🆘 Soporte

Si tienes problemas o preguntas:
- Abre un issue en GitHub
- Contacta al equipo de desarrollo
- Revisa la documentación de la API

---

**Desarrollado con ❤️ para Mendoza, Argentina**
