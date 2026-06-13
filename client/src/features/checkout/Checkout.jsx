import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, TextField, Button } from '@mui/material';
import styled from '@emotion/styled';
import { theme } from '../../theme.js';
import { useCarrito } from '../../context/CarritoContext.jsx';

const Root = styled.div`
  display: flex;
  justify-content: center;
  padding: 2rem 1rem;
`;

const FormContainer = styled(Card)`
  && {
    width: 100%;
    max-width: 600px;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;

    h1 {
      font-size: 1.5rem;
      margin-bottom: 1rem;
      color: ${theme.colors.primaryGreen};
      text-align: center;
    }
  }
`;

const CarritoResumen = styled.div`
  width: 100%;
  background-color: #f8f9fa;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  padding: 1rem;
  margin-bottom: 1.5rem;
`;

const CarritoItem = styled.div`
  padding: 0.25rem 0;
  font-size: 0.95rem;
  color: #333;
`;

const StyledForm = styled.form`
  width: 100%;
`;

const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1.5rem;
`;

const inicializarCampo = (requerido = true) => ({ valor: '', requerido });

const inicializarCampos = () => ({
  nombre: inicializarCampo(),
  segundoNombre: inicializarCampo(false),
  apellido: inicializarCampo(),
  email: inicializarCampo(),
  repetirEmail: inicializarCampo()
});

const Checkout = () => {
  const { carrito, limpiarCarrito } = useCarrito();
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
    <Root>
      <FormContainer>
        <h1>Ya casi estamos...</h1>

        <CarritoResumen>
          {carrito.length === 0 ? (
            <p>El carrito está vacío</p>
          ) : (
            carrito.map((producto, index) => (
              <CarritoItem key={index}>
                {producto.nombre}: {producto.unidades} unidad/es
              </CarritoItem>
            ))
          )}
        </CarritoResumen>

        <StyledForm onSubmit={(e) => e.preventDefault()}>
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
          <Actions>
            <Button variant="outlined" onClick={handleCancelar}>Cancelar</Button>
            <Button
              disabled={!camposCompletos || carrito.length === 0}
              variant="contained"
              onClick={handleGuardar}
            >
              Guardar
            </Button>
          </Actions>
        </StyledForm>
      </FormContainer>
    </Root>
  );
};

export default Checkout;
