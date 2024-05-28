const db = require('../db');

// Buscar todas as faltas
module.exports = {
    buscarTodos: () => {
        return new Promise((aceito, rejeitado) => {

            db.query('select * from Alunos', (error, results) => {
                if(error) { rejeitado(error); return;}
                console.log("Resultados da consulta:", results);
                aceito(results);
            });
        });
    },

    // Buscar professores
    buscarProfessores: () => {
      return new Promise((aceito, rejeitado) => {
          db.query('SELECT * FROM Professor', (error, results) => {
              if (error) {
                  rejeitado(error);
                  return;
              }
              aceito(results);
          });
      });
  },
  // Buscar disciplinas
  buscarDisciplinas: () => {
    return new Promise((aceito, rejeitado) => {
      db.query('SELECT * FROM Disciplina', (error, results) => {
        if (error) {
          rejeitado(error);
          return;
        }
        aceito(results);
      });
    });
  },

  // Buscar turma
  buscarTurmas: () => {
    return new Promise((aceito, rejeitado) => {
        db.query('SELECT * FROM Turmas', (error, results) => {
            if (error) { rejeitado(error); return; }
            aceito(results);
        });
    });
  },

  buscarAlunosPorTurma: (cod_turma) => {
    return new Promise((aceito, rejeitado) => {
        db.query('SELECT * FROM Alunos WHERE Cod_Turma = ?', [cod_turma], (error, results) => {
            if (error) { rejeitado(error); return; }
            aceito(results);
        });
    });
  },

    buscarFaltas: () => {
      return new Promise((aceito, rejeitado) => {
        db.query('SELECT * FROM Novas_Faltas', (error, results) => {
          if (error) { rejeitado(error); return; }
          aceito(results);
        });
      });
    },

    buscarFaltasPorTurma: (cod_turma) => {
      return new Promise((aceito, rejeitado) => {
        db.query('SELECT * FROM Novas_Faltas WHERE Cod_Turma = ?', [cod_turma], (error, results) => {
          if (error) { rejeitado(error); return; }
          aceito(results);
        });
      });
    },

  // Buscar faltas por data
  buscarFaltasPorData: (data) => {
    return new Promise((aceito, rejeitado) => {
      db.query('SELECT * FROM Novas_Faltas WHERE Datas = ?', [data], (error, results) => {
        if (error) { rejeitado(error); return; }
        aceito(results);
      });
    });
  },

    registrarFaltas: (faltasEnviar) => {
      return new Promise((aceito, rejeitado) => {
        const inserts = faltasEnviar.map(falta => {
          if (!falta.codAluno || !falta.nomeAluno || falta.qtdeFaltas || !falta.nomeProfessor || !falta.codigoProfessor || !falta.nomeDisciplina || !falta.codigoDisciplina || !falta.nomeTurma || !falta.codigoTurma) {
            return Promise.reject(new Error('Dados incompletos ou inválidos'));
          }
    
          return new Promise((resolve, reject) => {
            db.query('INSERT INTO Faltas (Cod_Aluno, Nome_Aluno, Qtde_Faltas, Datas, Nome_Prof, Cod_Prof, Nome_Disc, Cod_Disc, Num_Turma, Cod_Turma) VALUES (?, ?, ?, CURDATE(), ?, ?, ?, ?, ?, ?)',  
            [falta.codAluno, falta.nomeAluno, falta.qtdeFaltas, falta.nomeProfessor, falta.codigoProfessor, falta.nomeDisciplina, falta.codigoDisciplina, falta.nomeTurma, falta.codigoTurma], (error, results) => {
              if(error) { reject(error); return; }
              resolve(results);
            });
          });
        });
    
        Promise.all(inserts)
          .then(() => aceito())
          .catch(error => rejeitado(error));
      });
    },
  
    // Deletar faltas
    deletarFalta: (codFalta) => {
      return new Promise((resolve, reject) => {
        db.query('DELETE FROM Novas_Faltas WHERE Cod_Nova_Falta = ?', [codFalta], (error, results) => {
          if (error) {
            reject(error);
            return;
          }
          resolve(results);
        });
      });
    }
  
};