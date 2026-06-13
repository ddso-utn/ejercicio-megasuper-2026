import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import CarouselItem from '../productItem/CarouselItem';

const VISIBLES = 3;

const CarouselContainer = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 1rem;
`;

const CarouselTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #222;
`;

const CarouselWrapper = styled.div`
  position: relative;
`;

const CarouselViewport = styled.div`
  overflow: hidden;
`;

const CarouselTrack = styled.div`
  display: flex;
  transition: transform 0.5s ease-in-out;
  width: 100%;
  flex-wrap: nowrap;
  transform: ${({ desplazamiento }) => desplazamiento};
`;

const CarouselBtn = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: white;
  border: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
  border-radius: 50%;
  width: 36px;
  height: 36px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s ease, transform 0.1s ease;

  &:hover:not(:disabled) {
    background-color: #f3f3f3;
    transform: translateY(-50%) scale(1.1);
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

const LeftBtn = styled(CarouselBtn)`
  left: 8px;
`;

const RightBtn = styled(CarouselBtn)`
  right: 8px;
`;

const CarouselEmpty = styled.p`
  text-align: center;
  padding: 2rem;
  color: #777;
`;

export default function ProductCarousel({ productos }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(0);
  }, [productos]);

  if (!Array.isArray(productos) || productos.length === 0) {
    return <CarouselEmpty>No hay productos disponibles</CarouselEmpty>;
  }

  const ultimoIndice = Math.max(0, productos.length - VISIBLES);
  const puedeRetroceder = index > 0;
  const puedeAvanzar = index < ultimoIndice;

  const retroceder = () => {
    if (puedeRetroceder) setIndex(index - 1);
  };

  const avanzar = () => {
    if (puedeAvanzar) setIndex(index + 1);
  };

  const desplazamiento = `translateX(-${index * (100 / VISIBLES)}%)`;

  return (
    <CarouselContainer>
      <CarouselTitle>Ofertas de la semana</CarouselTitle>
      <CarouselWrapper>
        <CarouselViewport>
          <CarouselTrack desplazamiento={desplazamiento}>
            {productos.map((producto) => (
              <CarouselItem producto={producto} key={producto.id} />
            ))}
          </CarouselTrack>
        </CarouselViewport>
        <LeftBtn onClick={retroceder} disabled={!puedeRetroceder}>
          {'<'}
        </LeftBtn>
        <RightBtn onClick={avanzar} disabled={!puedeAvanzar}>
          {'>'}
        </RightBtn>
      </CarouselWrapper>
    </CarouselContainer>
  );
}
