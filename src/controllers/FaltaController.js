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

  buscarFaltas: async (req, res) => {
    let json = { error: '', result: [] };
  
    try {
      let faltas = await FaltaService.buscarFaltas();
  
      for (let i in faltas) {
        json.result.push({
          data: faltas[i].Datas,
          codigoAluno: faltas[i].Cod_Aluno,
          qtdeFaltas: faltas[i].Qtde_Faltas,
          porcFaltas: faltas[i].Porc_Faltas
        });
      }
  
      res.json(json);
    } catch (error) {
      console.error('Erro ao buscar faltas:', error);
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


