var express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require('fs');
var Users = require("../controllers/users")

const { verifyToken } = require('../middleware/auth')

const privateKey = fs.readFileSync('./keys/private.key', 'utf8')

// GET USER BY EMAIL
router.get('/:id', function(req, res) {
    Users.getUser(req.params.id)
      .then(dados => res.jsonp(dados))
      .catch(e => res.status(500).send(`Erro na listagem do user ${req.params.id}: ${e}`))
  });
  

// POST Login
router.post('/login', (req, res) => {
    Users.getUser(req.body.email)
      .then(user => {          
        if (user[0]) {
          bcrypt.compare(req.body.password, user[0].password, (err, isMatch) => {
            if (err) {
              res.status(401).send({ status: "Authentication failed" })
            } else {
              if (isMatch) {
  
                const uid = user[0].username
                jwt.sign({
                  id: user[0].username
                },
                  privateKey, { expiresIn: '1h', algorithm: 'RS256' }, (err, token) => {
                    res.status(200).jsonp({ status: "OK LOGGED", token, uid })
                  })
  
              } else {
                res.status(401).send({ status: "Authentication failed" })
              }
            }
  
          })
        } else {
          res.status(401).send({ status: "Authentication failed" })
        }
      })
      .catch(err => res.send({ status: "ERROR" }))
});
  

// REGISTER USER
// Username and email can't exist in DB
router.post('/', async (req, res) => {
    const { username, email, password } = req.body
    
    let checkEmail = await Users.getUser(email)
    let checkName = await Users.getUserByName(username)
    
    if (checkEmail[0]) 
        res.status(401).jsonp({ status: "Email already in use"})
    else if (checkName[0])
        res.status(401).jsonp({ status: "Username already in use"})
    else {
        let user = {
            username : username,
            email : email,
            password : password
          }
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
              user.password = hash
  
              Users.insert(user)
            })
          })
        res.status(200).jsonp({ status : "User Registered"})
    }
});


module.exports = router;
