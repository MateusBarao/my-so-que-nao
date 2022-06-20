const {Publicacao, sequelize} = require('../models');

Publicacao.findByPk(1, {include: ["Autor", "curtidores"]}).then(
    data => {
        console.log(data.toJSON());
        sequelize.close();
    }
)