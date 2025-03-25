import { useEffect, useState } from 'react';
import { getClientes } from '../services/api';
import { formatarCPF } from '../utils/validacoes';
import { FaEdit } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export const ClienteList = () => {
    const navigate = useNavigate();
    const [clientes, setClientes] = useState([]);
    const [clientesFiltrados, setClientesFiltrados] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [termoBusca, setTermoBusca] = useState('');

    useEffect(() => {
        carregarClientes();
    }, []);

    const carregarClientes = async () => {
        try {
            const data = await getClientes();
            setClientes(data);
            setClientesFiltrados(data);
            setError(null);
        } catch (err) {
            setError('Erro ao carregar clientes. Verifique o servidor.');
            console.error('Detalhes do erro:', err.response?.data || err.message);
        } finally {
            setLoading(false);
        }
    };

    const limparCPF = (cpf) => cpf.replace(/\D/g, '');

    const handleBusca = (e) => {
        const termo = e.target.value.toLowerCase().trim();
        setTermoBusca(termo);

        if (termo === '') {
            setClientesFiltrados(clientes);
        } else {
            const filtrados = clientes.filter((cliente) =>
                cliente.nome.toLowerCase().includes(termo) ||
                limparCPF(cliente.cpf).includes(termo)
            );
            setClientesFiltrados(filtrados);
        }
    };

    return (
        <div className="clientes-container">
            <h2>Clientes Cadastrados</h2>

            <input
                type="text"
                placeholder="Buscar por Nome ou CPF"
                value={termoBusca}
                onChange={handleBusca}
                className="barra-pesquisa"
            />

            {loading && <div>Carregando...</div>}
            {error && <div className="error-message">{error}</div>}

            {!loading && !error && (
                <>
                    {clientesFiltrados.length === 0 ? (
                        <p>Nenhum cliente encontrado.</p>
                    ) : (
                        <div className="clientes-lista">
                            {clientesFiltrados.map((cliente) => (
                                <div key={cliente.id} className="cliente-item">
                                    <div className="cliente-detalhes">
                                        <h3>{cliente.nome}</h3>
                                        <p><strong>CPF:</strong> {formatarCPF(cliente.cpf)}</p>
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
