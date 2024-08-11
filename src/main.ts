import { createApp } from "vue";

import App from "./App.vue";

import naive from "naive-ui";

import { router } from "./router";

import "./style.css";

createApp(App).use(router).use(naive).mount("#app");
