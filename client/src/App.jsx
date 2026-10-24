import { Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createTheme, ThemeProvider } from '@mui/material';
import React, { useState } from 'react';
import Layout from './features/layout/Layout.jsx';
import Home from './features/home/Home.jsx';
import ProductDetailPage from './features/products/ProductDetailPage.jsx';
import Checkout from './features/checkout/Checkout.jsx';
import NuevoProducto from './features/products/NuevoProducto.jsx';

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
  const [carrito, setCarrito] = useState([]);

  const actualizarCarrito = (producto) => {
    setCarrito([...carrito, producto]);
  };

  const limpiarCarrito = () => {
    setCarrito([]);
  };

  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/" element={<Layout carrito={carrito} />}>
          <Route index element={<Home />} />
          <Route path="/productos/nuevo" element={<NuevoProducto />} />
          <Route
            path="/productos/:id"
            element={
              <ProductDetailPage
                carrito={carrito}
                actualizarCarrito={actualizarCarrito}
              />
            }
          />
          <Route
            path="/checkout"
            element={
              <Checkout
                carrito={carrito}
                limpiarCarrito={limpiarCarrito}
              />
            }
          />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
