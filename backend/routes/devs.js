var express = require('express');
var router = express.Router();
var Devs = require("../controllers/devs")

const { verifyToken } = require('../middleware/auth')

router.get('/', function(req, res) {
    Devs.getDevsList(req.query.limit, req.query.page)
      .then(dados => res.jsonp(dados))
      .catch(e => res.status(500).send(`Erro na listagem de devs: ${e}`))
});

router.get('/:id', verifyToken, function(req, res) {
    Devs.getDevGames(req.query.limit, req.query.page, req.params.id, req.userId)
      .then(dados => res.jsonp(dados))
      .catch(e => res.status(500).send(`Erro na listagem dos jogos do dev: ${req.params.id}: ${e}`))
});


module.exports = router;
