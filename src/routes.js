const express = require('express');
const router = express.Router();

const FaltaController = require('./controllers/FaltaController');

router.get('/alunos', FaltaController.buscarTodos);

module.exports = router;