const FaltaService = require('../services/FaltaService');

// Buscar todos os alunos
module.exports = {

  buscarTodos: async (req, res) => {
    let json = {error:'', result:[]};

    let alunos = await FaltaService.buscarTodos();

    for(let i in alunos) {
      json.result.push({
        codigo: alunos[i].Cod_Aluno,
        nome: alunos[i].Nome_Aluno,
        codigoturma: alunos[i].Cod_Turma
      });
    }
    res.json(json)
  },

  buscarTodasFaltas: async (req, res) => {
    try {
        const faltas = await FaltaService.buscarTodasFaltas();
        res.render('pagina_faltas', { faltas }); // Supondo que você tenha um arquivo HTML/EJS chamado pagina_faltas para renderizar os dados
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar as faltas.' });
    }
  },

  confirmarFalta: async (req, res) => {
    const { faltasEnviar } = req.body;

    try {
      await FaltaService.registrarFaltas(faltasEnviar);

      res.status(200).json({ message: 'Faltas registradas com sucesso!' });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao registrar as faltas.' });
    }
  }

};


