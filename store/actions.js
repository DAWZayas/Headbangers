import { firebaseAction } from 'vuexfire'
import firebaseApp from '~/firebaseapp'
import { WSAEHOSTUNREACH } from 'constants';
export default {
    publishConcert: ({state, dispatch, commit}, {concert, shortConcert}) => {
        commit('setLoading', true)
        return dispatch('uploadFile', {file: concert.info.poster.raw, path: '/posters/'+concert.author+concert.info.poster.name}).then((snapshot) => {
            concert.info.poster = snapshot.downloadURL
            shortConcert.poster = snapshot.downloadURL
            let concertKey = state.concertsFullRef.push(concert).key
            state.allConcertsRef.child(concertKey).set(shortConcert)
            state.usersRef.child(state.userProfile.uid).child('published').child(concertKey).set(true)
            commit('setLoading', false)
            return Promise.resolve(concertKey)
        })
    },
    removeConcert: ({state, dispatch, commit}, concertKey) => {
        return Promise.all([
            state.concertsFullRef.child(concertKey).remove(),
            state.allConcertsRef.child(concertKey).remove(),
            state.usersRef.child(state.userProfile.uid).child('published').child(concertKey).remove(),
            state.usersRef.child(state.userProfile.uid).child('liked').child(concertKey).remove(),
            state.usersRef.child(state.userProfile.uid).child('saved').child(concertKey).remove(),
            state.usersRef.child(state.userProfile.uid).child('assisting').child(concertKey).remove()
        ])
    },
    setAllReferences: ({commit}) => {
        commit('setAllConcertsRef')
        commit('setCountryConcertsRef')
        commit('setConcertsFullRef')
        commit('setUsersRef')
    },
    getUserCountry: ({commit, state}) => {
        return new Promise((resolve, reject) => {
            if(state.userCountry){
                resolve(state.userCountry)
            }else{
                geolocator.locateByIP({addressLookup: true}, (err, location) => {
                    if(err){
                        reject(err)
                    }else{
                        state.userCountry = location.address.countryCode
                        resolve(location.address.countryCode)
                    }
                })
            }
        }) 
    },
    askUserLocation: ({commit, state}) => {
        return new Promise((resolve, reject) =>{ 
            if(state.location){
                resolve(state.location)
            }
            else{
                geolocator.locate({fallbackToIP: true, addressLookup: true}, (err, location) => {
                    if(err){
                        reject(err)
                    }else{
                        commit('setUserLocation', {...location.address, coords: location.coords})
                        resolve({...location.address, coords: location.coords})
                    }
                })
            }
        })
    },
    bindAuth: ({commit, dispatch, state}) => {
        return new Promise(resolve => {
            firebaseApp.auth().onAuthStateChanged(user => {
                if (user) {
                    commit('setUserProfile', user)
                    commit('setAuthenticated', true)
                    dispatch('bindUserData', user.uid)
                    state.usersRef.child(user.uid).child('exist').set(true)
                    resolve(true)
                } else {
                    commit('setUserProfile', null)
                    commit('setUserData', null)
                    commit('setAuthenticated', false)
                    dispatch('unbindUserData')
                    resolve(false)
                }
            })
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
    uploadFile: ({}, {file, path}) => {
        return firebaseApp.storage().ref().child(path).put(file)
    },
    updatePicture: ({dispatch}, {file, path}) => {
        return dispatch('uploadFile', {file, path}).then((snapshot) => {
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
        state.allConcertsRef.child(concertID).child('likes').transaction((likes) => likes + 1)
        state.usersRef.child(state.userProfile.uid).child('liked').child(concertID).set(true)
    },
    saveConcert: ({state}, concertID) => {
        state.usersRef.child(state.userProfile.uid).child('saved').child(concertID).set(true)
    },
    unlikeConcert: ({state}, concertID) => {
        state.concertsFullRef.child(concertID).child('likes').transaction((likes) => likes - 1)
        state.allConcertsRef.child(concertID).child('likes').transaction((likes) => likes - 1)
        state.usersRef.child(state.userProfile.uid).child('liked').child(concertID).set(null)
    },
    unsaveConcert: ({state}, concertID) => {
        state.usersRef.child(state.userProfile.uid).child('saved').child(concertID).set(null)
    },
    bindAllConcerts: firebaseAction(({state, dispatch}) => {
        dispatch('bindFirebaseReference', {reference: state.allConcertsRef, toBind: 'allConcerts'})
    }),
    bindCountryConcerts: firebaseAction(({state, dispatch}) => {
        dispatch('bindFirebaseReference', {reference: state.countryConcertsRef, toBind: 'countryConcerts'})
    }),
    bindConcert: firebaseAction(({state, dispatch}, id) => {
        dispatch('bindFirebaseReference', {reference: state.concertsFullRef.child(id), toBind: 'concertDetails'})
    }),
    unbindAllConcerts: firebaseAction(({dispatch}) => {
        dispatch('unbindFirebaseReference', {toUnbind: 'allConcerts'})
    }),
    unbindCountryConcerts: firebaseAction(({dispatch}) => {
        dispatch('unbindFirebaseReference', {toUnbind: 'countryConcerts'})
    }),
    unbindConcert: firebaseAction(({dispatch}) => {
        dispatch('unbindFirebaseReference', {toUnbind: 'concertDetails'})
    }),
    bindFirebaseReference: firebaseAction(({bindFirebaseRef, commit}, {reference, toBind}) => {
        commit('setLoading', true)
        reference.once('value').then(concerts => {concerts.val() && bindFirebaseRef(toBind, reference, {readyCallback: (() => commit('setLoading', false))})})
    }),
    unbindFirebaseReference: firebaseAction(({unbindFirebaseRef}, {toUnbind}) => {
        try {
            unbindFirebaseRef(toUnbind)
        } catch (error) {
        }
    }),
    setLoading ({commit}, loading) {
        commit('setLoading', loading);
    }
}
