import firebaseApp from '~/firebaseapp'
export default {
    addConcert: (state, concert) => { state.concerts[concert.id] = concert },
    setUserProfile: (state, profile) => { state.userProfile = profile;},
    setUserData: (state, data) => { state.userData = data },
    setAuthenticated: (state, authenticated) => { state.isAuthenticated = authenticated },
    setConcerts: (state, concerts) => { state.concerts = concerts },
    setServerItemsLength: (state, length) =>{ state.serverItemsLength = length },
    setConcertsListRef: (state) => { 
        state.concertsListRef = firebaseApp.database().ref('/concertsList')
        //.orderByChild(state.orderBy).limitToFirst(state.pageSize).startAt(state.lastPageValue)
    },
    setConcertsFullRef: (state) => { 
        state.concertsFullRef = firebaseApp.database().ref('/concertsFull')
    },
    setConcertsListRef: (state, ref) => { state.concertsListRef = ref },
    setConcertsFullRef: (state, ref) => { state.concertsFullRef = ref },
    setLoading: (state, loading) => { console.log(loading);state.loading = loading },
    setUsersRef: (state) => {
        state.usersRef = firebaseApp.database().ref('/users')
    }
}
