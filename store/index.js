import Vuex from 'vuex';
import state from './state';
import getters from './getters';
import actions from './actions';

export default () => new Vuex.Store({
  state,
  getters,
  actions
})
