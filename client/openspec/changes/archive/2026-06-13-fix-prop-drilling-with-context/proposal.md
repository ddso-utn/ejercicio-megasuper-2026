## Why

The cart state (`carrito`, `actualizarCarrito`, `limpiarCarrito`) lives in `App.jsx` and is manually threaded as props through `Layout → Navbar` and directly into `ProductDetailPage` and `Checkout`, creating tight coupling and making it hard to add new cart-aware components without touching intermediate files.

## What Changes

- Introduce a `CarritoContext` (React Context + Provider) that owns cart state and exposes `carrito`, `actualizarCarrito`, and `limpiarCarrito`
- Wrap the app with `CarritoProvider` in `App.jsx`
- Replace all prop-passed cart references in `Layout`, `Navbar`, `ProductDetailPage`, and `Checkout` with `useCarrito()` hook consumption
- Remove cart-related props from `Layout` and `ProductDetailPage` route elements in `App.jsx`

## Capabilities

### New Capabilities

- `carrito-context`: A React Context + custom hook that centralizes cart state (`carrito`, `actualizarCarrito`, `limpiarCarrito`) and makes it available to any component in the tree without prop drilling

### Modified Capabilities

<!-- No existing openspec/specs/ — this is a greenfield client spec -->

## Impact

- `src/App.jsx`: Add `CarritoProvider` wrapper; remove cart props from `<Layout>`, `<ProductDetailPage>`, and `<Checkout>` route elements
- `src/features/layout/Layout.jsx`: Remove `carrito` prop
- `src/components/headers/Navbar.jsx`: Replace `carrito` prop with `useCarrito()` hook
- `src/features/products/ProductDetailPage.jsx`: Replace `carrito` + `actualizarCarrito` props with `useCarrito()` hook
- `src/features/checkout/Checkout.jsx`: Replace `carrito` + `limpiarCarrito` props with `useCarrito()` hook
- New file: `src/context/CarritoContext.jsx`
