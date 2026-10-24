import React, { useState } from 'react';
import './ProductSearchBar.css';
import { FaShoppingBasket, FaSearch } from 'react-icons/fa';
import { Button, MenuItem, TextField } from '@mui/material';
import { CATEGORIAS } from '../../service/productsService';

const ProductSearchBar = ({ buscarProductos }) => {
  const [searchText, setSearchText] = useState('');
  const [categoria, setCategoria] = useState('');

  const cambiarCategoria = (e) => {
    const nuevaCategoria = e.target.value;
    setCategoria(nuevaCategoria);
    buscarProductos({ nombre: searchText, categoria: nuevaCategoria });
  };

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
      <div className='search-field'>
        <label className='field-label'>CATEGORÍA</label>
        <div className='input-wrapper'>
          <TextField
            select
            value={categoria}
            onChange={cambiarCategoria}
            fullWidth
            variant="standard"
            slotProps={{ select: { displayEmpty: true } }}
          >
            <MenuItem value="">Todas</MenuItem>
            {CATEGORIAS.map((c) => (
              <MenuItem key={c} value={c}>{c}</MenuItem>
            ))}
          </TextField>
        </div>
      </div>
      <Button variant="outlined" onClick={() => buscarProductos({ nombre: searchText, categoria })}>
        <FaSearch className='button-icon' />
        Buscar
      </Button>
    </div>
  );
};

export default ProductSearchBar;
