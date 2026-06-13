import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import { theme } from "../../theme.js";

const CarouselCard = styled.div`
  flex: 0 0 auto;
  width: calc(100% / 3);
  padding: 0 0.5rem;
`;

const ProductCard = styled.div`
  border: 1px solid transparent;
  border-radius: 8px;
  overflow: hidden;
  background:
    linear-gradient(#fff, #fff) padding-box,
    linear-gradient(to bottom, rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0)) border-box;
`;

const ProductImage = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
  display: block;
`;

const ProductInfo = styled.div`
  padding: 0 1rem 1rem;
`;

const ProductDetails = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.75rem 0;
`;

const ProductPrice = styled.span`
  font-size: 1.35rem;
  font-weight: 700;
`;

const VerDetallesBtn = styled(Link)`
  background-color: ${theme.colors.primaryOrange};
  color: ${theme.colors.primaryWhite};
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  height: fit-content;
  text-decoration: none;

  &:hover {
    background-color: rgb(230, 126, 0);
  }
`;

const CarouselItem = ({ producto }) => {
  return (
    <CarouselCard>
      <ProductCard>
        <ProductImage src={producto.imagen} alt={producto.nombre} />
        <ProductInfo>
          <h3>{producto.nombre}</h3>
          <p>{producto.categoria}</p>
          <ProductDetails>
            <ProductPrice>
              ${producto.precio.toLocaleString("es-AR")}
            </ProductPrice>
            <VerDetallesBtn to={`/productos/${producto.id}`}>
              Ver Detalles
            </VerDetallesBtn>
          </ProductDetails>
        </ProductInfo>
      </ProductCard>
    </CarouselCard>
  );
};

export default CarouselItem;
