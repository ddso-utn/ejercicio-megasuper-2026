import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL
});

export const mensajeDeError = (error) =>
  error.response?.data?.message ?? 'No pudimos conectarnos con el servidor';

export default api;
