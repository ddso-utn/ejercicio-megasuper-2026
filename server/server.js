import app from "./app.js"

const port = process.env.PORT || 3000
const host = '0.0.0.0'

app.listen(port, host, async () => {
  console.log(`🚀 Servidor corriendo en http://${host}:${port}`);
  try {
    const res = await fetch(`http://localhost:${port}/productos/seed`, { method: 'POST' })
    const { data } = await res.json()
    console.log(`🌱 Seed: ${data.length} productos cargados`)
  } catch (err) {
    console.error('❌ Error en seed:', err.message)
  }
});
