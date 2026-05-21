import { Link } from "react-router-dom";
import "./CarouselItem.css";

const CarouselItem = ({producto}) => {
  return (
    <div className="carousel-card">
      <div className="product-card">
        <img src={producto.imagen} alt={producto.nombre} className="product-image" />
        <div className="product-info">
          <h3 className="product-name">{producto.nombre}</h3>
          <p className="product-category">{producto.categoria}</p>
          <div className="product-details">
            <span className="product-price">
              ${producto.precio.toLocaleString("es-AR")}
            </span>
            <span className="ver-detalles">
              <Link to={`/productos/${producto.id}`} className="ver-detalles-btn">
                Ver Detalles
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarouselItem;