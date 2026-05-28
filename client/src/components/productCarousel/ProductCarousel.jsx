import React, { useState, useEffect } from 'react';
import './ProductCarousel.css';
import CarouselItem from '../productItem/CarouselItem';

const VISIBLES = 3;

export default function ProductCarousel({ productos }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(0);
  }, [productos]);

  if (!Array.isArray(productos) || productos.length === 0) {
    return <p className="carousel-empty">No hay productos disponibles</p>;
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
    <div className="carousel-container">
      <h2 className="carousel-title">Ofertas de la semana</h2>
      <div className="carousel-wrapper">
        <div className="carousel-viewport">
          <div className="carousel-track" style={{ transform: desplazamiento }}>
            {productos.map((producto) => (
              <CarouselItem producto={producto} key={producto.id} />
            ))}
          </div>
        </div>
        <button onClick={retroceder} disabled={!puedeRetroceder} className="carousel-btn left-btn">
          {'<'}
        </button>
        <button onClick={avanzar} disabled={!puedeAvanzar} className="carousel-btn right-btn">
          {'>'}
        </button>
      </div>
    </div>
  );
}
