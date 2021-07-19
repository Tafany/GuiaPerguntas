const Sequelize = require('sequelize');

const connection = new Sequelize('guiaperguntas', 'root','001233', {
    host: 'localhost', // qual servidor está rodando
    dialect: 'mysql' // qual banco
});

module.exports = connection;