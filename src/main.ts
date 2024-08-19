import { createApp } from "vue";

import App from "./App.vue";

import naive from "naive-ui";

import { router } from "./router";

import store from "./store";

import TheNavbar from "./components/TheNavbar.vue";

import TheInput from "./components/UI/TheInput.vue";

import TextArea from "./components/UI/TextArea.vue";

import TheButton from "./components/UI/TheButton.vue";

import PostCard from "./components/PostCard.vue";

import { OhVueIcon, addIcons } from "oh-vue-icons";

import {
  FaUser,
  MdComment,
  IoWarningSharp,
  RiEditBoxFill,
} from "oh-vue-icons/icons";

addIcons(FaUser, MdComment, IoWarningSharp, RiEditBoxFill);

import "./style.css";

createApp(App)
  .component("the-navbar", TheNavbar)
  .component("post-card", PostCard)
  .component("the-input", TheInput)
  .component("the-button", TheButton)
  .component("text-area", TextArea)
  .component("v-icon", OhVueIcon)
  .use(router)
  .use(naive)
  .use(store)
  .mount("#app");
