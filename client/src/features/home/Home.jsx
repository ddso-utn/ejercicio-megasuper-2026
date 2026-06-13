import React, { useState, useEffect } from 'react';
import { CircularProgress } from '@mui/material';
import styled from '@emotion/styled';
import ProductSearchBar from '../../components/productSearchBar/ProductSearchBar';
import ProductCarousel from '../../components/productCarousel/ProductCarousel';
import { getProductsSlowly } from '../../service/productsService.js';

const HomeBody = styled.div`
  display: flex;
  position: relative;
  top: -1.5rem;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const SpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4rem;
`;

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
      <HomeBody>
        <ProductSearchBar filtrarProductos={filtrarProductos} />
      </HomeBody>
      {!productos.length ? (
        <SpinnerWrapper>
          <CircularProgress />
        </SpinnerWrapper>
      ) : (
        <div>
          <ProductCarousel productos={productosFiltrados} />
        </div>
      )}
    </>
  );
};

export default Home;
