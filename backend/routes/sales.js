var express = require('express');
var router = express.Router();
var Sales = require("../controllers/sales")

router.get('/', function(req, res) {
    Sales.getSaleGames()
      .then(dados => res.jsonp(dados))
      .catch(e => res.status(500).send(`Erro na listagem de jogos da sale: ${e}`))
});

module.exports = router;
