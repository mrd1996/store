var express = require('express');
var router = express.Router();
var Pubs = require("../controllers/pubs")

const { verifyToken } = require('../middleware/auth')

router.get('/', function(req, res) {
    Pubs.getPubsList(req.query.limit, req.query.page)
      .then(dados => res.jsonp(dados))
      .catch(e => res.status(500).send(`Erro na listagem de pubs: ${e}`))
});

router.get('/:id', verifyToken, function(req, res) {
    Pubs.getPubGames(req.params.id, req.userId)
      .then(dados => res.jsonp(dados))
      .catch(e => res.status(500).send(`Erro na listagem dos jogos do pub: ${req.params.id}: ${e}`))
});


module.exports = router;
