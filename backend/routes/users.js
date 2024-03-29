var express = require("express");
var router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fs = require("fs");
var Users = require("../controllers/users");
var { nanoid } = require("nanoid");

const { verifyToken } = require("../middleware/auth");

const privateKey = fs.readFileSync("./keys/private.key", "utf8");

// GET USER BY ID
router.get("/:id", function (req, res) {
  Users.getUser(req.params.id)
    .then(dados => res.jsonp(dados))
    .catch(e =>
      res.status(500).send(`Erro na listagem do user ${req.params.id}: ${e}`)
    );
});

// GET USER WISHLIST GAMES
router.get("/:id/wishlist", function (req, res) {
  Users.getUserWishlist(req.params.id)
    .then(dados => res.jsonp(dados))
    .catch(e =>
      res.status(500).send(`Erro na listagem do user ${req.params.id}: ${e}`)
    );
});

// GET USER WISHLIST GAMES IN SALE
router.get("/:id/wishlist/sales", function (req, res) {
  Users.getWishlistSales(req.params.id)
    .then(dados => res.jsonp(dados))
    .catch(e =>
      res.status(500).send(`Erro na listagem do user ${req.params.id}: ${e}`)
    );
});

// GET USER LIBRARY GAMES
router.get("/:id/library", function (req, res) {
  Users.getUserLibrary(req.params.id)
    .then(dados => res.jsonp(dados))
    .catch(e =>
      res.status(500).send(`Erro na listagem do user ${req.params.id}: ${e}`)
    );
});

// POST GAMES IN WISHLISH
router.post("/:id/wishlist", async (req, res) => {
  var { gamesId } = req.body;

  if (!Array.isArray(gamesId)) {
    gamesId = [gamesId];
  }

  for (game in gamesId) {
    try {
      await Users.removeLibrary(req.params.id, gamesId[game]);
      await Users.insertWishlist(req.params.id, gamesId[game]);
      var wish = await Users.getUserWishlist(req.params.id);
      res.status(200).jsonp(wish);
    } catch (e) {
      res
        .status(500)
        .send(`Erro ao inserir na wishlist ${req.params.id}: ${e}`);
    }
  }
});

// DELETE GAMES IN WISHLISH
router.delete("/:id/wishlist", async (req, res) => {
  var { gamesId } = req.body;

  if (!Array.isArray(gamesId)) {
    gamesId = [gamesId];
  }

  for (game of gamesId) {
    try {
      await Users.removeWishlist(req.params.id, game);
      var wish = await Users.getUserWishlist(req.params.id);
      res.status(200).jsonp(wish);
    } catch (e) {
      res
        .status(500)
        .send(`Erro ao remover da wishlist ${req.params.id}: ${e}`);
    }
  }
});

// POST GAMES IN LIBRARY
router.post("/:id/library", async (req, res) => {
  var { gamesId } = req.body;

  if (!Array.isArray(gamesId)) {
    gamesId = [gamesId];
  }

  for (game of gamesId) {
    try {
      await Users.removeWishlist(req.params.id, game);
      await Users.insertLibrary(req.params.id, game);
      var lib = await Users.getUserLibrary(req.params.id);
      res.status(200).jsonp(lib);
    } catch (e) {
      res.status(500).send(`Erro ao inserir na library ${req.params.id}: ${e}`);
    }
  }
});

// DELETE GAMES IN LIBRARY
router.delete("/:id/library", async (req, res) => {
  var { gamesId } = req.body;

  if (!Array.isArray(gamesId)) {
    gamesId = [gamesId];
  }

  for (game of gamesId) {
    try {
      await Users.removeLibrary(req.params.id, game);
      var lib = await Users.getUserLibrary(req.params.id);
      res.status(200).jsonp(lib);
    } catch (e) {
      res.status(500).send(`Erro ao remover da library ${req.params.id}: ${e}`);
    }
  }
});

// POST Login
router.post("/login", (req, res) => {
  Users.getUserByEmail(req.body.email)
    .then(user => {
      if (user[0]) {
        bcrypt.compare(req.body.password, user[0].password, (err, isMatch) => {
          if (err) {
            res.status(401).send({ status: "Authentication failed" });
          } else {
            if (isMatch) {
              const uid = user[0].id;
              jwt.sign(
                {
                  id: user[0].id,
                },
                privateKey,
                { expiresIn: "1h", algorithm: "RS256" },
                (err, token) => {
                  res.status(200).jsonp({
                    status: "OK LOGGED",
                    token,
                    uid,
                    username: user[0].username,
                  });
                }
              );
            } else {
              res.status(401).send({ status: "Authentication failed" });
            }
          }
        });
      } else {
        res.status(401).send({ status: "Authentication failed" });
      }
    })
    .catch(err => res.send({ status: "ERROR" }));
});

// REGISTER USER
router.post("/", async (req, res) => {
  const { username, email, password } = req.body;

  let checkEmail = await Users.getUserByEmail(email);

  if (checkEmail[0]) res.status(401).jsonp({ status: "Email already in use" });
  else {
    let user = {
      username: username,
      email: email,
      password: password,
      id: nanoid(),
    };
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;

        Users.insert(user);
      });
    });
    res.status(200).jsonp({ status: "User Registered" });
  }
});

module.exports = router;
