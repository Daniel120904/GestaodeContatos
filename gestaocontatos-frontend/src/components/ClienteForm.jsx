import { useState } from 'react';
import { createCliente } from '../services/api';

export const ClienteForm = ({ onClienteAdicionado }) => {
    const [cliente, setCliente] = useState({
        nome: '',
        cpf: '',
        dataNascimento: '',
        endereco: ''
    });

    const [erro, setErro] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErro('');

        try {
            // Formatar CPF (remover máscara)
            const cpfLimpo = cliente.cpf.replace(/\D/g, '');
            const clienteParaEnviar = { ...cliente, cpf: cpfLimpo };

            await createCliente(clienteParaEnviar);

            // Limpar formulário
            setCliente({
                nome: '',
                cpf: '',
                dataNascimento: '',
                endereco: ''
            });

            // Atualizar lista de clientes
            if (onClienteAdicionado) onClienteAdicionado();

            alert('Cliente cadastrado com sucesso!');
        } catch (error) {
            setErro(error.response?.data || 'Erro ao cadastrar cliente');
            console.error('Erro:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="formulario-cliente">
            <h2>Cadastrar Cliente</h2>

            {erro && <div className="erro">{erro}</div>}

            <div className="campo">
                <label>Nome:</label>
                <input
                    type="text"
                    value={cliente.nome}
                    onChange={(e) => setCliente({ ...cliente, nome: e.target.value })}
                    required
                />
            </div>

            <div className="campo">
                <label>CPF:</label>
                <input
                    type="text"
                    value={cliente.cpf}
                    onChange={(e) => setCliente({ ...cliente, cpf: e.target.value })}
                    placeholder="000.000.000-00"
                    required
                />
            </div>

            <div className="campo">
                <label>Data de Nascimento:</label>
                <input
                    type="date"
                    value={cliente.dataNascimento}
                    onChange={(e) => setCliente({ ...cliente, dataNascimento: e.target.value })}
                    required
                />
            </div>

            <div className="campo">
                <label>Endereço:</label>
                <input
                    type="text"
                    value={cliente.endereco}
                    onChange={(e) => setCliente({ ...cliente, endereco: e.target.value })}
                />
            </div>

            <button type="submit">Salvar</button>
        </form>
    );
};