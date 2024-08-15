import Vuex from "vuex";
import { postsModule } from "./modules/posts";
import { postModule } from "./modules/post";
import createPersistedState from "vuex-persistedstate";

const store = new Vuex.Store({
  modules: {
    posts: postsModule,
    post: postModule,
  },
  plugins: [createPersistedState()],
});

console.log(store);

export default store;
