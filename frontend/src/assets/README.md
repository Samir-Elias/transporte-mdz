# Assets

Esta carpeta contiene todos los recursos estáticos de la aplicación:

## Estructura recomendada:

```
assets/
├── images/           # Imágenes de la aplicación
│   ├── icons/       # Iconos personalizados
│   ├── logos/       # Logos y marcas
│   └── backgrounds/ # Imágenes de fondo
├── fonts/           # Fuentes personalizadas
└── animations/      # Archivos de animación (Lottie, etc.)
```

## Tipos de archivos soportados:

- **Imágenes**: PNG, JPG, JPEG, SVG, WebP
- **Fuentes**: TTF, OTF, WOFF, WOFF2
- **Animaciones**: JSON (Lottie), GIF

## Convenciones de nomenclatura:

- Usar kebab-case para nombres de archivos
- Incluir dimensiones en el nombre cuando sea relevante
- Agregar sufijos descriptivos (ej: `icon-home-active.png`)

## Optimización:

- Comprimir imágenes antes de incluirlas
- Usar formatos modernos como WebP cuando sea posible
- Considerar diferentes densidades de pantalla (1x, 2x, 3x)
