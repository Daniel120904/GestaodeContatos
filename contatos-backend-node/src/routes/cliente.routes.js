const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/cliente.controller');

router.get('/', clienteController.getAll);
router.post('/', clienteController.create);
router.get('/:id', clienteController.getById);
router.put('/:id', clienteController.update);
router.delete('/:id', clienteController.remove);

module.exports = router;
