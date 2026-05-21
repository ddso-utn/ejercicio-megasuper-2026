# MegaSuper - E-commerce Frontend

Una aplicación web de e-commerce desarrollada con **React** para una tienda de productos de supermercado. Permite a los usuarios explorar productos, visualizar detalles y hacer búsquedas.

## 🚀 Características

- **Carrusel de productos**: Muestra productos destacados con navegación izquierda/derecha
- **Búsqueda de productos**: Filtra productos por nombre o categoría en tiempo real
- **Página de detalle**: Visualiza información completa de cada producto (nombre, descripción, precio, categoría)
- **Catálogo de productos**: 8 productos iniciales (bebidas, panadería, lácteos, almacén)
- **Interfaz responsiva**: Navegación y layout adaptables a diferentes tamaños de pantalla

## 📋 Requisitos previos

- **Node.js** 14+ 
- **npm** 6+

## 🛠️ Instalación

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm start
```

La aplicación estará disponible en [http://localhost:3000](http://localhost:3000).

## 📁 Estructura del proyecto

```
src/
├── components/
│   ├── headers/              # Navbar y Header
│   ├── productCarousel/      # Carrusel de productos
│   ├── productItem/          # Tarjeta individual del producto
│   └── productSearchBar/     # Barra de búsqueda
├── features/
│   ├── home/                 # Página principal
│   ├── layout/               # Layout general
│   └── products/             # Página de detalle de producto
├── mockdata/
│   └── Productos.js          # Datos de productos
├── App.jsx                   # Componente raíz
├── App.css                   # Estilos globales
└── index.css                 # Estilos base + variables CSS
```

## 🎨 Estilos y Variables

El proyecto usa **CSS puro** con variables CSS globales definidas en `index.css`:

```css
:root {
  --primary-green: rgb(30, 126, 52);
  --secondary-green: rgb(72, 168, 90);
  --primary-white: rgb(250, 250, 250);
  --primary-orange: rgb(255, 140, 0);
  --primary-gray: rgb(36, 36, 36);
}
```

### Componentes principales

#### ProductCarousel
Carrusel con navegación de flechas que muestra 3 productos por página. Se desplaza de a un producto por click.

#### CarouselItem / Product Card
Tarjeta individual con imagen, nombre, categoría, precio y botón "Ver Detalles".
- **Imagen**: 180px de alto, object-fit cover para mantener proporción
- **Botón**: Naranja con hover más oscuro
- **Borde**: Gradiente sutil negro → transparente

#### ProductSearchBar
Barra de búsqueda que filtra productos en tiempo real.

#### ProductDetailPage
Página de detalle que muestra información completa del producto seleccionado.

## 🧪 Scripts disponibles

```bash
npm start          # Inicia servidor de desarrollo
npm run build      # Construye la app para producción
npm test           # Ejecuta tests en modo watch
npm run eject      # Expone la configuración de Create React App
```

## 🌐 Enrutamiento

La aplicación usa **React Router** con las siguientes rutas:

- `/` — Página de inicio con carrusel y catálogo
- `/productos/:id` — Página de detalle del producto

## 📦 Productos disponibles

1. Coca-Cola 1.5L - Bebidas - $2500
2. Pepsi 1.5L - Bebidas - $2400
3. Agua Mineral 500ml - Bebidas - $800
4. Pan Integral - Panadería - $450
5. Leche Entera 1L - Lácteos - $2200
6. Yogur Natural 200g - Lácteos - $600
7. Arroz Premium 1kg - Almacén - $1250
8. Fideos Espagueti 500g - Almacén - $700

## 📝 Notas de desarrollo

- **Fuente**: Poppins (importada desde Google Fonts)
- **Box model**: `box-sizing: border-box` aplicado globalmente
- **Images**: Almacenadas en `public/images/`
- **Estado**: Actualmente usa datos mock; la integración con backend está pendiente

## 🔧 Tecnologías

- React 18+
- React Router DOM
- CSS3 (variables, flexbox, grid)
- Create React App

## 📄 Licencia

Proyecto educativo - UTN DSS.
