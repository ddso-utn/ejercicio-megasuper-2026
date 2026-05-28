import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ButtonGroup, Button } from '@mui/material';
import { productos } from '../../mockdata/Productos';
import './ProductDetailPage.css';

const conUnidades = (unidades, producto) => ({ ...producto, unidades });

const ProductDetailPage = ({ carrito, actualizarCarrito }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const producto = productos.find((p) => p.id === parseInt(id));

  const [unidades, setUnidades] = useState(0);

  useEffect(() => {
    setUnidades(0);
  }, [id, carrito]);

  const incrementarUnidades = () => {
    setUnidades(unidades + 1);
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

  if (!producto) {
    return (
      <div className="product-detail-container">
        <div className="product-header">
          <h1>Producto no encontrado</h1>
          <p>Lo sentimos, no pudimos encontrar el producto que buscás.</p>
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
          <Button onClick={incrementarUnidades}>+</Button>
        </ButtonGroup>
        <button className="agregar" onClick={agregarAlCarrito} disabled={unidades === 0}>
          Agregar al carrito
        </button>
      </div>
    </div>
  );
};

export default ProductDetailPage;
