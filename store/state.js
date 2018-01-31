import firebaseApp from '~/firebaseapp'
export default {
    initialized: false,
    userProfile: null,
    userData: null,
    isAuthenticated: null,
    concertsList: null,
    concertDetails: null,
    concertsListRef: null,
    concertsFullRef: null,
    usersRef: null,
    countryList: require('country-data').countries.all,
    genreList: require('~/static/utils/genres.js').Genres,
    pageSize: 6,
    userCountry: null,
    loading: false
}