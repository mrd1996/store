var express = require('express');
var router = express.Router();
var Devs = require("../controllers/devs")

router.get('/', function(req, res) {
    Devs.getDevsList()
      .then(dados => res.jsonp(dados))
      .catch(e => res.status(500).send(`Erro na listagem de devs: ${e}`))
});

router.get('/:id', function(req, res) {
    Devs.getDevGames(req.params.id)
      .then(dados => res.jsonp(dados))
      .catch(e => res.status(500).send(`Erro na listagem dos jogos do dev: ${req.params.id}: ${e}`))
});
  

module.exports = router;
