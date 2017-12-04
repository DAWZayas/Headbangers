export default{
    getConcertsList: state => state.concertsList,
    getCurrentUser: state => state.currentUser,
    getUserPhoto: state => state.currentUser ? state.currentUser.photoURL : null,
    isAuthenticated: state => state.isAuthenticated,
    getCountryList: state => state.countryList,
    getGenreList: state => state.genreList,
    getConcertDetails: state => state.concertDetails
}