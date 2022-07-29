require("dotenv").config();
const jwt = require("jsonwebtoken");

exports.checkAuth = (req, res, next) => {

  const token = req.headers.authorization.split(" ")[1];
  if (token == null) return res.status(401).send({ error: "Missing token" });

  jwt.verify(token, process.env.TOKEN_PASSWORD, (error, decoded) => {
    if (error) return res.status(401).send({ error: "Invalid token" });
    req.email = decoded.email;

    next();
  });
};
