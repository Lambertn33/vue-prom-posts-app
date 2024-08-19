import axios from "axios";
import { IPost } from "@/types";
import { Module } from "vuex";

const serverUrl = import.meta.env.VITE_SERVER_URL;

interface PostState {
  post: IPost | null;
  loading: boolean;
  error: string | null;
  updating: boolean;
}

const state = {
  post: null,
  loading: false,
  error: null as string | null,
  updating: false,
};

const getters = {
  getPost: (state: PostState) => state.post,
  isLoading: (state: PostState) => state.loading,
  getError: (state: PostState) => state.error,
  isUpdating: (state: PostState) => state.updating,
};

const actions = {
  async fetchPost({ commit }: any, postId: number) {
    commit("setLoading", true);
    commit("setError", null);

    try {
      const response = await axios.get(`${serverUrl}/posts/${postId}`);
      commit("setPost", response.data);
      return response.data;
    } catch (error) {
      commit("setError", "Failed to fetch post");
    } finally {
      commit("setLoading", false);
    }
  },

  async updatePost(
    { commit }: any,
    {
      postId,
      title,
      content,
    }: { postId: number; title: string; content: string }
  ) {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `${serverUrl}/posts/${postId}`,
        { title, content },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      commit("setPost", response.data);
    } catch (error) {
      commit("setError", "Failed to fetch post");
    } finally {
      commit("setUpdating", false);
    }
  },
};

const mutations = {
  setPost(state: any, post: IPost) {
    state.post = post;
  },

  setLoading(state: PostState, loading: boolean) {
    state.loading = loading;
  },
  setError(state: PostState, error: string | null) {
    state.error = error;
  },
  setUpdating(state: PostState, updating: boolean) {
    state.updating = updating;
  },
};

export const postModule: Module<PostState, any> = {
  namespaced: true,
  state,
  actions,
  getters,
  mutations,
};
