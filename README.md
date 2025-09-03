# 🚌 Transporte MDZ

**Aplicación móvil para mejorar la experiencia del transporte público en Mendoza, Argentina**

## 📱 Descripción

Transporte MDZ es una aplicación móvil desarrollada en React Native que busca revolucionar la experiencia del transporte público en Mendoza. La aplicación proporciona información en tiempo real sobre rutas, horarios, pagos y notificaciones para facilitar los viajes de los usuarios.

## ✨ Funcionalidades

### 🎯 MVP (Funcionalidades Core)
- **🗺️ Mapa Interactivo**: Visualización de paradas y rutas de buses
- **🚏 Planificación de Rutas**: Búsqueda de la mejor ruta entre dos puntos
- **⏰ Tiempos de Llegada**: Información en tiempo real de llegadas
- **💳 Sistema de Pagos**: Integración con MercadoPago para compra de pasajes
- **🔔 Notificaciones Push**: Alertas sobre retrasos, desvíos y actualizaciones
- **⚠️ Reporte de Incidentes**: Sistema para reportar problemas en el servicio

### 🚀 Funcionalidades Futuras
- **📊 Historial de Viajes**: Seguimiento de viajes realizados
- **⭐ Favoritos**: Rutas y paradas favoritas del usuario
- **🌐 API Mendotran**: Integración con APIs oficiales de transporte
- **⭐ Sistema de Calificaciones**: Evaluación del servicio
- **💬 Chat en Vivo**: Soporte técnico integrado

## 🛠️ Tecnologías

### Frontend (React Native)
- **React Native** + **Expo**
- **React Navigation** para navegación
- **React Context** para estado global
- **Animated API** para animaciones
- **Custom Hooks** para lógica reutilizable

### Backend (Node.js)
- **Node.js** + **Express**
- **MongoDB** + **Mongoose**
- **JWT** para autenticación
- **Winston** para logging
- **Helmet** + **CORS** para seguridad
- **Rate Limiting** para protección

### APIs y Servicios
- **Mendotran API** (futuro)
- **Google Maps API** (futuro)
- **MercadoPago** para pagos
- **Push Notifications**

## 📁 Estructura del Proyecto

```
transporte-mdz/
├── frontend/                 # Aplicación React Native
│   ├── src/
│   │   ├── components/      # Componentes reutilizables
│   │   ├── screens/         # Pantallas de la aplicación
│   │   ├── navigation/      # Configuración de navegación
│   │   ├── hooks/          # Custom hooks
│   │   ├── services/       # Servicios de API
│   │   ├── styles/         # Estilos globales
│   │   ├── data/           # Datos simulados
│   │   └── utils/          # Utilidades
│   ├── assets/             # Imágenes y recursos
│   └── package.json
├── backend/                 # Servidor Node.js
│   ├── src/
│   │   ├── routes/         # Rutas de la API
│   │   ├── controllers/    # Controladores
│   │   ├── models/         # Modelos de MongoDB
│   │   ├── services/       # Lógica de negocio
│   │   ├── middlewares/    # Middlewares
│   │   ├── config/         # Configuraciones
│   │   └── utils/          # Utilidades
│   └── package.json
└── README.md
```

## 🚀 Instalación y Configuración

### Prerrequisitos
- **Node.js** (v16 o superior)
- **npm** o **yarn**
- **Expo CLI** (`npm install -g @expo/cli`)
- **MongoDB** (local o Atlas)

### Frontend
```bash
cd frontend
npm install
npm start
```

### Backend
```bash
cd backend
npm install
# Crear archivo .env basado en .env.example
npm run dev
```

### Variables de Entorno
Crear archivo `.env` en la carpeta `backend/`:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/transporte_mdz
JWT_SECRET=tu_jwt_secret_aqui
FRONTEND_URL=http://localhost:3000
```

## 📱 Uso de la Aplicación

### Pantalla Principal
- **Mapa centrado** con paradas y rutas
- **Botones flotantes** para funcionalidades rápidas
- **Header flotante** con información de ubicación

### Navegación
- **🏠 Inicio**: Mapa principal y funcionalidades core
- **🗺️ Rutas**: Planificación de viajes
- **💳 Pagos**: Compra de pasajes
- **🔔 Alertas**: Notificaciones y reportes

### Funcionalidades del Mapa
- **Paradas interactivas**: Click para ver información
- **Rutas de líneas**: Visualización de rutas completas
- **Buses en tiempo real**: Seguimiento de vehículos activos

## 🔧 Desarrollo

### Scripts Disponibles

#### Frontend
```bash
npm start          # Iniciar Expo
npm run android    # Ejecutar en Android
npm run ios        # Ejecutar en iOS
npm run web        # Ejecutar en web
```

#### Backend
```bash
npm run dev        # Desarrollo con nodemon
npm run start      # Producción
npm run test       # Ejecutar tests
npm run lint       # Linting
```

### Convenciones de Código
- **Componentes**: PascalCase (ej: `HomeScreen.js`)
- **Funciones/Utilidades**: camelCase (ej: `useLocation.js`)
- **Archivos de exportación**: `index.js` para claridad
- **Estilos**: Archivos separados `.styles.js`

## 🌐 APIs Disponibles

### Autenticación
- `POST /api/auth/register` - Registro de usuario
- `POST /api/auth/login` - Login de usuario
- `GET /api/auth/verify` - Verificación de token

### Rutas
- `POST /api/routes/search` - Búsqueda de rutas
- `GET /api/routes/nearby` - Paradas cercanas
- `GET /api/routes/line/:lineId` - Información de línea

### Pagos
- `POST /api/payments/process` - Procesar pago
- `GET /api/payments/history` - Historial de pagos
- `POST /api/payments/qr` - Generar QR

### Notificaciones
- `POST /api/notifications/send` - Enviar notificación
- `GET /api/notifications/user/:userId` - Notificaciones del usuario

### Mendotran
- `GET /api/mendotran/stops` - Todas las paradas
- `GET /api/mendotran/lines` - Todas las líneas
- `GET /api/mendotran/buses/active` - Buses activos

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👥 Equipo

- **Desarrollador**: [Tu Nombre]
- **Proyecto**: Transporte MDZ
- **Ubicación**: Mendoza, Argentina

## 📞 Contacto

- **Email**: [tu-email@ejemplo.com]
- **GitHub**: [@tu-usuario]
- **LinkedIn**: [tu-perfil]

## 🙏 Agradecimientos

- **Mendotran** por la información de transporte público
- **Comunidad React Native** por las librerías y recursos
- **Expo** por la plataforma de desarrollo móvil

---

**🚌 Transporte MDZ - Mejorando el transporte público de Mendoza, un viaje a la vez.**
