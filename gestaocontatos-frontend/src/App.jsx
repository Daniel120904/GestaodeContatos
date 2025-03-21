import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ClienteForm } from './components/ClienteForm';
import { ClienteList } from './components/ClienteList';
import EditarCliente from './components/EditarCliente'; // Importação correta
import { useState } from 'react';

const Home = ({ refreshKey, onClienteAdicionado }) => {
    return (
        <div className="app">
            <h1>Gestão de Contatos - Comércio S.A.</h1>
            <div className="content">
                <ClienteForm onClienteAdicionado={onClienteAdicionado} />
                <ClienteList key={refreshKey} />
            </div>
        </div>
    );
};

function App() {
    const [refreshKey, setRefreshKey] = useState(0);

    return (
        <Router>
            <Routes>
                <Route
                    path="/"
                    element={
                        <Home
                            refreshKey={refreshKey}
                            onClienteAdicionado={() => setRefreshKey(prev => prev + 1)}
                        />
                    }
                />
                <Route path="/editar/:id" element={<EditarCliente />} />
            </Routes>
        </Router>
    );
}

export default App;