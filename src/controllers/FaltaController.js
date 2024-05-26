const FaltaService = require('../services/FaltaService');

module.exports = {
  // Buscar todos os alunos
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

  // Buscar professores
  buscarProfessores: async (req, res) => {
    let json = {error:'', result:[]};

    let professores = await FaltaService.buscarProfessores();

    for(let i in professores) {
      json.result.push({
        codigoprof: professores[i].Cod_Prof,
        nomeprof: professores[i].Nome_Prof,
        codigoturmaprof: professores[i].Cod_Prof
      });
    }
    res.json(json)
  },

  // Buscar disciplinas
buscarDisciplinas: async (req, res) => {
  let json = { error: '', result: [] };
  try {
    let disciplinas = await FaltaService.buscarDisciplinas();
    for (let i in disciplinas) {
      json.result.push({
        codigo: disciplinas[i].Cod_Disc,
        nome: disciplinas[i].Nome_Disc
      });
    }
    res.json(json);
  } catch (error) {
    console.error('Erro ao buscar disciplinas:', error);
    res.status(500).json({ error: 'Erro ao buscar as disciplinas.' });
  }
},

  // Buscar turmas
  buscarTurmas: async (req, res) => {
    let json = { error: '', result: [] };

    try {
        let turmas = await FaltaService.buscarTurmas();
        for (let i in turmas) {
            json.result.push({
                codigo: turmas[i].Cod_Turma,
                numero: turmas[i].Num_Turma
            });
        }
        res.json(json);
    } catch (error) {
        console.error('Erro ao buscar turmas:', error);
        res.status(500).json({ error: 'Erro ao buscar as turmas.' });
    }
  },

  // Buscar alunos por turma
  buscarAlunosPorTurma: async (req, res) => {
    let json = { error: '', result: [] };
    let cod_turma = req.params.cod_turma;

    try {
        let alunos = await FaltaService.buscarAlunosPorTurma(cod_turma);
        for (let i in alunos) {
            json.result.push({
                codigo: alunos[i].Cod_Aluno,
                nome: alunos[i].Nome_Aluno
            });
        }
        res.json(json);
    } catch (error) {
        console.error('Erro ao buscar alunos por turma:', error);
        res.status(500).json({ error: 'Erro ao buscar os alunos.' });
    }
  },

  // Buscar faltas
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

  // Confirma faltas
  confirmarFalta: async (req, res) => {
    const { faltasEnviar } = req.body;

    try {
      await FaltaService.registrarFaltas(faltasEnviar);

      res.status(200).json({ message: 'Faltas registradas com sucesso!' });
    } catch (error) {
      console.error('Erro ao registrar as faltas:', error);
      res.status(500).json({ error: 'Erro ao registrar as faltas.' });
    }
  },

  // Deletar faltas
  deletarFalta: async (req, res) => {
    const { codAluno, data } = req.body;
    
    try {
      await FaltaService.deletarFalta(codAluno, data);
      res.status(200).json({ message: 'Falta deletada com sucesso!' });
    } catch (error) {
      console.error('Erro ao deletar falta:', error);
      res.status(500).json({ error: 'Erro ao deletar a falta.' });
    }
  }
};