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
    }
    
};