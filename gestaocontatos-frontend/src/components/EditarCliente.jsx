import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getClienteById, updateCliente, deleteCliente } from '../services/api';

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

    useEffect(() => {
        const carregarCliente = async () => {
            try {
                const data = await getClienteById(id);
                setCliente({
                    ...data,
                    contatos: data.contatos || []
                });
            } catch (error) {
                setErro('Erro ao carregar cliente');
            }
        };
        carregarCliente();
    }, [id]);

    const handleChange = (e) => {
        setCliente({ ...cliente, [e.target.name]: e.target.value });
    };

    const handleContatoChange = (index, campo, valor) => {
        const novosContatos = [...cliente.contatos];
        novosContatos[index][campo] = valor;
        setCliente({ ...cliente, contatos: novosContatos });
    };

    const adicionarContato = () => {
        setCliente(prevCliente => ({
            ...prevCliente,
            contatos: [...prevCliente.contatos, { tipo: 'Telefone', valor: '', observacao: '' }]
        }));
    };

    const removerContato = (index) => {
        setCliente(prevCliente => ({
            ...prevCliente,
            contatos: prevCliente.contatos.filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateCliente(id, cliente);
            navigate('/');
        } catch (error) {
            setErro(error.message || 'Erro ao atualizar cliente');
        }
    };

    const handleDelete = async () => {
        const confirmacao = window.confirm("Tem certeza que deseja excluir este cliente? Essa ação não pode ser desfeita.");
        if (confirmacao) {
            try {
                await deleteCliente(id);
                alert("Cliente excluído com sucesso!");
                navigate('/');
            } catch (error) {
                setErro('Erro ao excluir cliente');
            }
        }
    };

    return (
        <div className="editar-cliente">
            <h2>Editar Cliente</h2>

            {erro && <div className="erro">{erro}</div>}

            <form onSubmit={handleSubmit}>
                <div className="campo">
                    <label>Nome:</label>
                    <input type="text" name="nome" value={cliente.nome} onChange={handleChange} required />
                </div>

                <div className="campo">
                    <label>CPF:</label>
                    <input type="text" name="cpf" value={cliente.cpf} onChange={handleChange} required />
                </div>

                <div className="campo">
                    <label>Data Nascimento:</label>
                    <input type="date" name="dataNascimento" value={cliente.dataNascimento} onChange={handleChange} required />
                </div>

                <div className="campo">
                    <label>Endereço:</label>
                    <input type="text" name="endereco" value={cliente.endereco} onChange={handleChange} />
                </div>

                {/* Contatos */}
                <div className="contatos">
                    <h3>Contatos</h3>

                    {cliente.contatos.length > 0 ? (
                        cliente.contatos.map((contato, index) => (
                            <div key={index} className="contato-item">
                                <label>Tipo:</label>
                                <select value={contato.tipo} onChange={(e) => handleContatoChange(index, 'tipo', e.target.value)}>
                                    <option value="Telefone">Telefone</option>
                                    <option value="E-mail">E-mail</option>
                                </select>

                                <label>Valor:</label>
                                <input type="text" placeholder="Valor" value={contato.valor} onChange={(e) => handleContatoChange(index, 'valor', e.target.value)} required />

                                <label>Observação:</label>
                                <input type="text" placeholder="Observação" value={contato.observacao} onChange={(e) => handleContatoChange(index, 'observacao', e.target.value)} />

                                <button type="button" onClick={() => removerContato(index)} className="btn-remover">Remover</button>
                            </div>
                        ))
                    ) : (
                        <p>Nenhum contato cadastrado.</p>
                    )}

                    <button type="button" onClick={adicionarContato} className="btn-adicionar">Adicionar Contato</button>
                </div>

                <button type="submit">Salvar Alterações</button>
            </form>

            {/* Botão de exclusão no final */}
            <button type="button" onClick={handleDelete} className="btn-excluir">
                Excluir Cliente
            </button>
        </div>
    );
}
