import { useEffect, useState } from 'react';
import { getClientes, deleteCliente } from '../services/api';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export const ClienteList = () => {
    const navigate = useNavigate(); // Definindo navigate corretamente
    const [clientes, setClientes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Função para carregar clientes
    const carregarClientes = async () => {
        try {
            const data = await getClientes();
            setClientes(data);
            setError(null);
        } catch (err) {
            setError('Erro ao carregar clientes. Verifique o servidor.');
            console.error('Detalhes do erro:', err.response?.data || err.message);
        } finally {
            setLoading(false);
        }
    };

    // Executa ao carregar o componente
    useEffect(() => {
        carregarClientes();
    }, []);

    // Excluir cliente
    const handleExcluir = async (id) => {
        try {
            await deleteCliente(id);
            await carregarClientes(); // Recarrega a lista após exclusão
        } catch (err) {
            console.error('Erro ao excluir:', err);
        }
    };

    return (
        <div className="clientes-container">
            <h2>Clientes Cadastrados</h2>

            {loading && <div>Carregando...</div>}

            {error && <div className="error-message">{error}</div>}

            {!loading && !error && (
                <>
                    {clientes.length === 0 ? (
                        <p>Nenhum cliente cadastrado.</p>
                    ) : (
                        <div className="clientes-lista">
                            {clientes.map((cliente) => (
                                <div key={cliente.id} className="cliente-item">
                                    <div className="cliente-detalhes">
                                        <h3>{cliente.nome}</h3>
                                        <p><strong>CPF:</strong> {cliente.cpf}</p>
                                        <p><strong>Nascimento:</strong> {new Date(cliente.dataNascimento).toLocaleDateString()}</p>
                                        <p><strong>Endereço:</strong> {cliente.endereco}</p>
                                    </div>
                                    <div className="cliente-acoes">
                                        <button onClick={() => navigate(`/editar/${cliente.id}`)}>
                                            <FaEdit/>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </>
            )}
        </div>
    );
};