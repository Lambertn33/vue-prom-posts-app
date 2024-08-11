import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

import Login from "../views/auth/Login.vue";
import Signup from "../views/auth/Signup.vue";

import PostsList from "../views/posts/PostsList.vue";
import PostItem from "../views/posts/PostItem.vue";
import CreatePost from "../views/posts/CreatePost.vue";
import UpdatePost from "../views/posts/UpdatePost.vue";
import PostComment from "../views/posts/PostComment.vue";

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
    path: "/posts/:id",
    component: UpdatePost,
  },
  {
    path: "/posts/:id/comment",
    component: PostComment,
  },
  {
    path: "/posts/create",
    component: CreatePost,
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
