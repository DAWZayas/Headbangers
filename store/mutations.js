export default {
    addConcert: (state, concert) => state.concerts[concert.id] = concert,
    setCurrentUser: (state, user) => state.currentUser = user,
    setAuthenticated: (state, authenticated) => state.isAuthenticated = authenticated,
    setConcerts: (state, concerts) => state.concerts = concerts,
    setConcertsListRef: (state, ref) => state.concertsListRef = ref,
    setConcertsFullRef: (state, ref) => state.concertsFullRef = ref
}