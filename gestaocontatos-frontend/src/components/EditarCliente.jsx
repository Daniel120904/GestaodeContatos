import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getClienteById, updateCliente, deleteCliente } from '../services/api';
import ContatoForm from './ContatoForm'; // Importando o novo componente

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
                    cpf: formatarCPF(data.cpf),
                    contatos: data.contatos || []
                });
            } catch (error) {
                setErro('Erro ao carregar cliente');
            }
        };
        carregarCliente();
    }, [id]);

    const formatarCPF = (cpf) => {
        const cpfLimpo = cpf.replace(/\D/g, '');
        return cpfLimpo
            .replace(/^(\d{3})(\d)/, '$1.$2')
            .replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3')
            .replace(/\.(\d{3})(\d)/, '.$1-$2')
            .slice(0, 14);
    };

    const handleChange = (e) => {
        let { name, value } = e.target;
        if (name === "cpf") {
            value = formatarCPF(value);
        }

        setCliente({ ...cliente, [name]: value });
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
        setErro("");

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
            await updateCliente(id, { ...cliente, cpf: cliente.cpf.replace(/\D/g, '') });
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
            <div className="header">
                <h2>Editar Cliente</h2>
                <button type="button" onClick={() => navigate('/')} className="btn-voltar">⬅</button>
            </div>

            {erro && <div className="erro">{erro}</div>}

            <form onSubmit={handleSubmit}>
                <div className="campo">
                    <label>Nome:</label>
                    <input type="text" name="nome" value={cliente.nome} onChange={handleChange} required />
                </div>

                <div className="campo">
                    <label>CPF:</label>
                    <input type="text" name="cpf" value={cliente.cpf} onChange={handleChange} maxLength="14" required />
                </div>

                <div className="campo">
                    <label>Data Nascimento:</label>
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
                    <input type="text" name="endereco" value={cliente.endereco} onChange={handleChange}/>
                </div>

                {/* Chamando o componente ContatoForm */}
                <ContatoForm
                    contatos={cliente.contatos}
                    onContatoChange={handleContatoChange}
                    onAdicionarContato={adicionarContato}
                    onRemoverContato={removerContato}
                />

                <button type="submit">Salvar Alterações</button>
            </form>

            {/* Botão de exclusão */}
            <button type="button" onClick={handleDelete} className="btn-excluir cursor-pointer">
                Excluir Cliente
            </button>
        </div>
    );

}
