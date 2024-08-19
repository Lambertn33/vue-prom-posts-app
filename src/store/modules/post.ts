import axios from "axios";
import { IPost } from "@/types";
import { ActionTree, GetterTree, Module, MutationTree } from "vuex";

const serverUrl = import.meta.env.VITE_SERVER_URL;

interface PostState {
  post: IPost | null;
  loading: boolean;
  error: string | null;
  updating: boolean;
  commenting: boolean;
}

const state = {
  post: null,
  loading: false,
  error: null as string | null,
  updating: false,
  commenting: false,
};

const getters: GetterTree<PostState, any> = {
  getPost: (state: PostState) => state.post,
  isLoading: (state: PostState) => state.loading,
  getError: (state: PostState) => state.error,
  isUpdating: (state: PostState) => state.updating,
  isAddingComment: (state: PostState) => state.commenting,
};

const actions: ActionTree<PostState, any> = {
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

  async addPostComment(
    { commit }: any,
    { postId, comment }: { postId: number; userId: number; comment: string }
  ) {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${serverUrl}/posts/${postId}/comment`,
        { comment },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      commit("setError", "Failed to make a comment");
    } finally {
      commit("setCommenting", false);
    }
  },
};

const mutations: MutationTree<PostState> = {
  setPost(state: PostState, post: IPost) {
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

  setCommenting(state: PostState, commenting: boolean) {
    state.commenting = commenting;
  },
};

export const postModule: Module<PostState, any> = {
  namespaced: true,
  state,
  actions,
  getters,
  mutations,
};
