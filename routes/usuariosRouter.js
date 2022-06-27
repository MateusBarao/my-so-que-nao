var express = require('express');
var router = express.Router();
var usuariosController = require('../controllers/usuariosController');
const uploadDeAvatar = require('../middlewares/uploadDeAvatar');

router.post('/', uploadDeAvatar, usuariosController.registrar);
router.get ('/', usuariosController.buscar);
router.post ('/login', usuariosController.login);
module.exports = router;
