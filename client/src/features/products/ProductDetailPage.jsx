import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ButtonGroup, Button } from '@mui/material';
import styled from '@emotion/styled';
import { productos } from '../../mockdata/Productos';
import { theme } from '../../theme.js';
import { useCarrito } from '../../context/CarritoContext.jsx';

const ProductDetailContainer = styled.div`
  max-width: 100rem;
  margin: 20px auto;
  background-color: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  border: 1px solid #e0e0e0;

  @media (max-width: 768px) {
    margin: 10px;
    border-radius: 8px;
  }
`;

const ProductHeader = styled.div`
  padding: 20px 24px 16px 24px;
  border-bottom: 1px solid #f0f0f0;

  @media (max-width: 768px) {
    padding: 16px 20px;
  }
`;

const ProductNombre = styled.h1`
  font-size: 24px;
  font-weight: 700;
  color: ${theme.colors.primaryGreen};
  margin-bottom: 4px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const ProductCategoria = styled.div`
  font-size: 14px;
  color: #666;
  margin-bottom: 8px;
  font-weight: 400;
`;

const ProductContent = styled.div`
  display: flex;
  padding: 0;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ProductImageSection = styled.div`
  flex: 0 0 300px;
  position: relative;

  @media (max-width: 768px) {
    flex: none;
  }
`;

const ProductImagen = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  display: block;

  @media (max-width: 768px) {
    height: 180px;
  }
`;

const ProductInfoSection = styled.div`
  flex: 1;
  padding: 20px 24px;
  position: relative;

  @media (max-width: 768px) {
    padding: 16px 20px;
  }
`;

const ProductDescription = styled.div`
  font-size: 14px;
  color: #333;
  margin-bottom: 16px;
  font-weight: 500;
  width: 90%;
`;

const ProductPriceSection = styled.div`
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #f0f0f0;
`;

const ProductPrecio = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: #333;
  margin-bottom: 4px;
`;

const PriceDetails = styled.div`
  font-size: 12px;
  color: #666;
  margin-bottom: 12px;
`;

const PointsSection = styled.div`
  padding: 16px 24px;
  background-color: #f8f9fa;
  border-top: 1px solid #f0f0f0;
  font-size: 13px;
  color: #666;
`;

const AgregarContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 1rem;
  padding: 0 1rem 1rem 1rem;
`;

const AgregarBtn = styled.button`
  background-color: ${theme.colors.primaryOrange};
  color: white;
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 18px;
  font-weight: 700;
  margin: 1rem;
  cursor: pointer;
  border: none;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const conUnidades = (unidades, producto) => ({ ...producto, unidades });

const ProductDetailPage = () => {
  const { carrito, actualizarCarrito } = useCarrito();
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
      <ProductDetailContainer>
        <ProductHeader>
          <h1>Producto no encontrado</h1>
          <p>Lo sentimos, no pudimos encontrar el producto que buscás.</p>
        </ProductHeader>
      </ProductDetailContainer>
    );
  }

  return (
    <ProductDetailContainer>
      <ProductHeader>
        <ProductNombre>{producto.nombre}</ProductNombre>
        <ProductCategoria>{producto.categoria}</ProductCategoria>
      </ProductHeader>

      <ProductContent>
        <ProductImageSection>
          <ProductImagen src={producto.imagen} alt={producto.nombre} />
        </ProductImageSection>

        <ProductInfoSection>
          <ProductDescription>
            {producto.descripcion}
          </ProductDescription>

          <ProductPriceSection>
            <ProductPrecio>$ {producto.precio?.toLocaleString("es-AR")}</ProductPrecio>
            <PriceDetails>Precio por unidad, impuestos incluidos</PriceDetails>
          </ProductPriceSection>
        </ProductInfoSection>
      </ProductContent>

      <PointsSection>
        Con esta compra sumás puntos Megasuper
      </PointsSection>

      <AgregarContainer>
        <ButtonGroup variant="outlined" aria-label="selector de unidades">
          <Button onClick={decrementarUnidades} disabled={unidades === 0}>-</Button>
          <Button disabled>{unidades}</Button>
          <Button onClick={incrementarUnidades}>+</Button>
        </ButtonGroup>
        <AgregarBtn onClick={agregarAlCarrito} disabled={unidades === 0}>
          Agregar al carrito
        </AgregarBtn>
      </AgregarContainer>
    </ProductDetailContainer>
  );
};

export default ProductDetailPage;
