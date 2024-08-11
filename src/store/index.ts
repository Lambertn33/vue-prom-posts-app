import Vuex from "vuex";
import { postsModule } from "./modules/posts";

const store = new Vuex.Store({
  modules: {
    posts: postsModule,
  },
});

console.log(store);

export default store;
