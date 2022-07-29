const express = require("express");
const router = express.Router();

const { checkAuth } = require("../middleware/checkAuth");

const multer = require("../middleware/multer-config");


const postsCtrl = require("../controllers/posts");

router.use(checkAuth);
router.post("/:id", postsCtrl.createComment)
router.delete("/:id", postsCtrl.deletePost)
router.get("/", postsCtrl.getPosts);
router.post("/", multer, postsCtrl.createPost);

module.exports = router;
