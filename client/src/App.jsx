import { Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createTheme, ThemeProvider } from '@mui/material';
import React from 'react';
import Layout from './features/layout/Layout.jsx';
import Home from './features/home/Home.jsx';
import ProductDetailPage from './features/products/ProductDetailPage.jsx';
import Checkout from './features/checkout/Checkout.jsx';
import { CarritoProvider } from './context/CarritoContext.jsx';

const theme = createTheme({
  palette: {
    primary: {
      main: '#ff8c00'
    }
  },
  typography: {
    fontFamily: "'Poppins', sans-serif"
  }
});

function App() {
  return (
    <ThemeProvider theme={theme}>
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
