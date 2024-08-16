import axios from "axios";
import { IPostInputs, IPostList } from "@/types";
import { Module } from "vuex";

const serverUrl = import.meta.env.VITE_SERVER_URL;

interface PostsState {
  posts: IPostList[];
  searchedPosts: IPostList[];
  loading: boolean;
  searching: boolean;
  error: string | null;
}

const state: PostsState = {
  posts: [],
  searchedPosts: [],
  loading: false,
  searching: false,
  error: null as string | null,
};

const getters = {
  allPosts: (state: PostsState) => state.posts,
  isLoading: (state: PostsState) => state.loading,
  getError: (state: PostsState) => state.error,
  isSearching: (state: PostsState) => state.searching,
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

  async createPost({ commit }: any, postInputs: IPostInputs) {
    commit("setLoading", true);
    commit("setError", null);

    try {
      const token = localStorage.getItem("token");
      await axios.post(`${serverUrl}/posts`, postInputs, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.log(error);
      commit("setError", "Failed to create posts");
    } finally {
      commit("setLoading", false);
    }
  },

  async searchPosts({ commit }: any, searchKey: string) {
    commit("setSearching", true);
    commit("setError", null);

    try {
      const response = await axios.post(`${serverUrl}/posts/search`, {
        searchKey,
      });
      commit("setSearchedPosts", response.data);
    } catch (error) {
      commit("setError", "Failed to fetch posts");
    } finally {
      commit("setSearching", false);
    }
  },
};

const mutations = {
  setPosts(state: PostsState, posts: IPostList[]) {
    state.posts = posts;
  },

  setSearchedPosts(state: PostsState, searchedPosts: IPostList[]) {
    state.searchedPosts = searchedPosts;
  },

  setLoading(state: PostsState, loading: boolean) {
    state.loading = loading;
  },

  setSearching(state: PostsState, searching: boolean) {
    state.searching = searching;
  },

  setError(state: PostsState, error: string | null) {
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
