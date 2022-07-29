<script>
export default {
  name: "LoginPage",

  data() {
    return {
      email: "",
      password: "",
      loginErrors: false,
      error: null,
    };
  },
  methods: {
    invalidateForm,

    checkLogin(email, password, router) {
      const { VITE_SERVER_ADDRESS, VITE_SERVER_PORT } = import.meta.env;
      const url = `http://${VITE_SERVER_ADDRESS}:${VITE_SERVER_PORT}/auth/login`;

      const options = {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      };
      fetch(url, options)
        .then((res) => {
          if (res.ok) return res.json();
          res.text().then((err) => {
            const { error } = JSON.parse(err);
            this.error = error;
            throw new Error(error);
          });
        })
        .then((res) => {
          const token = res.token;
          localStorage.setItem("token", token);
          router.push("/home");
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },

  watch: {
    email(value) {
      const isValueEmpty = value === "";
      this.invalidateForm(!isValueEmpty);
      this.error = null;
    },
    password(value) {
      const isValueEmpty = value === "";
      this.invalidateForm(!isValueEmpty);
      this.error = null;
    },
  },
};

function invalidateForm(bool) {
  this.loginErrors = !bool;
}
</script>
<template>
  <main class="form-signin w-100 m-auto">
    <form :class="this.loginErrors ? 'errors' : ''">
      <h1 class="h3 mb-3 fw-normal">Veuillez vous connecter</h1>

      <div class="form-floating">
        <input
          v-model="email"
          type="email"
          class="form-control email-form"
          id="floatingInput"
          placeholder="email"
          required="true"
          @invalid="invalidateForm"
        />
        <label for="floatingInput" class="text-muted">Email</label>
      </div>
      <div class="form-floating">
        <input
          v-model="password"
          type="password"
          class="form-control password-form"
          id="floatingPassword"
          placeholder="password"
          required="true"
          @invalid="invalidateForm"
        />
        <label for="floatingPassword" class="text-muted">Mot de passe</label>
      </div>

      <div v-if="loginErrors" class="errorMsg">
        Veuillez remplir tous les champs
      </div>

      <div v-if="!loginErrors && error" class="errorMsg">{{ error }}</div>

      <button
        class="w-100 btn btn-lg btn-dark"
        type="submit"
        @click.prevent="() => checkLogin(this.email, this.password, this.$router)"
        :disabled="loginErrors"
      >
        Se connecter
      </button>
      <p class="mt-5 mb-3 text-muted">Value: {{ email }}, {{ password }}</p>
    </form>
  </main>
</template>
<style scoped>
.errors input {
  border: 1px solid red;
}
.errorMsg {
  color: red;
}
h1 {
  display: flex;
  justify-content: center;
  padding: 50px 0;
}

.form-signin {
  max-width: 500px;
  padding: 15px;
}

.form-signin .form-floating:focus-within {
  z-index: 2;
}

.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>
