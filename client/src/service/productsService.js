import api from './api';

// Idealmente vendrían de un endpoint del back (GET /categorias)
export const CATEGORIAS = ['Almacen', 'Bebidas', 'Lacteos', 'Panaderia'];

const IMAGEN_POR_DEFECTO = '/images/sin-imagen.svg';

const aProducto = (productoBack) => ({
  id: productoBack.id,
  nombre: productoBack.nombre,
  descripcion: productoBack.descripcion,
  categoria: productoBack.categoria,
  precio: productoBack.precio,
  imagen: productoBack.imagen ?? IMAGEN_POR_DEFECTO,
  stock: productoBack.cantidad
});

export const obtenerProductos = async ({ pagina = 1, limite = 10, nombre, categoria } = {}) => {
  const response = await api.get('/productos', {
    params: {
      page: pagina,
      limit: limite,
      nombre: nombre || undefined,
      categoria: categoria || undefined
    }
  });

  return {
    productos: response.data.data.map(aProducto),
    totalPaginas: response.data.paginacion.totalPaginas
  };
};

export const obtenerProductoPorId = async (id) => {
  const response = await api.get(`/productos/${id}`);
  return aProducto(response.data.data);
};

export const crearProducto = async (producto) => {
  const response = await api.post('/productos', {
    nombre: producto.nombre,
    precio: producto.precio,
    cantidad: producto.stock,
    categoria: producto.categoria,
    descripcion: producto.descripcion
  });
  return aProducto(response.data.data);
};
