export default {
  namespaced: true,
  state: {
    error: null,
    list: []
  },
  mutations: {
    add: (state, error) => state.list.push(error),
    remove: state => state.list.shift()
  },
  getters: {
    current: state => state.list[0]
  }
};
