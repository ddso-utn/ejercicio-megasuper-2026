const getApiUrl = () =>
  window._env_?.REACT_APP_API_URL ||
  process.env.REACT_APP_API_URL ||
  'http://localhost:3000'

export const getProductsSlowly = async () => {
  const res = await fetch(`${getApiUrl()}/productos?limit=50`)
  if (!res.ok) throw new Error(`Error al obtener productos: ${res.status}`)
  const { data } = await res.json()
  return data
}
