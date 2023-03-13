import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import jwt_decode from 'jwt-decode';
import { useAuthStore } from "../stores/auth.js";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: {
        layout: "base",
      },
    },
    {
      path: "/about",
      name: "about",
      component: () => import("../views/AboutView.vue"),
      meta: {
        layout: "base",
        requiresAuth: true,
      },
    },
    {
      path: "/cat-gpt",
      name: "cat gpt",
      component: () => import("../views/CatGpt.vue"),
      meta: {
        layout: "default",
      },
    },
    {
      path: "/todo-list",
      name: "todo",
      component: () => import("../views/TodoListView.vue"),
      meta: {
        layout: "base",
        requiresAuth: true,
      },
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/LoginPage.vue"),
      meta: {
        layout: "default",
      },
    },
    {
      path: "/register",
      name: "register",
      component: () => import("../views/RegisterPage.vue"),
      meta: {
        layout: "default",
      },
    },
    {
      path: "/sign-out",
      name: "sign out",
      component: () => import("../views/SignOut.vue"),
      meta: {
        layout: "default",
        requiresAuth: true,
      },
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    const token = localStorage.getItem("token");
    if (token) {
      const jwtPayload = jwt_decode(token);
      if (jwtPayload.exp < Date.now()/1000) {
        // token expired
        authStore.logout()
    }

      if (to.name == "login" || to.name == "register") {
        next("/about")
      } else next()
    } else {
      next("/login");
    }
  } else {
    next();
  }
});

export default router;
