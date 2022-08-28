import { createRouter, createWebHistory } from "vue-router";
import Welcome from "../views/Welcome.vue";
import Admin from "../views/AdminPage.vue";

const routes = [
  {
    path: "/",
    name: "Welcome",
    component: Welcome,
  },
  {
    path: "/adminpage",
    name: "Admin",
    component: Admin,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
