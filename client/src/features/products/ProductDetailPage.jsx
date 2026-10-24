import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ButtonGroup, Button, CircularProgress } from '@mui/material';
import { obtenerProductoPorId } from '../../service/productsService';
import { mensajeDeError } from '../../service/api';
import './ProductDetailPage.css';

const conUnidades = (unidades, producto) => ({ ...producto, unidades });

const ProductDetailPage = ({ carrito, actualizarCarrito }) => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [producto, setProducto] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [unidades, setUnidades] = useState(0);

  const cargarProducto = async () => {
    setCargando(true);
    setError(null);
    try {
      const productoCargado = await obtenerProductoPorId(id);
      setProducto(productoCargado);
    } catch (e) {
      if (e.response?.status === 404) {
        setError('Producto no encontrado');
      } else {
        setError(mensajeDeError(e));
      }
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarProducto();
  }, [id]);

  useEffect(() => {
    setUnidades(0);
  }, [id, carrito]);

  const incrementarUnidades = () => {
    if (unidades < producto.stock) {
      setUnidades(unidades + 1);
    }
  };

  const decrementarUnidades = () => {
    if (unidades > 0) {
      setUnidades(unidades - 1);
    }
  };

  const agregarAlCarrito = () => {
    actualizarCarrito(conUnidades(unidades, producto));
    navigate('/');
  };

  if (cargando) {
    return (
      <div className="spinner">
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <div className="product-detail-container">
        <div className="product-header">
          <h1>{error}</h1>
          <p>Lo sentimos, no pudimos mostrar el producto que buscás.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="product-detail-container">
      <div className="product-header">
        <h1 className="product-nombre">{producto.nombre}</h1>
        <div className="product-categoria">{producto.categoria}</div>
      </div>

      <div className="product-content">
        <div className="product-image-section">
          <img
            src={producto.imagen}
            alt={producto.nombre}
            className="product-imagen"
          />
        </div>

        <div className="product-info-section">
          <div className="product-description">
            {producto.descripcion}
          </div>

          <div className="product-price-section">
            <div className="product-precio">$ {producto.precio?.toLocaleString("es-AR")}</div>
            <div className="price-details">Precio por unidad, impuestos incluidos</div>
            <div className="price-details">Stock disponible: {producto.stock} unidades</div>
          </div>
        </div>
      </div>

      <div className="points-section">
        Con esta compra sumás puntos Megasuper
      </div>

      <div className="agregar-container">
        <ButtonGroup variant="outlined" aria-label="selector de unidades">
          <Button onClick={decrementarUnidades} disabled={unidades === 0}>-</Button>
          <Button disabled>{unidades}</Button>
          <Button onClick={incrementarUnidades} disabled={unidades >= producto.stock}>+</Button>
        </ButtonGroup>
        <button className="agregar" onClick={agregarAlCarrito} disabled={unidades === 0}>
          Agregar al carrito
        </button>
      </div>
    </div>
  );
};

export default ProductDetailPage;
