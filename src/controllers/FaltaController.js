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
  }

}


