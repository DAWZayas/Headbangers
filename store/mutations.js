export default {
    addConcert: (state, concert) => state.concerts[concert.id] = concert,
    setConcerts: (state, concerts) => state.concerts = concerts,
    setConcertsRef: (state, ref) => state.concertsRef = ref
}