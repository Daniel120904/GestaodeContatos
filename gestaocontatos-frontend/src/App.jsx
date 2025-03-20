import { ClienteForm } from './components/ClienteForm';
import { ClienteList } from './components/ClienteList';
import { useState } from 'react';

function App() {
    const [refresh, setRefresh] = useState(false);

    return (
        <div className="app">
            <h1>Gestão de Contatos - Comércio S.A.</h1>
            <div className="content">
                <ClienteForm onClienteAdded={() => setRefresh(!refresh)} />
                <ClienteList key={refresh} />
            </div>
        </div>
    );
}

export default App;