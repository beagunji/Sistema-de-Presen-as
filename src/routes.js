const express = require('express');
const router = express.Router();

const FaltaController = require('./controllers/FaltaController');

router.get('/alunos', FaltaController.buscarTodos);

router.post('/faltas', FaltaController.confirmarFalta);

router.get('/faltas', FaltaController.buscarFaltas);

module.exports = router;