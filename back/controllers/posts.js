const { prisma } = require("../db/db.js");

const comment1 = {
  id: "comment1",
  email: "yan@gmail.com",
  content: "This is my first comment !",
};

const comment2 = {
  id: "comment2",
  email: "alex@gmail.com",
  content: "This is my second comment !",
};

const post1 = {
  id: "1",
  email: "yan@gmail.com",
  content: "This is my first post",
  imageUrl: "https://picsum.photos/400/200",
  comments: [comment1, comment2],
};

const post2 = {
  id: "2",
  email: "alex@gmail.com",
  content: "This is my second post",
  imageUrl: "https://picsum.photos/400/200",
  comments: [comment2],
};

const post3 = {
  id: "3",
  email: "rob@gmail.com",
  content: "This is my third post",
  imageUrl: "https://picsum.photos/400/200",
  comments: [],
};

const posts = [post1, post2, post3];

exports.getPosts = (req, res) => {
  const email = req.email;
  res.send({ posts, email });
};

exports.createPost = async (req, res) => {
  const content = req.body.content;
  const email = req.email;

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    const userId = user.id;
    const post = { userId, content };
    addImageUrlToPost(req, post);
    const result = await prisma.post.create({ data: post });
    res.send({ post: result });
  } catch (error) {
    res.status(500).send({ error: "Failed to create post" });
  }
};

function addImageUrlToPost(req, post) {
  const hasImage = req.file != null;
  if (!hasImage) return;
  let pathToImage = req.file.path.replace("\\", "/");
  const protocol = req.protocol;
  const host = req.get("host");
  const url = `${protocol}://${host}/${pathToImage}`;
  post.imageUrl = url;
}

exports.createComment = (req, res) => {
  const postId = req.params.id;
  const post = posts.find((post) => post.id == postId);
  if (post == null) {
    return res.status(404).send({ error: "Post not found" });
  }
  const id =
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15);

  const email = req.email;
  const commentToSend = { id, email, content: req.body.comment };
  post.comments.push(commentToSend);
  res.send({ post });
};

exports.deletePost = (req, res) => {
  const postId = req.params.id;
  const post = posts.find((post) => post.id === postId);

  if (post == null) {
    res.status(404).send({ error: "Post not found" });
  }
  const index = posts.indexOf(post);
  posts.splice(index, 1);
  deleteComments(post);
  res.status(200).send({ message: `Post ${postId} was delted`, posts });
};

function deleteComments(post) {
  post.comments = [];
}
