import Vuex from "vuex";
import { postsModule } from "./modules/posts";
import { postModule } from "./modules/post";

const store = new Vuex.Store({
  modules: {
    posts: postsModule,
    post: postModule,
  },
});

export default store;
