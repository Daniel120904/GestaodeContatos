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

    // Função para formatar CPF conforme o usuário digita
    const formatarCPF = (valor) => {
        return valor
            .replace(/\D/g, '') // Remove tudo que não for número
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
            .slice(0, 14); // Limita a 14 caracteres
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Aplica formatação ao CPF
        const novoValor = name === 'cpf' ? formatarCPF(value) : value;

        setCliente({ ...cliente, [name]: novoValor });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErro('');

        const dataAtual = new Date();
        const dataNascimento = new Date(cliente.dataNascimento);
        const dataMinima = new Date();
        dataMinima.setFullYear(dataAtual.getFullYear() - 150); // Define o limite mínimo

        // Validações apenas no momento do envio
        if (dataNascimento > dataAtual) {
            setErro("A data de nascimento não pode ser no futuro.");
            return;
        } else if (dataNascimento < dataMinima) {
            setErro("A data de nascimento é muito antiga.");
            return;
        }

        try {
            // Remove a máscara do CPF antes de enviar para a API
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
                    name="nome"
                    value={cliente.nome}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="campo">
                <label>CPF:</label>
                <input
                    type="text"
                    name="cpf"
                    value={cliente.cpf}
                    onChange={handleChange}
                    placeholder="000.000.000-00"
                    maxLength="14"
                    required
                />
            </div>

            <div className="campo">
                <label>Data de Nascimento:</label>
                <input
                    type="date"
                    name="dataNascimento"
                    value={cliente.dataNascimento}
                    onChange={handleChange}
                    max={new Date().toISOString().split("T")[0]} // Define o limite máximo como hoje
                    min={new Date(new Date().setFullYear(new Date().getFullYear() - 150)).toISOString().split("T")[0]} // Define o mínimo como 150 anos atrás
                    required
                />
            </div>

            <div className="campo">
                <label>Endereço:</label>
                <input
                    type="text"
                    name="endereco"
                    value={cliente.endereco}
                    onChange={handleChange}
                />
            </div>

            <button type="submit">Salvar</button>
        </form>
    );
};
