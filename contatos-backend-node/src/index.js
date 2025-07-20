require('dotenv').config();
const express = require('express');
const cors = require('cors');
require('express-async-errors');

const clienteRoutes = require('./routes/cliente.routes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/clientes', clienteRoutes);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Erro interno no servidor' });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
