<script>
export default {
  data() {
    return {
      isLoggedIn: false,
    };
  },
  created() {
    const token = localStorage.getItem("token");
    if (token == null) {
      this.isLoggedIn = false;
    }
  },
  methods: {
    logout() {
      localStorage.removeItem("token");
      this.$router.go();
    },
    
  },
};
</script>
<template>
  <nav
    class="navbar navbar-expand-md navbar-dark bg-dark"
    aria-label="Fourth navbar example"
  >
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/home">
        <img
          src="../../assets/icon-left-font-monochrome-white.svg"
          alt=""
          width="200"
      /></router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarsExample04"
        aria-controls="navbarsExample04"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarsExample04">
        <ul class="navbar-nav me-auto mb-2 mb-md-0">
          <li class="nav-item">
            <router-link class="nav-link" to="/signup">S'inscrire</router-link>
          </li>
        </ul>
        <button

          v-if="this.isLoggedIn"
          type="button"
          class="btn btn-outline-light"
        >
          Se connecter
        </button>

        <button
          @click="logout"
          v-if="!this.isLoggedIn"
          type="button"
          class="btn btn-outline-light"
        >
          Se déconnecter
        </button>
      </div>
    </div>
  </nav>
</template>
<style>
.navbar {
  margin-bottom: 20px;
}
</style>
