import Vue from 'vue';
import Vuex from 'vuex';
import state from './state';
import getters from './getters';
import actions from './actions';
import mutations from './mutations';
import { firebaseMutations } from 'vuexfire'
Vue.use(Vuex);

export default () => new Vuex.Store({
    state,
    getters,
    actions,
    mutations: {
        ...mutations,
        ...firebaseMutations
    }
})
