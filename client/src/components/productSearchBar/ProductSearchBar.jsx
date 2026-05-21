import './ProductSearchBar.css';
import { FaShoppingBasket, FaSearch } from 'react-icons/fa';

const ProductSearchBar = () => {
  return (
    <div className="product-search">
      <div className='search-field'>
        <label className='field-label'>PRODUCTO</label>
        <div className='input-wrapper'>
          <FaShoppingBasket className='search-icon' />
          <input type="text" className='search-input' placeholder="¿Qué buscas?" />
        </div>
      </div>
      <button className='search-button'>
        <FaSearch className='button-icon' />
        Buscar
      </button>
    </div>
  );
};

export default ProductSearchBar;