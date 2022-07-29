import Home from "../pages/home/HomePage.vue";
import Signup from "../pages/SignupPage.vue";
import Login from "../pages/LoginPage.vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  { path: "/home", component: Home },
  { path: "/signup", component: Signup },
  { path: "/login", component: Login },
  { path: "/", redirect: "/home" },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from) => {
  if (isLoginRequired(to)) {
    return router.push("/login");
  }
});

function isLoginRequired(to) {
  if (!isLoginPages(to)) return false;
  if (!isTokenInStore()) return true;
  return false;
}

function isLoginPages(to) {
  const loginPages = ["/login", "/signup"];
  return !loginPages.includes(to.path);
}

function isTokenInStore() {
  return localStorage.getItem("token") != null;
}

export default router;
