import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    redirect: "/homePage",
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/auth/login.vue"),
  },

  {
    path: "/homePage",
    name: "homePage",
    component: () => import("../views/homePage/index.vue"),
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: () => import("../views/dashboard/index.vue"),
  },

  {
    path: "/urlList",
    name: "urlList",
    component: () => import("../views/urlList/index.vue"),
  },
  {
    path: "/url/:id",
    name: "url",
    component: () => import("../views/url/index.vue"),
    props: true,
  },

  { path: "/:notFound(.*)", redirect: "/homePage" },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active",
});

export default router;
