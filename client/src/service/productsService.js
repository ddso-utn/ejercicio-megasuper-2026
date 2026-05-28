import { productos } from '../mockdata/Productos';

export const getProductsSlowly = () => new Promise((resolve) => {
  setTimeout(() => {
    resolve(productos);
  }, 3000);
});
