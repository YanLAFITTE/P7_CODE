<script>
import Comment from "../../ui/post/Comment.vue";
export default {
  components: {
    Comment,
  },
  props: ["email", "content", "url", "comments", "id"],
  data() {
    return {
      currentComment: null,
    };
  },

  methods: {
    addComment(e) {
      const { VITE_SERVER_ADDRESS, VITE_SERVER_PORT } = import.meta.env;
      const url = `http://${VITE_SERVER_ADDRESS}:${VITE_SERVER_PORT}/posts`;

      const options = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          Accept: "application/json",
          "Content-type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          comment: this.currentComment,
        }),
      };

      fetch(url + "/" + this.$props.id, options)
        .then((res) => {
          if (res.status === 200) {
            return res.json();
          } else {
            throw new Error("Failed to add comment");
          }
        })
        .then((res) => {
          console.log(res);
          this.$router.go();
        })
        .catch((err) => console.log("err:", err));
    },
    deletePost(e) {
      const { VITE_SERVER_ADDRESS, VITE_SERVER_PORT } = import.meta.env;
      const url = `http://${VITE_SERVER_ADDRESS}:${VITE_SERVER_PORT}/posts`;

      fetch(url + "/" + this.$props.id, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          Accept: "application/json",
          "Content-type": "application/json",
        },
        method: "DELETE",
      })
        .then((res) => {
          if (res.status === 200) {
            return res.json();
          } else {
            throw new Error("Failed to delete post");
          }
        })
        .then((res) => {
          this.$router.go();
        })
        .catch((err) => console.log("err:", err));
    },
  },
};
</script>
<template>
  <div class="card mb-3 m-auto">
    <div class="card-body">
      <div class="card-header mb-3 bg-white">
        <div class="header-infos mt-3">
          <strong>{{ email }}</strong>
        </div>
        <i class="bi bi-trash" @click="deletePost"></i>
      </div>

      <p class="card-text">{{ content }}</p>

      <img v-if="url" :src="url" class="card-img-bottom mb-4" alt="image" />
      <div v-for="comment in comments">
        <Comment :email="comment.email" :content="comment.content" />
      </div>

      <div class="d-flex gap-1">
        <input
          type="text"
          class="form-control"
          placeholder="Commentaires..."
          aria-label="Commentaires"
          v-model="currentComment"
        />
        <button
          type="button"
          class="btn btn-primary ms-auto"
          @click="addComment"
        >
          Envoyer
        </button>
      </div>
    </div>
  </div>
</template>
<style>
.bi-trash {
  font-size: 1.2rem;
  color: black;
}
.bi-trash:hover {
  cursor: pointer;
  color: red;
}
@media (min-width: 992px) {
  .card {
    width: 70%;
  }
}
.card-img-bottom {
  max-height: 15rem;
  object-fit: cover;
}
.card-header img {
  width: 6rem;
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
