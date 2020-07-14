import Vue from "vue";
import VueRouter from "vue-router";
import HomePage from "../views/Homepage.vue";
import RegisterPage from "../views/RegisterPage.vue";
import GamePage from "../views/GamePage.vue";
import DevPage from "../views/DevPage.vue";
import PubPage from "../views/PubPage.vue";
import LibraryPage from "../views/LibraryPage.vue";
import StorePage from "../views/StorePage.vue";
import WishlistPage from "../views/WishlistPage.vue";

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
    path: "/wishlist",
    name: "wishlist",
    component: WishlistPage,
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
  {
    path: "/dev/:id",
    name: "dev",
    component: DevPage,
  },
  {
    path: "/pub/:id",
    name: "pub",
    component: PubPage,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
