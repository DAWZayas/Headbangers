import { firebaseAction } from 'vuexfire'
import firebaseApp from '~/firebaseapp'
export default {
    publishConcert: ({commit, state}, {concert, shortConcert}) => {
        let concertKey = state.concertsFullRef.push(concert).key
        state.concertsListRef.child(concertKey).set(shortConcert)
    },
    bindAuth: ({commit}) => {
        firebaseApp.auth().onAuthStateChanged(user => {
            if (user) {
                commit('setCurrentUser', user)
                commit('setAuthenticated', true)
            } else {
                commit('setCurrentUser', null)
                commit('setAuthenticated', false)
            }
        })
    },
    bindConcertsList: firebaseAction(({state, dispatch}) => {
        dispatch('bindFirebaseReference', {reference: state.concertsListRef, toBind: 'concertsList'})
    }),
    bindConcert: firebaseAction(({state, dispatch}, id) => {
        dispatch('bindFirebaseReference', {reference: state.concertsFullRef.child(id), toBind: 'concertDetails'})
    }),
    unbindConcertsList: firebaseAction(({state, dispatch}) => {
        dispatch('unbindFirebaseReference', {toUnbind: 'concertsList'})
    }),
    unbindConcert: firebaseAction(({state, dispatch}) => {
        dispatch('unbindFirebaseReference', {toUnbind: 'concertDetails'})
    }),
    bindFirebaseReference: firebaseAction(({bindFirebaseRef}, {reference, toBind}) => {
        reference.once('value').then(concerts => concerts.val() && bindFirebaseRef(toBind, reference))
    }),
    unbindFirebaseReference: firebaseAction(({unbindFirebaseRef}, {toUnbind}) => {
        try {
            unbindFirebaseRef(toUnbind)
        } catch (error) {
        }
    })
}
