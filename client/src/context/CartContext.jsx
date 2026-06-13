import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);

  const actualizarCarrito = (producto) => {
    setCarrito((prev) => [...prev, producto]);
  };

  const limpiarCarrito = () => {
    setCarrito([]);
  };

  return (
    <CartContext.Provider value={{ carrito, actualizarCarrito, limpiarCarrito }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
