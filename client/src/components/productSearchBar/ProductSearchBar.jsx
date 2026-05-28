import React, { useState } from 'react';
import './ProductSearchBar.css';
import { FaShoppingBasket, FaSearch } from 'react-icons/fa';
import { Button, TextField } from '@mui/material';

const ProductSearchBar = ({ filtrarProductos }) => {
  const [searchText, setSearchText] = useState('');

  return (
    <div className="product-search">
      <div className='search-field'>
        <label className='field-label'>PRODUCTO</label>
        <div className='input-wrapper'>
          <FaShoppingBasket className='search-icon' />
          <TextField
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            fullWidth
            variant="standard"
            placeholder="¿Qué buscas?"
          />
        </div>
      </div>
      <Button variant="outlined" onClick={() => filtrarProductos(searchText)}>
        <FaSearch className='button-icon' />
        Buscar
      </Button>
    </div>
  );
};

export default ProductSearchBar;
