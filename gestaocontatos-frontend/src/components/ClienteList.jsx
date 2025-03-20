import { useEffect, useState } from 'react';
import { getClientes, deleteCliente } from '../services/api';
import { FaEdit, FaTrash } from 'react-icons/fa';

export const ClienteList = () => {
    const [clientes, setClientes] = useState([]);

    const loadClientes = async () => {
        const data = await getClientes();
        setClientes(data);
    };

    useEffect(() => {
        loadClientes();
    }, []);

    return (
        <div className="list-container">
            <h2>Clientes Cadastrados</h2>
            {clientes.map((cliente) => (
                <div key={cliente.id} className="cliente-item">
                    <h3>{cliente.nome}</h3>
                    <p>CPF: {cliente.cpf}</p>
                    <div className="actions">
                        <button onClick={() => {/* Implemente a edição */}}>
                            <FaEdit />
                        </button>
                        <button onClick={() => deleteCliente(cliente.id).then(loadClientes)}>
                            <FaTrash />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};