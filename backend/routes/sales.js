var express = require("express");
var router = express.Router();
var Sales = require("../controllers/sales");
var Games = require("../controllers/games");
var { PythonShell } = require("python-shell");

const { verifyToken } = require("../middleware/auth");

router.get("/", verifyToken, function (req, res) {
  Sales.getSaleGames(req.query.limit, req.query.page, req.userId)
    .then(dados => res.jsonp(dados))
    .catch(e =>
      res.status(500).send(`Erro na listagem de jogos da sale: ${e}`)
    );
});

router.post("/", async function (req, res) {
  var options = {
    mode: "json",
    pythonPath: "/usr/bin/python3",
  };
  PythonShell.run("middleware/sales.py", options, async function (err, data) {
    if (err) throw err;
    try {
      var gamesid = await Games.getGamesId();
      await Sales.removeSales();
      for (game of data[0]) {
        if (gamesid.includes(Object.keys(game)[0])) {
          await Sales.insert(game);
        }
      }
    } catch (e) {
      res.status(500).send(`Erro ao adicionar sales: ${e}`);
    }
    res.status(200).jsonp({ status: "Sales adicionadas" });
  });
});

module.exports = router;
