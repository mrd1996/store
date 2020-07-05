import Vue from "vue";
import VueRouter from "vue-router";
import HomePage from "../views/Homepage.vue";
import RegisterPage from "../views/RegisterPage.vue";
import GamePage from "../views/GamePage.vue";
import LibraryPage from "../views/LibraryPage.vue";
import StorePage from "../views/StorePage.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomePage,
  },
  {
    path: "/store",
    name: "store",
    component: StorePage,
  },
  {
    path: "/library",
    name: "library",
    component: LibraryPage,
  },
  {
    path: "/Register",
    name: "profile",
    component: RegisterPage,
  },
  {
    path: "/game/:id",
    name: "profile",
    component: GamePage,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
