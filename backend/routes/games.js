var express = require("express");
var router = express.Router();
var Games = require("../controllers/games");

const { verifyToken } = require("../middleware/auth");

router.get("/", verifyToken, function (req, res) {
  Games.getGamesList(req.query.limit, req.query.page, req.query.category, req.query.genre, req.userId)
    .then(dados => res.jsonp(dados))
    .catch(e => res.status(500).send(`Erro na listagem de jogos: ${e}`));
});

router.get("/:id", function (req, res) {
  Games.getGame(req.params.id)
    .then(dados => res.jsonp(dados))
    .catch(e =>
      res.status(500).send(`Erro na listagem do jogo ${req.params.id}: ${e}`)
    );
});

module.exports = router;
