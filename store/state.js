import firebaseApp from '~/firebaseapp'
export default {
    currentUser: null,
    isAuthenticated: null,
    concertsList: null,
    concertsListRef: firebaseApp.database().ref('/concertsList'),
    concertsFullRef: firebaseApp.database().ref('/concertsFull'),
    concertDetails: null,
    countryList: require('~/static/utils/countries.js').Countries,
    genreList: require('~/static/utils/genres.js').Genres
}
