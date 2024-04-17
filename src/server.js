require('dotenv').config({path:'config.env'});
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path'); 

const fs = require('fs');

const routes = require('./routes');

const FaltaService = require('./services/FaltaService');

const server = express();
server.use(cors());
server.use(bodyParser.urlencoded({extended: false}));
server.use(bodyParser.json());
server.use(express.static(path.join(__dirname, 'views'), { extensions: ['html', 'js', 'css'] }));

server.use('/api', routes);

server.listen(process.env.PORT, ()=> {
    console.log(`Servidor rodando em: http://localhost:${process.env.PORT}`);
});

