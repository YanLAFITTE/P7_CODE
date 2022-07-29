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

exports.createPost = (req, res) => {
  const content = req.body.content;
  const hasImage = req.file != null;

  const url = hasImage ? createImageUrl(req) : null;

  const email = req.email;
  const post = {
    id: posts.length + 1,
    email,
    imageUrl: url,
    content,
    comments: [],
  };

  posts.unshift(post);
  res.send({ post });
};

function createImageUrl(req) {
  let pathToImage = req.file.path.replace("\\", "/");
  const protocol = req.protocol;
  const host = req.get("host");
  return `${protocol}://${host}/${pathToImage}`;
}

exports.createComment = (req, res) => {
  const postId = req.params.id;
  const post = posts.find((post) => post.id == postId);

  console.log("post:", post);
  const id =
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15);

  const email = req.email;
  const commentToSend = { id, email, content: req.body.comment };
  console.log("comment:", commentToSend);
  post.comments.push(commentToSend);
  res.send({ post });
};

exports.deletePost = (req, res) => {
  const postId = req.params.id;
  console.log(postId)
  // const post = posts.find((post) => post.id === postId);
  // const index = posts.indexOf(post);
  // post.splice(index, 1);
  // console.log("posts:", posts);
  // res.send({ message: `Post ${postId} was delted` }, posts);
};
