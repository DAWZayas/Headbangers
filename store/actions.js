import uuidv1 from 'uuid/v1';
import { firebaseAction } from 'vuexfire'

export default {
    addConcert: ({commit, state}, concert) => {
        if(!concert) return;
        if(state.concertsRef === null) dispatch('setConcertsRef')
        state.concertsRef.push(concert);     
    },
    setConcertRef: ({state, commit}) => {
        commit('setConcertRef', firebaseApp.database().ref('/concerts'));
    },
    bindConcerts: ({state, commit, dispatch}) => {
        dispatch('bindFirebaseReference', {reference: state.concertsRef, toBind: 'concerts'}).then(() => commit('setConcertsRef', reference));
    },
    bindFirebaseReference: ({state, commit}, {reference, toBind}) => {
        reference.on('value', (snapshot) => {
            commit('setConcerts', snapshot.val());
        });
    }
}