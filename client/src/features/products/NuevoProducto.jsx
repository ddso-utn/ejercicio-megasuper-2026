import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert, Button, Card, MenuItem, TextField } from '@mui/material';
import { CATEGORIAS, crearProducto } from '../../service/productsService';
import { mensajeDeError } from '../../service/api';
import './NuevoProducto.css';

const DATOS_INICIALES = {
  nombre: '',
  categoria: '',
  precio: '',
  stock: '',
  descripcion: ''
};

const NuevoProducto = () => {
  const navigate = useNavigate();
  const [datos, setDatos] = useState(DATOS_INICIALES);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState(null);

  const setValorDe = (campo) => (e) => {
    setDatos({ ...datos, [campo]: e.target.value });
  };

  const guardar = async () => {
    setGuardando(true);
    setError(null);
    try {
      const productoCreado = await crearProducto({
        ...datos,
        precio: Number(datos.precio),
        stock: Number(datos.stock)
      });
      navigate(`/productos/${productoCreado.id}`);
    } catch (e) {
      setError(mensajeDeError(e));
    } finally {
      setGuardando(false);
    }
  };

  return (
    <div className="nuevo-producto">
      <Card className="nuevo-producto-card">
        <h1>Nuevo producto</h1>

        {error && <Alert severity="error">{error}</Alert>}

        <form onSubmit={(e) => e.preventDefault()}>
          <TextField
            value={datos.nombre}
            onChange={setValorDe('nombre')}
            fullWidth
            variant="standard"
            label="Nombre"
            margin="normal"
            required
          />
          <TextField
            select
            value={datos.categoria}
            onChange={setValorDe('categoria')}
            fullWidth
            variant="standard"
            label="Categoría"
            margin="normal"
            required
          >
            {CATEGORIAS.map((c) => (
              <MenuItem key={c} value={c}>{c}</MenuItem>
            ))}
          </TextField>
          <TextField
            value={datos.precio}
            onChange={setValorDe('precio')}
            fullWidth
            variant="standard"
            label="Precio"
            type="number"
            margin="normal"
            required
          />
          <TextField
            value={datos.stock}
            onChange={setValorDe('stock')}
            fullWidth
            variant="standard"
            label="Stock"
            type="number"
            margin="normal"
            required
          />
          <TextField
            value={datos.descripcion}
            onChange={setValorDe('descripcion')}
            fullWidth
            variant="standard"
            label="Descripción"
            margin="normal"
            multiline
          />
          <div className="actions">
            <Button variant="outlined" onClick={() => navigate('/')}>Cancelar</Button>
            <Button variant="contained" onClick={guardar} disabled={guardando}>
              {guardando ? 'Guardando...' : 'Guardar'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default NuevoProducto;
