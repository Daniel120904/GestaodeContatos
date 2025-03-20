import axios from 'axios';

const API_URL = 'http://localhost:8080/clientes'; // Ajuste para sua URL do backend

export const api = axios.create({
    baseURL: API_URL,
    headers: { 'Content-Type': 'application/json' },
});

// Métodos para Clientes
export const getClientes = async () => (await api.get('/')).data;
export const createCliente = async (cliente) => await api.post('/', cliente);
export const deleteCliente = async (id) => await api.delete(`/${id}`);