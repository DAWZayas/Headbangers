export default {
    addConcert: (state, concert) => state.concerts[concert.id] = concert,
    setConcerts: (state, concerts) => state.concerts = concerts,
    setConcertsListRef: (state, ref) => state.concertsListRef = ref,
    setConcertsFullRef: (state, ref) => state.concertsFullRef = ref
}