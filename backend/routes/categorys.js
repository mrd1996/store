var express = require("express");
var router = express.Router();
var Categorys = require("../controllers/categorys");

const { verifyToken } = require("../middleware/auth");

router.get("/", function (req, res) {
  Categorys.getCatList()
    .then(dados => res.jsonp(dados))
    .catch(e => res.status(500).send(`Erro na listagem de categorias: ${e}`));
});

router.get("/:id", function (req, res) {
  Categorys.getCategGames(
    req.query.limit,
    req.query.page,
    req.params.id,
    req.userId
  )
    .then(dados => res.jsonp(dados))
    .catch(e =>
      res
        .status(500)
        .send(`Erro na listagem dos jogos da categoria: ${req.params.id}: ${e}`)
    );
});

module.exports = router;
