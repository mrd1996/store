var express = require('express');
var router = express.Router();
var Genres = require("../controllers/genres")

const { verifyToken } = require('../middleware/auth')

router.get('/', function(req, res) {
    Genres.getGenreList()
      .then(dados => res.jsonp(dados))
      .catch(e => res.status(500).send(`Erro na listagem de generos: ${e}`))
});

router.get('/:id', verifyToken, function(req, res) {
    Genres.getGenreGames(req.params.id,req.userId)
      .then(dados => res.jsonp(dados))
      .catch(e => res.status(500).send(`Erro na listagem dos jogos do genero: ${req.params.id}: ${e}`))
});
  

module.exports = router;
