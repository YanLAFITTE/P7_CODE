require("dotenv").config();
// Encryption algorithm.
const bcrypt = require("bcrypt");
// Access token returned with each HTTP request to the server.
const jwt = require("jsonwebtoken");

//DB
const { users, prisma } = require("../db/db.js");

exports.signup = async (req, res, next) => {
  const { email, password, confirmPassword } = req.body;
  try {
    if (password !== confirmPassword)
      return res.status(400).send({ error: "Passwords don't match" });
    const dbUser = await getUser(email);
    if (dbUser != null)
      return res.status(400).send({ error: "User already exists" });
    const hash = await hashedPassword(password);
    const user = await saveUser({ email, password: hash });
    res.send({ user });
  } catch (error) {
    res.status(500).json({ error });
  }
};

saveUser = (user) => {
  users.push(user);
  return prisma.user.create({ data: user });
};

hashedPassword = (password) => {
  return bcrypt.hash(password, 10);
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await getUser(email);
    if (user == null) return res.status(404).send({ error: "User not found" });

    const isPasswordValid = await verifyPassword(user, password);

    if (!isPasswordValid)
      return res.status(401).send({ error: "Wrong password" });
    const token = makeToken(email);
    res.send({ token: token, email: user.email });
  } catch (error) {
    res.status(500).json({ error });
  }
};

makeToken = (email) => {
  return jwt.sign({ email }, process.env.TOKEN_PASSWORD, { expiresIn: "24h" });
};

getUser = (email) => {
  return prisma.user.findUnique({ where: { email } });
};

verifyPassword = (user, password) => {
  return bcrypt.compare(password, user.password);
};
