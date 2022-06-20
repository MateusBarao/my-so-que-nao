var express = require('express');
var router = express.Router();
var usuariosController = require('../controllers/usuariosController');
const uploadDeAvatar = require('../middlewares/uploadDeAvatar');

router.post('/', uploadDeAvatar, usuariosController.registrar);
router.get ('/', usuariosController.buscar);
module.exports = router;
