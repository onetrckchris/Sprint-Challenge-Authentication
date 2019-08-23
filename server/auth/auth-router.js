const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const secrets = require('../config/secrets');
const Users = require('../users/users-model');

router.post('/register', (req, res) => {
  const user = req.body;
  const hash = bcrypt.hashSync(user.password, 12);
  user.password = hash;

  if(user.username && user.password) {
      Users.register(user)
          .then(id => res.status(201).json(id))
          .catch(err => res.status(500).json({ error: err }));
  } else {
      res.status(404).json({ error: "Please provide a username and password." })
  }
});

router.post('/login', (req, res) => {
  const {username, password} = req.body;

  Users.login(username)
      .then(user => {
          if(user && bcrypt.compareSync(password, user.password)) {
              const token = generateToken(user);

              res.status(200).json({
                  message: `Welcome ${user.username}!`, 
                  token
              });
          } else {
              res.status(401).json({ error: "Invalid Credentials." });
          }
      })
      .catch(err => res.status(500).json({ error: err }));
});

function generateToken(user) {
  const payload = {
      subject: user.id,
      username: user.username
  };

  const options = {
      expiresIn: '1d'
  };

  return jwt.sign(payload, secrets.jwtSecret, options);
}

module.exports = router;
