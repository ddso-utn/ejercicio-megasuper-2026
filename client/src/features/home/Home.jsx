import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Alert, Button, CircularProgress, Pagination } from '@mui/material';
import ProductSearchBar from '../../components/productSearchBar/ProductSearchBar';
import ProductGrid from '../../components/productGrid/ProductGrid';
import { obtenerProductos } from '../../service/productsService.js';
import { mensajeDeError } from '../../service/api.js';
import './Home.css';

const PRODUCTOS_POR_PAGINA = 4;

const Home = () => {
  const [productos, setProductos] = useState([]);
  const [pagina, setPagina] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(0);
  const [filtros, setFiltros] = useState({ nombre: '', categoria: '' });
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  const cargarProductos = async () => {
    setCargando(true);
    setError(null);
    try {
      const resultado = await obtenerProductos({
        pagina,
        limite: PRODUCTOS_POR_PAGINA,
        ...filtros
      });
      setProductos(resultado.productos);
      setTotalPaginas(resultado.totalPaginas);
    } catch (e) {
      setError(mensajeDeError(e));
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarProductos();
  }, [pagina, filtros]);

  const buscarProductos = (nuevosFiltros) => {
    setFiltros(nuevosFiltros);
    setPagina(1);
  };

  const renderCatalogo = () => {
    if (cargando) {
      return (
        <div className="spinner">
          <CircularProgress />
        </div>
      );
    }

    if (error) {
      return (
        <Alert
          severity="error"
          action={
            <Button color="inherit" size="small" onClick={cargarProductos}>
              Reintentar
            </Button>
          }
        >
          {error}
        </Alert>
      );
    }

    return <ProductGrid productos={productos} />;
  };

  return (
    <>
      <div className="home-body">
        <ProductSearchBar buscarProductos={buscarProductos} />
      </div>
      <div className="catalogo">
        <div className="catalogo-header">
          <h2 className="catalogo-titulo">Nuestros productos</h2>
          <Button component={Link} to="/productos/nuevo" variant="contained">
            + Nuevo producto
          </Button>
        </div>
        {renderCatalogo()}
        {totalPaginas > 1 && (
          <div className="paginacion">
            <Pagination
              count={totalPaginas}
              page={pagina}
              onChange={(e, nuevaPagina) => setPagina(nuevaPagina)}
              disabled={cargando}
              color="primary"
            />
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
