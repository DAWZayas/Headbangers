import firebaseApp from '~/firebaseapp'
export default {
    setInitialized: (state) => state.initialized = true,
    addConcert: (state, concert) => state.concerts[concert.id] = concert ,
    setUserProfile: (state, profile) => state.userProfile = profile,
    setUserData: (state, data) => state.userData = data ,
    setAuthenticated: (state, authenticated) => state.isAuthenticated = authenticated ,
    setConcerts: (state, concerts) => state.concerts = concerts ,
    setServerItemsLength: (state, length) => state.serverItemsLength = length ,
    setConcertsListRef: (state) => state.concertsListRef = firebaseApp.database().ref('/concertsList').orderByChild('country').equalTo(state.userCountry),
    setConcertsFullRef: (state) => state.concertsFullRef = firebaseApp.database().ref('/concertsFull'),
    setUsersRef: (state) => state.usersRef = firebaseApp.database().ref('/users'),
    setUserCountry: (state, country) => state.userCountry = country,
    setLoading: (state, loading) => state.loading = loading
}
