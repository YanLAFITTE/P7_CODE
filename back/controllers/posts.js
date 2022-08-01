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

exports.getPosts = async (req, res) => {
  const email = req.email;
  const posts = await prisma.post.findMany({
    include: {
      comments: {
        orderBy: {
          createdAt: "asc",
        },
        include: {
          user: {
            select: {
              email: true,
            },
          },
        },
      },
      user: {
        select: {
          email: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  res.send({ posts: posts, email });
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
    console.log("result:", result);
    res.send({ post: result });
  } catch (error) {
    res.status(500).send({ error: "Failed to create post" });
  }
};

addImageUrlToPost = (req, post) => {
  const hasImage = req.file != null;
  if (!hasImage) return;
  let pathToImage = req.file.path.replace("\\", "/");
  const protocol = req.protocol;
  const host = req.get("host");
  const url = `${protocol}://${host}/${pathToImage}`;
  post.imageUrl = url;
};

exports.createComment = async (req, res) => {
  const postId = Number(req.params.id);

  const post = await prisma.post.findUnique({
    where: { id: postId },
    include: {
      user: {
        select: {
          id: true,
        },
      },
    },
  });
  if (post == null) {
    return res.status(404).send({ error: "Post not found" });
  }

  const userId = post.user.id;

  const commentToSend = { userId, postId, content: req.body.comment }; 
  const comment = await prisma.comment.create({ data: commentToSend }); 

  res.send({ comment });
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

deleteComments = (post) => {
  post.comments = [];
};
