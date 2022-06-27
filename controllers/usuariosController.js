const { Usuario } = require('../models');
const { Op } = require ('sequelize');
const bcrypt = require ('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = {
    registrar: async (req, res) => {
        try {
            const { nome, email, senha } = req.body;

            const hash = bcrypt.hashSync(senha, 10);

            const verificarUsuarioCadastrado = await Usuario.findOne({where: {email: email}});

            if (verificarUsuarioCadastrado) {
                return res.status(409).json({error: 'E-mail já cadastrado'});
            }

            const novoUsuario = await Usuario.create(
                {
                    nome,
                    email,
                    senha: hash,
                    foto: req.file?.filename
                }
            )

            return res.status(201).json(novoUsuario);
        } catch (error) {
            console.log (error);
            return res.status(401).json({error})
        }

    },
    
    buscar: async (req, res) => {
        
        // Capturar o trecho que está sendo buscado

        let trechoBuscado = req.query.q;

        // Carregar os usuários que tenham o tracho buscado no nome

        let usuarios = await Usuario.findAll (
            {
                where: {nome:{[Op.substring]:trechoBuscado}}
            }
        );
        
        // Enviar para o cliente os usuarios levantados
        res.send(usuarios)
    },

    login: async (req, res) => {
              
            let {email, senha} = req.body;

            const falhaLogin = {error:'Falha no login'}

            let u;            

            try {
                u = await Usuario.findOne({where:{email}})
            } catch (error) {
                return res.status(500).json({msg:"Tente novamente mais tarde"})
            }

            if (u ==='null'){
               return res.status(403).json(falhaLogin);
            }
            
            let validaSenha = bcrypt.compareSync(senha, u.senha)

            if (validaSenha){
                u = u.toJSON();

                delete u.senha
                delete u.deletedAt
                delete u.createdAt
                delete u.updatedAt

                let token = jwt.sign(u, process.env.SECRETKEY);

                return res.status(200).json({usuario: u, token})
            } else {
                return res.status(403).json(falhaLogin)
            }

    }
}