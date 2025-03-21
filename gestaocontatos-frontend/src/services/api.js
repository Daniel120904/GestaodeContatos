import axios from 'axios';

const API_URL = 'http://localhost:8080'; // Ajuste para sua URL do backend

export const api = axios.create({
    baseURL: API_URL,
    headers: { 'Content-Type': 'application/json' },
});

// Métodos para Clientes
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

export const createCliente = async (cliente) => {
    try {
        const response = await api.post('/clientes', cliente);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data || 'Erro ao cadastrar cliente');
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

// Buscar cliente por ID
export const getClienteById = async (id) => {
    const response = await api.get(`/clientes/${id}`); // Agora chama a API corretamente
    return response.data;
};

// Atualizar cliente
export const updateCliente = async (id, cliente) => {
    try {
        const response = await api.put(`/clientes/${id}`, cliente); // Certifique-se de que está chamando a URL correta
        return response.data;
    } catch (error) {
        console.error('Erro ao atualizar cliente:', error.response?.data || error.message);
        throw error;
    }
};
