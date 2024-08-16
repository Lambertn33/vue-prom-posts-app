import { IUser } from "@/types";
import axios from "axios";
import { ActionTree, GetterTree, Module, MutationTree } from "vuex";

const serverUrl = import.meta.env.VITE_SERVER_URL;

interface AuthState {
  token: string | null;
  user: IUser | null;
  loading: boolean;
  error: string | null;
}

const state: AuthState = {
  error: null,
  loading: false,
  token: null,
  user: null,
};

const getters: GetterTree<AuthState, any> = {
  user: (state: AuthState) => state.user,
  isLoading: (state: AuthState) => state.loading,
  getError: (state: AuthState) => state.error,
  isAuthenticated: (state: AuthState) => !!state.token,
  token: (state: AuthState) => state.token,
};

const actions: ActionTree<AuthState, any> = {
  async register(
    { commit, dispatch }: any,
    { email, password }: { email: string; password: string }
  ) {
    commit("setLoading", true);
    commit("setError", null);
    try {
      const response = await axios.post(`${serverUrl}/signup`, {
        email,
        password,
      });

      if (response.data.user) {
        await dispatch("login", { email, password });
      }
    } catch (error: any) {
      console.log("error", error.response.data.message);
      commit("setError", error.response.data.message ?? "failed to register");
    } finally {
      commit("setLoading", false);
    }
  },

  async login(
    { commit }: any,
    { email, password }: { email: string; password: string }
  ) {
    commit("setLoading", true);
    commit("setError", null);
    try {
      const response = await axios.post(`${serverUrl}/signin`, {
        email,
        password,
      });
      commit("setUser", response.data.user);
      commit("setToken", response.data.token);

      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("token", response.data.token);
    } catch (error: any) {
      commit("setError", error.response.data.message ?? "Failed to login");
    } finally {
      commit("setLoading", false);
    }
  },

  logout({ commit }: any) {
    commit("setUser", null);
    commit("setToken", null);

    localStorage.removeItem("user");
    localStorage.removeItem("token");
  },
};

const mutations: MutationTree<AuthState> = {
  setUser(state: AuthState, user: any) {
    state.user = user;
  },
  setToken(state: AuthState, token: string | null) {
    state.token = token;
  },
  setLoading(state: AuthState, loading: boolean) {
    state.loading = loading;
  },
  setError(state: AuthState, error: string | null) {
    state.error = error;
  },
};

export const authModule: Module<AuthState, any> = {
  namespaced: true,
  state,
  actions,
  getters,
  mutations,
};
