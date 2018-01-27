export default{
    getConcertsList: state => state.concertsList,
    getUserProfile: state => state.userProfile,
    getUserLiked: state => state.userData && state.userData.liked,
    getUserSaved: state => state.userData && state.userData.saved,
    getUserPhoto: state => state.userProfile ? state.userProfile.photoURL : null,
    isAuthenticated: state => state.isAuthenticated,
    getCountryList: state => state.countryList,
    getGenreList: state => state.genreList,
    getConcertDetails: state => state.concertDetails,
    getClientPageSize: state => state.clientPageSize
}
