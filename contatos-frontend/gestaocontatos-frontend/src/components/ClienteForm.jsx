import { useState } from 'react';
import { createCliente } from '../services/api';
import { formatarCPF, removerMascaraCPF, validarCPF, validarDataNascimento } from '../utils/validacoes';

export const ClienteForm = ({ onClienteAdicionado }) => {
    const [cliente, setCliente] = useState({
        nome: '',
        cpf: '',
        dataNascimento: '',
        endereco: ''
    });
    const [erro, setErro] = useState('');
    const [mostrarModalSucesso, setMostrarModalSucesso] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        let novoValor = value;

        if (name === "cpf") novoValor = formatarCPF(value);

        setCliente({ ...cliente, [name]: novoValor });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErro('');

        const erroData = validarDataNascimento(cliente.dataNascimento);
        if (erroData) {
            setErro(erroData);
            return;
        }

        if (!validarCPF(cliente.cpf)) {
            setErro("CPF inválido.");
            return;
        }

        try {
            const clienteParaEnviar = { ...cliente, cpf: removerMascaraCPF(cliente.cpf) };
            await createCliente(clienteParaEnviar);
            setCliente({ nome: '', cpf: '', dataNascimento: '', endereco: '' });
            if (onClienteAdicionado) onClienteAdicionado();
            setMostrarModalSucesso(true);
        } catch (error) {
            setErro(error.response?.data || 'Erro ao cadastrar cliente');
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
                    max={new Date().toISOString().split("T")[0]}
                    min={new Date(new Date().setFullYear(new Date().getFullYear() - 150)).toISOString().split("T")[0]}
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

            {mostrarModalSucesso && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <p>Cliente Salvo com Sucesso</p>
                        <div className="modal-botoes">
                            <button className="btn-confirmar" onClick={() => {
                                setMostrarModalSucesso(false);
                                navigate('/');
                            }}>OK</button>
                        </div>
                    </div>
                </div>
            )}
        </form>

    );
};
