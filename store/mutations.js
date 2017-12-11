import firebaseApp from '~/firebaseapp'
export default {
    addConcert: (state, concert) => { state.concerts[concert.id] = concert },
    setCurrentUser: (state, user) => { state.currentUser = user },
    setAuthenticated: (state, authenticated) => { state.isAuthenticated = authenticated },
    setConcerts: (state, concerts) => { state.concerts = concerts },
    setReferences: (state) => {
      state.concertsListRef = firebaseApp.database().ref('/concertsList')
      state.concertsFullRef = firebaseApp.database().ref('/concertsFull')
    },
    setConcertsListRef: (state, ref) => { state.concertsListRef = ref },
    setConcertsFullRef: (state, ref) => { state.concertsFullRef = ref }
}
