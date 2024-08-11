import { createApp } from "vue";

import App from "./App.vue";

import naive from "naive-ui";

import { router } from "./router";

import store from "./store";

import TheNavbar from "./components/TheNavbar.vue";

import PostCard from "./components/PostCard.vue";

import "./style.css";

createApp(App)
  .component("the-navbar", TheNavbar)
  .component("post-card", PostCard)
  .use(router)
  .use(naive)
  .use(store)
  .mount("#app");
