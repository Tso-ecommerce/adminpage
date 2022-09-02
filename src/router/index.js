import { createRouter, createWebHistory } from "vue-router";
import Welcome from "../views/Welcome.vue";
import Create from "../views/CreateProduct.vue";
import Edit from "../views/EditProduct.vue";
import Tag from "../views/FilterTag.vue";
import Admin from "../views/AdminPage.vue";
import { auth } from "@/firebase/config";

const routes = [
  {
    path: "/",
    name: "Welcome",
    component: Welcome,
  },
  {
    path: "/productpage",
    name: "Admin",
    component: Admin,
    beforeEnter(to, from, next) {
      let user = auth.currentUser;
      if (user) {
        next();
      } else {
        next({ name: "Welcome" });
      }
    },
  },
  {
    path: "/create",
    name: "Create",
    component: Create,
  },
  {
    path: "/product/:id",
    name: "Edit",
    component: Edit,
    props: true,
  },
  {
    path: "/products/:tag",
    name: "Tag",
    component: Tag,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
