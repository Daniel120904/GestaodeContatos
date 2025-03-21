import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getClienteById, updateCliente } from '../services/api';

export default function EditarCliente() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [cliente, setCliente] = useState({
        nome: '',
        cpf: '',
        dataNascimento: '',
        endereco: '',
        contatos: []
    });
    const [erro, setErro] = useState('');

    // Carrega dados do cliente
    useEffect(() => {
        const carregarCliente = async () => {
            try {
                const data = await getClienteById(id);
                console.log("Dados do cliente recebidos:", data); // 👀 Log para verificar a API
                setCliente(data);
            } catch (error) {
                setErro('Erro ao carregar cliente');
            }
        };
        carregarCliente();
    }, [id]);


    // Manipula alterações nos campos
    const handleChange = (e) => {
        setCliente({ ...cliente, [e.target.name]: e.target.value });
    };

    // Manipula alterações nos contatos
    const handleContatoChange = (index, campo, valor) => {
        const novosContatos = [...cliente.contatos];
        novosContatos[index][campo] = valor;
        setCliente({ ...cliente, contatos: novosContatos });
    };

    // Adiciona novo contato
    const adicionarContato = () => {
        setCliente({
            ...cliente,
            contatos: [...cliente.contatos, { tipo: 'Telefone', valor: '', observacao: '' }]
        });
    };

    // Remove contato
    const removerContato = (index) => {
        const novosContatos = cliente.contatos.filter((_, i) => i !== index);
        setCliente({ ...cliente, contatos: novosContatos });
    };

    // Envia atualização
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateCliente(id, cliente);
            navigate('/');
        } catch (error) {
            setErro(error.message || 'Erro ao atualizar cliente');
        }
    };

    return (
        <div className="editar-cliente">
            <h2>Editar Cliente</h2>

            {erro && <div className="erro">{erro}</div>}

            <form onSubmit={handleSubmit}>
                {/* Campos do Cliente */}
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
                        required
                    />
                </div>

                <div className="campo">
                    <label>Data Nascimento:</label>
                    <input
                        type="date"
                        name="dataNascimento"
                        value={cliente.dataNascimento}
                        onChange={handleChange}
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

                {/* Contatos */}
                <div className="contatos">
                    <h3>Contatos</h3>

                    {cliente.contatos?.map((contato, index) => (
                        <div key={index} className="contato-item">
                            <select
                                value={contato.tipo}
                                onChange={(e) => handleContatoChange(index, 'tipo', e.target.value)}
                            >
                                <option value="Telefone">Telefone</option>
                                <option value="E-mail">E-mail</option>
                            </select>

                            <input
                                type="text"
                                placeholder="Valor"
                                value={contato.valor}
                                onChange={(e) => handleContatoChange(index, 'valor', e.target.value)}
                                required
                            />

                            <input
                                type="text"
                                placeholder="Observação"
                                value={contato.observacao}
                                onChange={(e) => handleContatoChange(index, 'observacao', e.target.value)}
                            />

                            <button
                                type="button"
                                onClick={() => removerContato(index)}
                                className="btn-remover"
                            >
                                Remover
                            </button>
                        </div>
                    ))}

                    <button type="button" onClick={adicionarContato} className="btn-adicionar">
                        Adicionar Contato
                    </button>
                </div>

                <button type="submit">Salvar Alterações</button>
            </form>
        </div>
    );
}