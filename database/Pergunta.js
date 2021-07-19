const { Model } = require("sequelize");
const Sequelize = require("sequelize");
const connection = require("./database");
// criando tabela no banco
const Perguntar = connection.define('perguntas',{
    titulo:{
        type: Sequelize.STRING,
        allowNull: false
    },
    descricao:{
        type: Sequelize.TEXT,
        allowNull: false
    }
});

Perguntar.sync({force: false}).then(() => {});

module.exports = Perguntar;