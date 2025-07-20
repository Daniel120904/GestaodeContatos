const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
  getAll: async (req, res) => {
    const clientes = await prisma.cliente.findMany({
      include: { contatos: true }
    });
    res.json(clientes);
  },

  create: async (req, res) => {
  const { nome, cpf, dataNascimento, endereco, contatos } = req.body;

  if (!Array.isArray(contatos)) {
    return res.status(400).json({ error: "'contatos' deve ser um array válido" });
  }

  const novoCliente = await prisma.cliente.create({
    data: {
      nome,
      cpf,
      dataNascimento: new Date(dataNascimento),
      endereco,
      contatos: {
        create: contatos.map(c => ({
          tipo: c.tipo,
          valor: c.valor,
          observacao: c.observacao
        }))
      }
    },
    include: { contatos: true }
  });

  res.status(201).json(novoCliente);
  },

  getById: async (req, res) => {
    const id = parseInt(req.params.id);
    const cliente = await prisma.cliente.findUnique({
        where: { id },
        include: { contatos: true }
    });

    if (!cliente) return res.status(404).json({ error: 'Cliente não encontrado' });
    res.json(cliente);
  },


  update: async (req, res) => {
    const id = parseInt(req.params.id);
    const { nome, cpf, dataNascimento, endereco, contatos } = req.body;

    try {
      const clienteAtualizado = await prisma.cliente.update({
        where: { id },
        data: {
          nome,
          cpf,
          dataNascimento: new Date(dataNascimento),
          endereco,
          contatos: {
            create: contatos.map(c => ({
              tipo: c.tipo,
              valor: c.valor,
              observacao: c.observacao
            }))
          }
        },
        include: { contatos: true }
      });

      res.json(clienteAtualizado);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao atualizar cliente e contatos' });
    }
  },

  remove: async (req, res) => {
    const id = parseInt(req.params.id);
    await prisma.cliente.delete({ where: { id } });
    res.status(204).send();
  }
};
