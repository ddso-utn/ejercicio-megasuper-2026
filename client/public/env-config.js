// Fallback para desarrollo local (npm start).
// En producción este archivo es sobreescrito por env.sh
// cada vez que el contenedor arranca.
window._env_ = {
  REACT_APP_API_URL: 'http://localhost:3000'
}
