<script>
import Post from "../../components/ui/post/Post.vue";
import PostForm from "./PostForm.vue";

export default {
  components: {
    Post,
    PostForm,
  },
  beforeCreate() {
    const token = localStorage.getItem("token");

    if (token == null) {
      this.$router.push("/login");
    }
  },
  mounted() {
    const { VITE_SERVER_ADDRESS, VITE_SERVER_PORT } = import.meta.env;
    const url = `http://${VITE_SERVER_ADDRESS}:${VITE_SERVER_PORT}/posts`;

    const options = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    fetch(url, options)
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else {
          throw new Error("Failed to fetch posts");
        }
      })

      .then((res) => {
        const { email, posts } = res;
        console.log(res.email)
        console.log(res.posts)
        // const posts = res.posts;
        // const email = res.email;
        this.posts = posts;
        this.email = email;
      })
      .catch((err) => console.log("err:", err));
  },
  data() {
    return {
      posts: [],
      email: null,
    };
  },
};
</script>
<template>
  <div v-if="email" class="container-md">
    <div class="d-flex">
      <img
        src="../../assets/icon-left-font-monochrome-black.svg"
        alt=""
        width="300"
        class="m-auto mt-5 mb-4"
      />
    </div>
    <PostForm />
    <div v-if="posts.length === 0">No posts to display. Start chatting!</div>
    <div v-for="post in posts">
      <Post
        :email="post.user.email"
        :id="post.id"
        :url="post.imageUrl"
        :content="post.content"
        :comments="post.comments"
      ></Post>
    </div>
  </div>
</template>
<style></style>
