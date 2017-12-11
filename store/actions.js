import { firebaseAction } from 'vuexfire'
import firebaseApp from '~/firebaseapp'
export default {
    publishConcert: ({commit, state}, {concert, shortConcert}) => {
        let concertKey = state.concertsFullRef.push(concert).key
        state.concertsListRef.child(concertKey).set(shortConcert)
    },
    setReferences: ({commit}) => {
        commit('setReferences')
    },
    bindAuth: ({commit, dispatch}) => {
        firebaseApp.auth().onAuthStateChanged(user => {
            if (user) {
                commit('setUserProfile', user)
                commit('setAuthenticated', true)
                dispatch('bindUserData', user.uid)
            } else {
                commit('setUserProfile', null)
                commit('setAuthenticated', false)
                dispatch('unbindUserData')
            }
        })
    },
    bindUserData: firebaseAction(({state, dispatch}, id) => {
        dispatch('bindFirebaseReference', {reference: state.usersRef.child(id), toBind: 'userData'})
    }),
    unbindUserData: firebaseAction(({state, dispatch}) => {
        dispatch('unbindFirebaseReference', {toUnbind: 'userData'})
    }),
    likeConcert: ({state}, concertID) => {
        state.usersRef.child(state.currentUser.uid).child('liked').push(concertID)
    },
    saveConcert: ({state}, concertID) => {
        state.usersRef.child(state.currentUser.uid).child('saved').push(concertID)
    },
    bindConcertsList: firebaseAction(({state, dispatch}) => {
        dispatch('bindFirebaseReference', {reference: state.concertsListRef, toBind: 'concertsList'})
    }),
    bindConcert: firebaseAction(({state, dispatch}, id) => {
        dispatch('bindFirebaseReference', {reference: state.concertsFullRef.child(id), toBind: 'concertDetails'})
    }),
    unbindConcertsList: firebaseAction(({dispatch}) => {
        dispatch('unbindFirebaseReference', {toUnbind: 'concertsList'})
    }),
    unbindConcert: firebaseAction(({dispatch}) => {
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
