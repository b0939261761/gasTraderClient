import { getTokenData } from '@/utils/token';

// ------------------------------------

export default {
  namespaced: true,
  state: {
    refreshToken: null,
    accessToken: null,
    userId: null
  },
  mutations: {
    setRefreshToken: (state, token) => state.refreshToken = token,
    setAccessToken: (state, token) => state.accessToken = token,
    setUserId: (state, id) => state.userId = id
  },
  actions: {
    init: ({ dispatch }) => {
      const refreshToken = localStorage.getItem('refreshToken');
      const accessToken = localStorage.getItem('accessToken');
      dispatch('setTokens', { refreshToken, accessToken });
    },
    setRefreshToken: ({ commit }, refreshToken) => {
      const { token, userId } = getTokenData(refreshToken);
      commit('setRefreshToken', token);
      commit('setUserId', userId);
      localStorage.setItem('refreshToken', token);
    },
    setAccessToken: ({ commit }, accessToken) => {
      const { token } = getTokenData(accessToken);
      commit('setAccessToken', token);
      localStorage.setItem('accessToken', token);
    },
    setTokens: ({ dispatch }, { refreshToken, accessToken }) => {
      dispatch('setRefreshToken', refreshToken);
      dispatch('setAccessToken', accessToken);
    },
    removeAccessToken: ({ commit }) => {
      commit('setAccessToken', null);
      localStorage.removeItem('accessToken');
    },
    removeRefreshToken: ({ commit }) => {
      commit('setRefreshToken', null);

    },
    removeTokens: ({ dispatch }) => {
      dispatch('removeRefreshToken');
      dispatch('removeAccessToken');
    }
  }
};
