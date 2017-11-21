import { firebaseAction } from 'vuexfire'
import firebaseApp from '~/firebaseapp';
export default {
    addConcert: ({commit, state}, concert) => {
        state.concertsRef.push(concert);     
    },
    setConcertsRef: ({state, commit}) => {
        commit('setConcertsRef', firebaseApp.database().ref('/concerts'));
    },
    bindConcerts: firebaseAction(({state, dispatch}) => {
        dispatch('bindFirebaseReference', {reference: state.concertsRef, toBind: 'concerts'});
    }),
    bindFirebaseReference: firebaseAction(({bindFirebaseRef}, {reference, toBind}) => {
        bindFirebaseRef(toBind, reference);
    })
}