import Vuex from "vuex";
import { postsModule } from "./modules/posts";
import { postModule } from "./modules/post";
import { authModule } from "./modules/auth";
import createPersistedState from "vuex-persistedstate";

const store = new Vuex.Store({
  modules: {
    posts: postsModule,
    post: postModule,
    auth: authModule,
  },
  plugins: [createPersistedState()],
});

export default store;
