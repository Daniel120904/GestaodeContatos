import { useState } from 'react';
import { createCliente } from '../services/api';

export const ClienteForm = ({ onClienteAdded }) => {
    const [cliente, setCliente] = useState({
        nome: '',
        cpf: '',
        dataNascimento: '',
        endereco: '',
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createCliente(cliente);
            onClienteAdded(); // Recarrega a lista
            setCliente({ nome: '', cpf: '', dataNascimento: '', endereco: '' });
        } catch (error) {
            alert('Erro ao salvar cliente: ' + error.response?.data);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="form-card">
            <h2>Cadastrar Cliente</h2>
            <input
                type="text"
                placeholder="Nome"
                value={cliente.nome}
                onChange={(e) => setCliente({ ...cliente, nome: e.target.value })}
                required
            />
            <input
                type="text"
                placeholder="CPF"
                value={cliente.cpf}
                onChange={(e) => setCliente({ ...cliente, cpf: e.target.value })}
                required
            />
            <input
                type="date"
                value={cliente.dataNascimento}
                onChange={(e) => setCliente({ ...cliente, dataNascimento: e.target.value })}
                required
            />
            <input
                type="text"
                placeholder="Endereço"
                value={cliente.endereco}
                onChange={(e) => setCliente({ ...cliente, endereco: e.target.value })}
            />
            <button type="submit">Salvar</button>
        </form>
    );
};