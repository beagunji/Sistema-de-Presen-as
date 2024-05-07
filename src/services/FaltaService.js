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

    buscarTodasFaltas: () => {
      return new Promise((aceito, rejeitado) => {
          db.query('SELECT * FROM Faltas', (error, results) => {
              if(error) { rejeitado(error); return; }
              aceito(results);
          });
      });
    },

    registrarFaltas: (faltasEnviar) => {
        return new Promise((aceito, rejeitado) => {
          const inserts = faltasEnviar.map(falta => {
            return new Promise((resolve, reject) => {
              db.query('INSERT INTO Faltas (Cod_Aluno, Qtde_Faltas, Datas) VALUES (?, ?, CURDATE())', [falta.codAluno, 1], (error, results) => {
                if(error) { reject(error); return; }
                resolve(results);
              });
            });
          });
    
          Promise.all(inserts)
            .then(() => aceito())
            .catch(error => rejeitado(error));
        });
    }
    
};