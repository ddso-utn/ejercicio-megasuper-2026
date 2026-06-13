## 1. Create CarritoContext

- [x] 1.1 Create `src/context/CarritoContext.jsx` with `CarritoProvider` component holding `carrito` state, `actualizarCarrito`, and `limpiarCarrito`
- [x] 1.2 Export a `useCarrito()` custom hook that reads from `CarritoContext`

## 2. Wire Provider in App

- [x] 2.1 Wrap `<Routes>` in `App.jsx` with `<CarritoProvider>`
- [x] 2.2 Remove `carrito` prop from `<Layout>` route element in `App.jsx`
- [x] 2.3 Remove `carrito` and `actualizarCarrito` props from `<ProductDetailPage>` route element in `App.jsx`
- [x] 2.4 Remove `carrito` and `limpiarCarrito` props from `<Checkout>` route element in `App.jsx`
- [x] 2.5 Remove `carrito`, `actualizarCarrito`, and `limpiarCarrito` state and handlers from `App.jsx` (now owned by provider)

## 3. Update Consumers

- [x] 3.1 Update `Layout.jsx`: remove `carrito` prop and stop forwarding it to `Navbar`
- [x] 3.2 Update `Navbar.jsx`: replace `carrito` prop with `useCarrito()` hook
- [x] 3.3 Update `ProductDetailPage.jsx`: replace `carrito` and `actualizarCarrito` props with `useCarrito()` hook
- [x] 3.4 Update `Checkout.jsx`: replace `carrito` and `limpiarCarrito` props with `useCarrito()` hook

## 4. Verify

- [x] 4.1 Run the client (`cd client && npm start`) and confirm cart count updates in Navbar when adding products
- [x] 4.2 Confirm Checkout displays cart items and clears cart after purchase
- [x] 4.3 Confirm no PropTypes warnings or undefined prop errors in the browser console
