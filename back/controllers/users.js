require("dotenv").config();
// Encryption algorithm.
const bcrypt = require("bcrypt");
// Access token returned with each HTTP request to the server.
const jwt = require("jsonwebtoken");

//DB
const { users } = require("../db/db.js");

exports.signup = (req, res, next) => {
  const { email, password, confirmPassword } = req.body;
  if (password !== confirmPassword)
    return res.status(400).send({error: "Passwords don't match"});
  const user = getUser(email);
  if (user != null) return res.status(400).send({error: "User already exists"});
  hashedPassword(password)
    .then((hash) => {
      saveUser({ email, password: hash });
      res.send({ email: email });
    })
    .catch((error) => res.status(500).json({ error }));
};

function saveUser(user) {
  users.push(user);
}

function hashedPassword(password) {
  return bcrypt.hash(password, 10);
}

exports.login = (req, res) => {
  const { email, password } = req.body;
  const user = getUser(email);
  if (user == null) return res.status(404).send({error: "User not found"});

  verifyPassword(user, password)
    .then((valid) => {
      if (!valid) return res.status(401).send({error: "Wrong password"});
      const token = makeToken(email);
      res.send({ token: token, email: user.email });
    })
    .catch((error) => res.status(500).json({ error }));
};

function makeToken(email) {
  return jwt.sign({ email }, process.env.TOKEN_PASSWORD, { expiresIn: "24h" });
}

function getUser(email) {
  return users.find((user) => user.email === email);
}

function verifyPassword(user, password) {
  return bcrypt.compare(password, user.password);
}
