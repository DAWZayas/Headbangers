import firebaseApp from '~/firebaseapp'
export default {
    addConcert: (state, concert) => { state.concerts[concert.id] = concert },
    setUserProfile: (state, profile) => { state.userProfile = profile;},
    setUserData: (state, data) => { state.userData = data },
    setAuthenticated: (state, authenticated) => { state.isAuthenticated = authenticated },
    setConcerts: (state, concerts) => { state.concerts = concerts },
    setReferences: (state) => {
        state.concertsListRef = firebaseApp.database().ref('/concertsList')
        state.concertsFullRef = firebaseApp.database().ref('/concertsFull')
        state.usersRef = firebaseApp.database().ref('/users')
    },
    setConcertsListRef: (state, ref) => { state.concertsListRef = ref },
    setConcertsFullRef: (state, ref) => { state.concertsFullRef = ref },
    setLoading: (state, loading) => { console.log(loading);state.loading = loading }
}
