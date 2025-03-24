import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getClienteById, updateCliente, deleteCliente } from '../services/api';
import ContatoForm from './ContatoForm'; // Importando o novo componente
import { formatarCPF, removerMascaraCPF, validarCPF, validarDataNascimento, sanitizarTexto } from '../utils/validacoes';

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
    const [mostrarModal, setMostrarModal] = useState(false); // ✅ Controla exibição do modal
    const [mostrarModalSucesso, setMostrarModalSucesso] = useState(false); // ✅ Modal para "Dados Salvos"

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

    const handleChange = (e) => {
        const { name, value } = e.target;
        let novoValor = value;

        if (name === "cpf") novoValor = formatarCPF(value);
        if (name === "nome" || name === "endereco") novoValor = sanitizarTexto(value);

        setCliente({ ...cliente, [name]: novoValor });
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
        setErro('');

        // Validação da Data de Nascimento
        const erroData = validarDataNascimento(cliente.dataNascimento);
        if (erroData) {
            setErro(erroData);
            return;
        }

        // Validação do CPF
        if (!validarCPF(cliente.cpf)) {
            setErro("CPF inválido.");
            return;
        }

        try {
            await updateCliente(id, { ...cliente, cpf: removerMascaraCPF(cliente.cpf) });
            setMostrarModalSucesso(true); // ✅ Exibe modal de sucesso
        } catch (error) {
            setErro(error.message || 'Erro ao atualizar cliente');
        }
    };

    // ✅ Abre o modal ao clicar em "Excluir Cliente"
    const abrirModalExclusao = () => {
        setMostrarModal(true);
    };

    // ✅ Se o usuário confirmar, o cliente será excluído
    const handleExcluir = async () => {
        try {
            await deleteCliente(id);
            navigate('/');
        } catch (error) {
            setErro('Erro ao excluir cliente');
        }
        setMostrarModal(false); // Fecha o modal
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

            {/* Botão de exclusão que abre o modal */}
            <button type="button" onClick={abrirModalExclusao} className="btn-excluir cursor-pointer">
                Excluir Cliente
            </button>

            {/* ✅ Modal de confirmação embutido */}
            {mostrarModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <p>Tem certeza que deseja excluir este cliente?</p>
                        <div className="modal-botoes">
                            <button className="btn-confirmar" onClick={handleExcluir}>Confirmar</button>
                            <button className="btn-cancelar" onClick={() => setMostrarModal(false)}>Cancelar</button>
                        </div>
                    </div>
                </div>
            )}

            {/* ✅ Modal de sucesso ao salvar */}
            {mostrarModalSucesso && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <p>Dados Salvos com Sucesso!</p>
                        <div className="modal-botoes">
                            <button className="btn-confirmar" onClick={() => {
                                setMostrarModalSucesso(false);
                                navigate('/');
                            }}>OK</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );

}
