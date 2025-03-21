import axios from 'axios';

const API_URL = 'http://localhost:8080'; // Ajuste para sua URL do backend

export const api = axios.create({
    baseURL: API_URL,
    headers: { 'Content-Type': 'application/json' },
});

// Métodos para Clientes
//export const getClientes = async () => (await api.get('/')).data;
export const createCliente = async (cliente) => await api.post('/', cliente);
//export const deleteCliente = async (id) => await api.delete(`/${id}`);

// GET: Listar todos os clientes
export const getClientes = async () => {
    try {
        const response = await api.get('/clientes'); // Adicionando '/clientes' aqui
        console.log('Resposta do backend:', response.data);
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar clientes:', error);
        throw error;
    }
};

// DELETE: Excluir cliente
export const deleteCliente = async (id) => {
    try {
        await api.delete(`/${id}`);
    } catch (error) {
        console.error('Erro ao excluir cliente:', error);
        throw error;
    }
};