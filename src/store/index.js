import { createStore } from 'vuex';
import errors from './modules/errors';

export default createStore({
  modules: {
    errors
  },
  strict: process.env.NODE_ENV !== 'production'
})
