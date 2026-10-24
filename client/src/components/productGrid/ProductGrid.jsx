import ProductCard from '../productItem/ProductCard';
import './ProductGrid.css';

const ProductGrid = ({ productos }) => {
  if (productos.length === 0) {
    return <p className="grid-empty">No encontramos productos</p>;
  }

  return (
    <div className="product-grid">
      {productos.map((producto) => (
        <ProductCard producto={producto} key={producto.id} />
      ))}
    </div>
  );
};

export default ProductGrid;
