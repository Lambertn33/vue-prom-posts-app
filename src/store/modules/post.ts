import axios from "axios";
import { IPostItem } from "@/types";
import { Module } from "vuex";

const serverUrl = import.meta.env.VITE_SERVER_URL;

interface PostState {
  post: IPostItem | null;
  loading: boolean;
  error: string | null;
}

const state = {
  post: null,
  loading: false,
  error: null as string | null,
};

const getters = {
  Post: (state: any) => state.post,
  isLoading: (state: any) => state.loading,
  getError: (state: any) => state.error,
};

const actions = {
  async fetchPost({ commit }: any, postId: number) {
    commit("setLoading", true);
    commit("setError", null);

    try {
      const response = await axios.get(`${serverUrl}/posts/${postId}`);
      commit("setPost", response.data);
    } catch (error) {
      commit("setError", "Failed to fetch post");
    } finally {
      commit("setLoading", false);
    }
  },
};

const mutations = {
  setPost(state: any, post: IPostItem) {
    state.post = post;
  },

  setLoading(state: any, loading: boolean) {
    state.loading = loading;
  },
  setError(state: any, error: string | null) {
    state.error = error;
  },
};

export const postModule: Module<PostState, any> = {
  namespaced: true,
  state,
  actions,
  getters,
  mutations,
};
