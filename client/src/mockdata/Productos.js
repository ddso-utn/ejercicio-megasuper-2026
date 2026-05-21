const productos = [
  {
    id: 1,
    nombre: "Coca-Cola 1.5L",
    descripcion: "Gaseosa cola sabor original en botella de 1.5 litros.",
    categoria: "Bebidas",
    precio: 2500,
    imagen: "/images/coca-cola-1lt.jpg",
  },
  {
    id: 2,
    nombre: "Pepsi 1.5L",
    descripcion: "Gaseosa sabor cola en botella de 1.5 litros.",
    categoria: "Bebidas",
    precio: 2400,
    imagen: "/images/pepsi.jpg",
  },
  {
    id: 3,
    nombre: "Agua Mineral 500ml",
    descripcion: "Agua mineral sin gas en botella de 500 ml.",
    categoria: "Bebidas",
    precio: 800,
    imagen: "/images/agua.jpg",
  },
  {
    id: 4,
    nombre: "Pan Integral",
    descripcion: "Pan integral de 500g, alto en fibra.",
    categoria: "Panaderia",
    precio: 450,
    imagen: "/images/pan.png",
  },
  {
    id: 5,
    nombre: "Leche Entera 1L",
    descripcion: "Leche entera pasteurizada en envase de 1 litro.",
    categoria: "Lacteos",
    precio: 2200,
    imagen: "/images/leche.jpg",
  },
  {
    id: 6,
    nombre: "Yogur Natural 200g",
    descripcion: "Yogur natural sin azúcar añadido.",
    categoria: "Lacteos",
    precio: 600,
    imagen: "/images/yogur.jpg",
  },
  {
    id: 7,
    nombre: "Arroz Premium 1kg",
    descripcion: "Arroz de grano largo, paquete de 1 kg.",
    categoria: "Almacen",
    precio: 1250,
    imagen: "/images/arroz.jpg",
  },
  {
    id: 8,
    nombre: "Fideos Espagueti 500g",
    descripcion: "Fideos de trigo durum, paquete de 500 g.",
    categoria: "Almacen",
    precio: 700,
    imagen: "/images/fideos.jpg",
  }
];

async function obtenerProductos() {
  return productos;
}

async function obtenerProductoPorId(id) {
  return productos.find((producto) => producto.id === id) ?? null;
}

export { productos, obtenerProductos, obtenerProductoPorId };