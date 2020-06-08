var express = require('express');
var router = express.Router();
var Pubs = require("../controllers/pubs")

router.get('/', function(req, res) {
    Pubs.getPubsList()
      .then(dados => res.jsonp(dados))
      .catch(e => res.status(500).send(`Erro na listagem de pubs: ${e}`))
});

router.get('/:id', function(req, res) {
    Pubs.getPubGames(req.params.id)
      .then(dados => res.jsonp(dados))
      .catch(e => res.status(500).send(`Erro na listagem dos jogos do pub: ${req.params.id}: ${e}`))
});
  

module.exports = router;
