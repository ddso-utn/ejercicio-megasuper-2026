import { Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material';
import React from 'react';
import { theme as appTheme } from './theme.js';
import Layout from './features/layout/Layout.jsx';
import Home from './features/home/Home.jsx';
import ProductDetailPage from './features/products/ProductDetailPage.jsx';
import Checkout from './features/checkout/Checkout.jsx';
import { CarritoProvider } from './context/CarritoContext.jsx';

const muiTheme = createTheme({
  palette: {
    primary: {
      main: appTheme.colors.primaryOrange
    }
  },
  typography: {
    fontFamily: appTheme.fonts.primary
  }
});

function App() {
  return (
    <ThemeProvider theme={muiTheme}>
      <CarritoProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/productos/:id" element={<ProductDetailPage />} />
            <Route path="/checkout" element={<Checkout />} />
          </Route>
        </Routes>
      </CarritoProvider>
    </ThemeProvider>
  );
}

export default App;
