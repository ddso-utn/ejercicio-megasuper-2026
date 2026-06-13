import { createContext, useContext, useState } from 'react';

const CarritoContext = createContext(null);

export const CarritoProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);

  const actualizarCarrito = (producto) => {
    setCarrito((prev) => [...prev, producto]);
  };

  const limpiarCarrito = () => {
    setCarrito([]);
  };

  return (
    <CarritoContext.Provider value={{ carrito, actualizarCarrito, limpiarCarrito }}>
      {children}
    </CarritoContext.Provider>
  );
};

export const useCarrito = () => useContext(CarritoContext);
