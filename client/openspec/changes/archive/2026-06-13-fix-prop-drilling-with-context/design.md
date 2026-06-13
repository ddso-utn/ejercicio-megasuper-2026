## Context

The React client has cart state (`carrito`, `actualizarCarrito`, `limpiarCarrito`) centralized in `App.jsx`. To reach `Navbar` (two levels deep via `Layout`) and sibling route pages (`ProductDetailPage`, `Checkout`), these values are forwarded as props at every level. Adding any new cart-aware component requires modifying the entire prop chain.

## Goals / Non-Goals

**Goals:**
- Introduce a `CarritoContext` so any component can access cart state via `useCarrito()` without prop threading
- Zero functional regression — cart behavior stays identical
- Keep the implementation minimal: one context file, one provider wrapping the app

**Non-Goals:**
- Persistent cart (localStorage / backend sync)
- Cart quantity limits or validation logic changes
- Migrating to a third-party state manager (Redux, Zustand, etc.)

## Decisions

### Decision 1: React Context + custom hook (not Redux/Zustand)

The cart is simple shared state with three operations. React Context avoids adding a dependency and matches the learning context of the project. A `useCarrito()` hook hides the context internals and gives a clean API.

**Alternative considered:** Zustand — lighter than Redux but still an extra dependency for state this small.

### Decision 2: Single `CarritoContext.jsx` file

Provider, context, and hook live in one file (`src/context/CarritoContext.jsx`). At this scale, splitting them is premature. The hook (`useCarrito`) is the only public export components need.

**Alternative considered:** Separate `CarritoProvider.jsx` + `useCarrito.js` — unnecessary complexity.

### Decision 3: Wrap at `App.jsx` level inside `ThemeProvider`

`CarritoProvider` wraps the `<Routes>` block inside `App.jsx`. This is the lowest common ancestor for all cart consumers without restructuring routing.

## Risks / Trade-offs

- [Re-render scope] Any state change to `carrito` re-renders all consumers. → Not a concern at this cart size; memoization can be added later if needed.
- [Context misuse] `useCarrito()` will throw if called outside the provider. → Acceptable; the provider wraps the entire app.

## Migration Plan

1. Create `src/context/CarritoContext.jsx` with state + provider + hook
2. Wrap `<Routes>` in `App.jsx` with `<CarritoProvider>`; remove cart props from route elements
3. Update `Layout.jsx` to drop `carrito` prop
4. Update `Navbar.jsx` to use `useCarrito()`
5. Update `ProductDetailPage.jsx` to use `useCarrito()`
6. Update `Checkout.jsx` to use `useCarrito()`

Each step is independently verifiable; no database migration or deploy steps needed.
