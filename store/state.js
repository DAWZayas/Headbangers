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
    clientPageSize: 6,
    serverPageSize: 50,
    serverCurrentPage: 1,
    orderBy: 'date',
    lastPageValue: 0
}
