import React, { useState } from 'react';
import styled from '@emotion/styled';
import { FaShoppingBasket, FaSearch } from 'react-icons/fa';
import { Button, TextField } from '@mui/material';
import { theme } from '../../theme.js';

const ProductSearch = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 1rem;
  padding: 1rem;
  background-color: ${theme.colors.primaryWhite};
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  max-width: 600px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const SearchField = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const FieldLabel = styled.label`
  font-size: 0.75rem;
  font-weight: 600;
  color: #666;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 0.25rem;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 0.75rem;
  background-color: #fff;
  transition: border-color 0.2s ease;

  &:focus-within {
    border-color: ${theme.colors.primaryGreen};
    box-shadow: 0 0 0 2px rgba(30, 126, 52, 0.1);
  }
`;

const SearchIcon = styled(FaShoppingBasket)`
  color: #999;
  margin-right: 0.5rem;
  font-size: 1rem;
`;

const SearchButton = styled(Button)`
  && {
    height: fit-content;
    @media (max-width: 768px) {
      justify-content: center;
      margin-top: 0.5rem;
    }
  }
`;

const ProductSearchBar = ({ filtrarProductos }) => {
  const [searchText, setSearchText] = useState('');

  return (
    <ProductSearch>
      <SearchField>
        <FieldLabel>PRODUCTO</FieldLabel>
        <InputWrapper>
          <SearchIcon />
          <TextField
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            fullWidth
            variant="standard"
            placeholder="¿Qué buscas?"
          />
        </InputWrapper>
      </SearchField>
      <SearchButton variant="outlined" onClick={() => filtrarProductos(searchText)}>
        <FaSearch style={{ marginRight: '0.5rem' }} />
        Buscar
      </SearchButton>
    </ProductSearch>
  );
};

export default ProductSearchBar;
