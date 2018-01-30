import firebaseApp from '~/firebaseapp'
export default {
    userProfile: null,
    userData: null,
    isAuthenticated: null,
    concertsList: null,
    concertDetails: null,
    concertsListRef: null,
    concertsFullRef: null,
    usersRef: null,
    countryList: require('~/static/utils/countries.js').Countries,
    genreList: require('~/static/utils/genres.js').Genres,
    loading: false,
    pageSize: 6
}
