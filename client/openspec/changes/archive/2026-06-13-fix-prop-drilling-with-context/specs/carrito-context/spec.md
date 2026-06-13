## ADDED Requirements

### Requirement: CarritoContext provides cart state to any component

The system SHALL expose a `CarritoContext` React Context with a `CarritoProvider` component that holds `carrito` (array), `actualizarCarrito` (function), and `limpiarCarrito` (function) as shared state accessible to any descendant component.

#### Scenario: Provider makes cart state available

- **WHEN** a component is rendered inside `CarritoProvider`
- **THEN** it can call `useCarrito()` and receive `{ carrito, actualizarCarrito, limpiarCarrito }`

#### Scenario: useCarrito hook returns current cart

- **WHEN** `useCarrito()` is called inside a component
- **THEN** it SHALL return the current `carrito` array reflecting all items added so far

### Requirement: actualizarCarrito appends a product to the cart

The system SHALL add the given product object to the `carrito` array when `actualizarCarrito(producto)` is called.

#### Scenario: Adding a product

- **WHEN** `actualizarCarrito(producto)` is called with a product
- **THEN** `carrito` SHALL contain that product as its last element

### Requirement: limpiarCarrito resets the cart to empty

The system SHALL set `carrito` to an empty array when `limpiarCarrito()` is called.

#### Scenario: Clearing the cart

- **WHEN** `limpiarCarrito()` is called
- **THEN** `carrito` SHALL be an empty array

### Requirement: Components access cart without prop drilling

The system SHALL allow `Navbar`, `ProductDetailPage`, and `Checkout` to read and mutate cart state via `useCarrito()` without receiving cart-related props from parent components.

#### Scenario: Navbar reads cart without props

- **WHEN** `Navbar` renders
- **THEN** it SHALL display the correct cart item count using `useCarrito()` without a `carrito` prop

#### Scenario: ProductDetailPage adds to cart without props

- **WHEN** the user clicks "Agregar al carrito" in `ProductDetailPage`
- **THEN** `actualizarCarrito` SHALL be called via `useCarrito()` without an `actualizarCarrito` prop

#### Scenario: Checkout reads and clears cart without props

- **WHEN** the user completes checkout in `Checkout`
- **THEN** `carrito` and `limpiarCarrito` SHALL be consumed via `useCarrito()` without props
