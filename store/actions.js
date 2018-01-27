import { firebaseAction } from 'vuexfire'
import firebaseApp from '~/firebaseapp'
export default {
    publishConcert: ({commit, state}, {concert, shortConcert}) => {
        let concertKey = state.concertsFullRef.push(concert).key
        state.concertsListRef.child(concertKey).set(shortConcert)
    },
    setAllReferences: ({commit}) => {
        commit('setConcertsListRef')
        commit('setConcertsFullRef')
        commit('setUsersRef')
    },
    bindAuth: ({commit, dispatch, state}) => {
        
        firebaseApp.auth().onAuthStateChanged(user => {
            if (user) {
                window.localStorage['authenticated'] = "true";
                commit('setUserProfile', user)
                commit('setAuthenticated', true)
                dispatch('bindUserData', user.uid)
                state.usersRef.child(user.uid).child('exist').set(true)
            } else {
                window.localStorage['authenticated'] = "false";
                commit('setUserProfile', null)
                commit('setUserData', null)
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
    signIn: ({state}, {email, password}) => {
        return firebaseApp.auth().signInWithEmailAndPassword(email, password)
    },
    signOut: ({state}) => {
        return firebaseApp.auth().signOut()
    },
    updatePicture: ({state}, {picture, path}) => {
        let photoRef = firebaseApp.storage().ref().child(path)
        return photoRef.put(picture).then((snapshot) => {
            return firebaseApp.auth().currentUser.updateProfile({
                photoURL: snapshot.downloadURL
            })
        })
    },
    updateName: ({state}, displayName) => {
        return firebaseApp.auth().currentUser.updateProfile({displayName})
    },
    updateEmail: ({state}, {newEmail, currentEmail, currentPassword}) => {
        return firebaseApp.auth().signInWithEmailAndPassword(currentEmail, currentPassword).then((user) => {
            return firebaseApp.auth().currentUser.updateEmail(newEmail)
        })
    },
    updatePassword: ({state}, {currentEmail, currentPassword, newPassword}) => {
        return firebaseApp.auth().signInWithEmailAndPassword(currentEmail, currentPassword).then((user) => {
            return firebaseApp.auth().currentUser.updatePassword(newPassword)
        })
    },
    sendPasswordEmail: ({state}, email) => {
        return firebaseApp.auth().sendPasswordResetEmail(email)
    },
    likeConcert: ({state}, concertID) => {
        state.concertsFullRef.child(concertID).child('likes').transaction((likes) => likes + 1)
        state.concertsListRef.child(concertID).child('likes').transaction((likes) => likes + 1)
        state.usersRef.child(state.userProfile.uid).child('liked').child(concertID).set(true)
    },
    saveConcert: ({state}, concertID) => {
        state.usersRef.child(state.userProfile.uid).child('saved').child(concertID).set(true)
    },
    unlikeConcert: ({state}, concertID) => {
        state.concertsFullRef.child(concertID).child('likes').transaction((likes) => likes - 1)
        state.concertsListRef.child(concertID).child('likes').transaction((likes) => likes - 1)
        state.usersRef.child(state.userProfile.uid).child('liked').child(concertID).set(null)
    },
    unsaveConcert: ({state}, concertID) => {
        state.usersRef.child(state.userProfile.uid).child('saved').child(concertID).set(null)
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
