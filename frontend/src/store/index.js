import Vue from "vue";
import Vuex from "vuex";
import {
  login,
  wishlist,
  library,
  removeLib,
  addLib,
  addWish,
  removeWish,
} from "../api";

Vue.use(Vuex);

/**
 * Initial State
 *
 * user: {uid, token, username, email, library, wishlist}
 */
const state = {
  user: {
    username: null,
    wishlist: [],
  },
};

/**
 * Getters
 */
const getters = {
  getToken(state) {
    return state.user.token;
  },
};

/**
 * Mutations
 */
const mutations = {
  setUser(state, payload) {
    state.user = payload.user;
  },
  setWishlist(state, payload) {
    state.user.wishlist = payload.wishlist;
  },
  setLibrary(state, payload) {
    state.user.library = payload.library;
  },
};

/**
 * Actions
 */
const actions = {
  async setUser({ commit }, { email, password }) {
    const user = await login(email, password);
    commit("setUser", { user });
  },
  async setWishlist({ commit }, { id, token }) {
    const wish = await wishlist(id, token);
    commit("setWishlist", { wishlist: wish });
  },
  async setLibrary({ commit }, { id, token }) {
    const lib = await library(id, token);
    commit("setLibrary", { library: lib });
  },
  async remGameLibrary({ commit }, { id, token, gameId }) {
    const lib = await removeLib(id, token, gameId);
    commit("setLibrary", { library: lib });
  },
  async addGameLibrary({ commit }, { id, token, gameId }) {
    const lib = await addLib(id, token, gameId);
    commit("setLibrary", { library: lib });
  },
  async remGameWishlist({ commit }, { id, token, gameId }) {
    const wish = await removeWish(id, token, gameId);
    commit("setWishlist", { wishlist: wish });
  },
  async addGameWishlist({ commit }, { id, token, gameId }) {
    const wish = await addWish(id, token, gameId);
    commit("setWishlist", { wishlist: wish });
  },
};

const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
});

export default store;
