import React, { useState, useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import ProductSearchBar from '../../components/productSearchBar/ProductSearchBar';
import ProductCarousel from '../../components/productCarousel/ProductCarousel';
import { getProductsSlowly } from '../../service/productsService.js';
import './Home.css';

const Home = () => {
  const [productos, setProductos] = useState([]);
  const [productosFiltrados, setProductosFiltrados] = useState([]);

  const filtrarProductos = (searchText) => {
    if (searchText.trim() === '') {
      setProductosFiltrados(productos);
    } else {
      const texto = searchText.toLowerCase();
      const filtered = productos.filter(producto =>
        producto.nombre.toLowerCase().includes(texto) ||
        producto.categoria.toLowerCase().includes(texto)
      );
      setProductosFiltrados(filtered);
    }
  };

  const cargarProductos = async () => {
    const productosCargados = await getProductsSlowly();
    setProductos(productosCargados);
    setProductosFiltrados(productosCargados);
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  return (
    <>
      <div className="home-body">
        <ProductSearchBar filtrarProductos={filtrarProductos} />
      </div>
      {!productos.length ? (
        <div className="spinner">
          <Spinner />
        </div>
      ) : (
        <div>
          <ProductCarousel productos={productosFiltrados} />
        </div>
      )}
    </>
  );
};

export default Home;
