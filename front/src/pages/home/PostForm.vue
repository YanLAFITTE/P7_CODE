<script>
export default {
  data() {
    return {
      content: "",
      selectedImage: null,
    };
  },
  methods: {
    handleNewFile(e) {
      this.selectedImage = e.target.files[0];
    },
    handleClick() {
      const { VITE_SERVER_ADDRESS, VITE_SERVER_PORT } = import.meta.env;
      const url = `http://${VITE_SERVER_ADDRESS}:${VITE_SERVER_PORT}/posts`;

      const formData = new FormData();
      formData.append("content", this.content);
      formData.append("image", this.selectedImage);

      const options = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          Accept: "application/json",
        },
        method: "POST",
        body: formData,
      };
      fetch(url, options)
        .then((res) => {
          if (res.status == 200) {
            return res.json();
          } else {
            throw new Error("Failed to fetch posts");
          }
        })
        .then((res) => {
          // this.$router.go();
        })
        .catch((err) => console.log("err:", err));
    },
  },
};
</script>
<template>
  <div class="post-wrap constainer-md">
    <div class="form-group">
      <input
        placeholder="Exprimez-vous ici..."
        class="form-control text-muted input-post"
        v-model="content"
      />
    </div>
    <div class="d-flex">
      <label for="file-upload" class="btn btn-secondary mt-1"
        >Ajouter une image</label
      >
      <span v-if="selectedImage">{{selectedImage.name}}</span>
      <input id="file-upload" type="file" @change="handleNewFile" />

      <button
        @click="handleClick"
        type="button"
        class="btn btn-primary mt-1 ms-auto"
      >
        Envoyer
      </button>
    </div>

    <hr class="drodown-divider mt-4 mb-4" />
  </div>
</template>
<style scoped>
div span {
  font-size: 20px;
  margin: 15px;
}
#file-upload {
  display: none;
}
@media (min-width: 992px) {
  .post-wrap {
    margin: auto;
    width: 70%;
  }
}
</style>
