import { createRouter, createWebHashHistory } from "vue-router";
import authentification from "../views/authentificationView.vue";

const routes = [
  {
    path: "/",
    name: "authentificationView",
    component: authentification,
  },
  {
    path: "/post",
    name: "postView",

    component: () => import("../views/postView.vue"),
  },
  {
    path: "/post/:id",
    name: "singlePostView",
    component: () => import("../views/singlePostView.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
