import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { useStore } from "vuex";

import Login from "@/views/auth/Login.vue";
import Signup from "@/views/auth/Signup.vue";

import PostsList from "@/views/posts/PostsList.vue";
import PostItem from "@/views/posts/PostItem.vue";
import CreatePost from "@/views/posts/CreatePost.vue";
import UpdatePost from "@/views/posts/UpdatePost.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: PostsList,
  },
  {
    path: "/posts/:id",
    component: PostItem,
  },
  {
    path: "/posts/:id/update",
    component: UpdatePost,
    beforeEnter: (to, from, next) => {
      const store = useStore();
      if (store.getters["auth/isAuthenticated"]) {
        next();
      } else {
        next("/");
      }
    },
  },
  {
    path: "/posts/create",
    component: CreatePost,
    beforeEnter: (to, from, next) => {
      const store = useStore();
      if (store.getters["auth/isAuthenticated"]) {
        next();
      } else {
        next("/");
      }
    },
  },

  {
    path: "/signup",
    component: Signup,
  },
  {
    path: "/login",
    component: Login,
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
