import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    redirect: "/homePage",
  },

  //login page
  {
    path: "/login",
    name: "login",
    component: () => import("../views/auth/login.vue"),
  },

  //homepage
  {
    path: "/homePage",
    name: "homePage",
    component: () => import("../views/homePage/index.vue"),
  },

  //dashboard
  {
    path: "/dashboard",
    name: "dashboard",
    component: () => import("../views/dashboard/index.vue"),
  },

  //show url list
  {
    path: "/urlList",
    name: "urlList",
    component: () => import("../views/urlList/index.vue"),
  },

  //show url details
  {
    path: "/url/:id",
    name: "url",
    component: () => import("../views/url/index.vue"),
    props: true,
  },

  //incase no url found
  { path: "/:notFound(.*)", redirect: "/homePage" },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active",
});

export default router;
