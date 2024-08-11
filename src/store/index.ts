import Vuex from "vuex";
import { postsModule } from "./modules/posts";

const store = new Vuex.Store({
  modules: {
    posts: postsModule,
  },
});

export default store;
