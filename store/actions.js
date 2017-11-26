import { firebaseAction } from 'vuexfire'
import firebaseApp from '~/firebaseapp';
export default {
    publishConcert: ({commit, state}, {concert, shortConcert}) => {
        let newConcertKey = state.concertsFullRef.push(concert).key;
        state.concertsListRef.child(newConcertKey).set(shortConcert);  
    },
    setReferences: ({state, commit}) => {
        commit('setConcertsListRef', firebaseApp.database().ref('/concertsList'));
        commit('setConcertsFullRef', firebaseApp.database().ref('/concertsFull'));
    },
    bindConcertsList: firebaseAction(({state, dispatch}) => {
        dispatch('bindFirebaseReference', {reference: state.concertsListRef, toBind: 'concertsList'});
    }),
    bindFirebaseReference: firebaseAction(({bindFirebaseRef}, {reference, toBind}) => {
        reference.once('value').then(concerts => concerts.val() && bindFirebaseRef(toBind, reference))
    }),
}