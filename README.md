# MegaSuper - E-commerce de Supermercado

Aplicación web de e-commerce para una tienda de supermercado. Desarrollada con **React** para el frontend, permitiendo a los usuarios explorar productos, visualizar detalles y realizar búsquedas.

## Características principales

- **Carrusel de productos destacados** con navegación intuitiva (izquierda/derecha)
- **Catálogo de productos** con tarjetas visuales con información resumida
- **Búsqueda y filtrado** de productos en tiempo real
- **Página de detalle** completa para cada producto
- **Sistema de variables CSS** para temas y consistencia visual

## Estructura del proyecto

```
ejercicio-megasuper-2026/
├── client/                       # Frontend React
│   ├── src/
│   │   ├── components/
│   │   │   ├── headers/          # Navbar, Header
│   │   │   ├── productCarousel/  # Carrusel de productos
│   │   │   ├── productItem/      # Tarjeta de producto
│   │   │   └── productSearchBar/ # Barra de búsqueda
│   │   ├── features/
│   │   │   ├── home/             # Página principal
│   │   │   ├── layout/           # Layout general
│   │   │   └── products/         # Página de detalle
│   │   ├── mockdata/
│   │   │   └── Productos.js      # Datos mock de productos
│   │   ├── App.jsx
│   │   ├── index.jsx
│   │   └── index.css
│   ├── public/
│   │   └── images/               # Imágenes de productos
│   ├── package.json
│   └── README.md
└── README.md (este archivo)
```

## Inicio rápido

### Requisitos
- Node.js 14 o superior
- npm 6 o superior

### Instalación

```bash
# Acceder a la carpeta del cliente
cd client

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm start
```

La aplicación estará disponible en [http://localhost:3000](http://localhost:3000)

## Diseño y estilos

El proyecto utiliza **CSS puro** con un sistema de variables globales para mantener consistencia visual.

### Componentes principales

#### ProductCarousel
- Muestra 3 productos por página
- Navegación con botones flechas izquierda/derecha
- Se desplaza de a un producto por click
- Gutter (separación) entre productos

#### CarouselItem / Tarjeta de Producto
- Imagen de producto (180px de alto, object-fit cover)
- Nombre y categoría
- Precio formateado en moneda local (ARS)
- Botón "Ver Detalles" naranja con efecto hover
- Borde con gradiente sutil (negro → transparente)

#### ProductSearchBar
- Búsqueda en tiempo real
- Filtra por nombre o categoría

#### ProductDetailPage
- Vista completa del producto
- Información detallada (descripción, precio, stock, puntos)
- Botón para agregar al carrito

## Navegación

- `/` — Página de inicio (carrusel + catálogo)
- `/productos/:id` — Página de detalle del producto

## Scripts disponibles

```bash
# Desarrollo
npm start              # Inicia servidor con hot-reload
npm test              # Ejecuta tests en modo watch

# Producción
npm run build         # Crea build optimizado para producción

# Avanzado
npm run eject         # Expone configuración de Create React App (irreversible)
```

## Tecnologías utilizadas

- **React 18+** — Framework principal
- **React Router DOM** — Enrutamiento
- **CSS3** — Estilos (variables, flexbox, gradientes)
- **Create React App** — Herramienta de construcción
- **Poppins Font** — Tipografía (Google Fonts)

## Notas de desarrollo

- Los datos actualmente son **mock** (en `mockdata/Productos.js`)
- Las imágenes están en `public/images/`
- El sistema usa `box-sizing: border-box` globalmente
- Responsive design con media queries

**Rama actual**: `clase9-front-react-pt1` — Desarrollo del frontend en React.

