import axios from "axios";
import { IPostList } from "../../types";
import { Module } from "vuex";

const serverUrl = import.meta.env.VITE_SERVER_URL;

interface PostsState {
  posts: IPostList[];
  loading: boolean;
  error: string | null;
}

const state = {
  posts: [],
  loading: false,
  error: null as string | null,
};

const getters = {
  allPosts: (state: any) => state.posts,
  isLoading: (state: any) => state.loading,
  getError: (state: any) => state.error,
};

const actions = {
  async fetchPosts({ commit }: any) {
    commit("setLoading", true);
    commit("setError", null);

    try {
      const response = await axios.get(`${serverUrl}/posts`);
      commit("setPosts", response.data);
    } catch (error) {
      commit("setError", "Failed to fetch posts");
    } finally {
      commit("setLoading", false);
    }
  },
};

const mutations = {
  setPosts(state: any, posts: IPostList) {
    state.posts = posts;
  },
  setLoading(state: any, loading: boolean) {
    state.loading = loading;
  },
  setError(state: any, error: string | null) {
    state.error = error;
  },
};

export const postsModule: Module<PostsState, any> = {
  namespaced: true,
  state,
  actions,
  getters,
  mutations,
};
