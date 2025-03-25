import axios from 'axios';

const API_URL = 'http://localhost:8080';

export const api = axios.create({
    baseURL: API_URL,
    headers: { 'Content-Type': 'application/json' },
});

//métodos para Clientes
export const getClientes = async () => {
    try {
        const response = await api.get('/clientes');
        console.log('Resposta do backend:', response.data);
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar clientes:', error);
        throw error;
    }
};

export const createCliente = async (cliente) => {
    try {
        const response = await api.post('/clientes', cliente);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data || 'Erro ao cadastrar cliente');
    }
};

export const deleteCliente = async (id) => {
    try {
        await api.delete(`/clientes/${id}`);
    } catch (error) {
        console.error('Erro ao excluir cliente:', error);
        throw error;
    }
};

export const getClienteById = async (id) => {
    const response = await api.get(`/clientes/${id}`);
    return response.data;
};

export const updateCliente = async (id, cliente) => {
    try {
        const response = await api.put(`/clientes/${id}`, cliente);
        return response.data;
    } catch (error) {
        console.error('Erro ao atualizar cliente:', error.response?.data || error.message);
        throw error;
    }
};
