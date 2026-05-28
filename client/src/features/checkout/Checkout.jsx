import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, TextField, Button } from '@mui/material';
import './Checkout.css';

const inicializarCampo = (requerido = true) => ({ valor: '', requerido });

const inicializarCampos = () => ({
  nombre: inicializarCampo(),
  segundoNombre: inicializarCampo(false),
  apellido: inicializarCampo(),
  email: inicializarCampo(),
  repetirEmail: inicializarCampo()
});

const Checkout = ({ carrito, limpiarCarrito }) => {
  const navigate = useNavigate();
  const [campos, setCampos] = useState(inicializarCampos());

  const valorDe = (nombreCampo) => campos[nombreCampo].valor;

  const setValorDe = (nombreCampo) => (e) => {
    const nuevoValor = e.target.value;
    setCampos({
      ...campos,
      [nombreCampo]: {
        ...campos[nombreCampo],
        valor: nuevoValor
      }
    });
  };

  const camposCompletos = Object.values(campos).every(campo =>
    !campo.requerido || campo.valor.length
  );

  const handleGuardar = () => {
    const totalProductos = carrito.reduce((acc, p) => acc + p.unidades, 0);
    alert(`${valorDe('nombre')} ${valorDe('apellido')}, compraste ${totalProductos} productos. Tu factura será enviada a ${valorDe('email')}`);
    limpiarCarrito();
    navigate('/');
  };

  const handleCancelar = () => {
    navigate('/');
  };

  return (
    <div className="root">
      <Card className="form-container">
        <h1>Ya casi estamos...</h1>

        <div className="carrito-resumen">
          {carrito.length === 0 ? (
            <p>El carrito está vacío</p>
          ) : (
            carrito.map((producto, index) => (
              <div key={index} className="carrito-item">
                {producto.nombre}: {producto.unidades} unidad/es
              </div>
            ))
          )}
        </div>

        <form onSubmit={(e) => e.preventDefault()}>
          <TextField
            value={valorDe('nombre')}
            onChange={setValorDe('nombre')}
            fullWidth
            variant="standard"
            label="Nombre"
            margin="normal"
            required
          />
          <TextField
            value={valorDe('segundoNombre')}
            onChange={setValorDe('segundoNombre')}
            fullWidth
            variant="standard"
            label="Segundo nombre"
            margin="normal"
          />
          <TextField
            value={valorDe('apellido')}
            onChange={setValorDe('apellido')}
            fullWidth
            variant="standard"
            label="Apellido"
            margin="normal"
            required
          />
          <TextField
            value={valorDe('email')}
            onChange={setValorDe('email')}
            fullWidth
            variant="standard"
            label="Email"
            type="email"
            margin="normal"
            required
          />
          <TextField
            value={valorDe('repetirEmail')}
            onChange={setValorDe('repetirEmail')}
            fullWidth
            variant="standard"
            label="Repetir Email"
            type="email"
            margin="normal"
            required
          />
          <div className="actions">
            <Button variant="outlined" onClick={handleCancelar}>Cancelar</Button>
            <Button
              disabled={!camposCompletos || carrito.length === 0}
              variant="contained"
              onClick={handleGuardar}
            >
              Guardar
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default Checkout;
