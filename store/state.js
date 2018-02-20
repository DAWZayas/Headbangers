import firebaseApp from '~/firebaseapp'
export default {
    userProfile: null,
    userData: null,
    isAuthenticated: null,
    countryConcertsRef: null,
    allConcertsRef: null,
    fullConcertsRef: null,
    countryConcerts: null,
    allConcerts: null,
    concertDetails: null,
    usersRef: null,
    countries: require('country-data').countries,
    currencies: require('country-data').currencies,
    genreList: require('~/static/utils/genres.js').Genres,
    pageSize: 6,
    userCountry: null,
    location: null,
    loading: false
}