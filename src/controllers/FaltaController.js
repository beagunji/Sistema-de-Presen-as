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

  confirmarFalta: async (req, res) => {
    const { faltasEnviar } = req.body;

    try {
      await FaltaService.registrarFaltas(faltasEnviar);

      res.status(200).json({ message: 'Faltas registradas com sucesso!' });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao registrar as faltas.' });
    }
  }

  /*registrarFaltas: async (faltasEnviar) => {
    try {
      // Mapeia os códigos dos alunos para objetos que serão inseridos na tabela de faltas
      const registrosFaltas = faltasEnviar.map(async (falta) => {
        const { codAluno } = falta;
        // Aqui você pode adicionar lógica para verificar se o aluno já possui registros de falta para a data atual,
        // ou qualquer outra lógica específica do seu sistema
        const dataAtual = new Date().toISOString().split('T')[0];

        // Cria um registro de falta para o aluno na data atual
        const registroFalta = await db.Falta.create({
          Cod_Aluno: codAluno,
          Qtde_Faltas: 1, // Por exemplo, inicia a quantidade de faltas como 1
          Datas: dataAtual
        });

        return registroFalta;
      });

      // Aguarda a conclusão de todas as inserções de falta
      const result = await Promise.all(registrosFaltas);

      return result;
    } catch (error) {
      throw new Error('Erro ao registrar faltas: ' + error.message);
    }
  },

  confirmarFalta: async (req, res) => {
    try {
      const { faltasEnviar } = req.body; // Recebe os códigos dos alunos que faltaram do corpo da requisição
      const registrosFaltas = await FaltaService.registrarFaltas(faltasEnviar); // Chama o serviço para registrar as faltas no banco de dados

      res.status(200).json({ message: 'Faltas confirmadas com sucesso!', registrosFaltas });
    } catch (error) {
      console.error('Erro ao confirmar faltas:', error);
      res.status(500).json({ error: 'Erro ao confirmar faltas. Verifique o console para mais detalhes.' });
    }
  }*/

};


