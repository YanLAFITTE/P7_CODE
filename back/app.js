const express = require("express");
// Cross-Origin Resource Sharing
const cors = require("cors");
const path = require("path");

const postsRoutes = require("./routes/posts.js");
const usersRoutes = require("./routes/users.js");

// Creating an express app.
const app = express();

app.use(cors());

app.use(express.json());

app.use("/images", express.static(path.join(__dirname, "images")));

app.use("/posts", postsRoutes);
app.use("/auth", usersRoutes);

module.exports = app;
