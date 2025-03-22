export default function ContatoForm({ contatos, onContatoChange, onAdicionarContato, onRemoverContato }) {
    return (
        <div className="contatos-container">
            <h3>Contatos</h3>
            {contatos.map((contato, index) => (
                <div key={index} className="contato-item">
                    <label>Tipo:</label>
                    <select
                        value={contato.tipo}
                        onChange={(e) => onContatoChange(index, 'tipo', e.target.value)}
                    >
                        <option value="Telefone">Telefone</option>
                        <option value="Email">Email</option>
                    </select>

                    <label>Valor:</label>
                    <input
                        type="text"
                        value={contato.valor}
                        onChange={(e) => onContatoChange(index, 'valor', e.target.value)}
                        placeholder="Digite o contato"
                    />

                    <label>Observação:</label>
                    <input
                        type="text"
                        value={contato.observacao}
                        onChange={(e) => onContatoChange(index, 'observacao', e.target.value)}
                        placeholder="Observação (opcional)"
                    />

                    <button type="button" onClick={() => onRemoverContato(index)} className="btn-remover">Remover</button>
                </div>
            ))}

            <button type="button" onClick={onAdicionarContato} className="btn-adicionar">Adicionar Contato</button>
        </div>
    );
}
