var express = require('express');
const amigosController = require('../controllers/amigosController');
var router = express.Router();

router.get('/', amigosController.listar);

module.exports = router;