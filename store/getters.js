export default{
    isInitialized: state => state.initialized,
    getConcertsList: state => state.concertsList && objectToArray(state.concertsList).filter(concert => concert.key !== '.key'),
    getUserProfile: state => state.userProfile,
    getUserLiked: state => state.userData && state.userData.liked && objectToArray(state.userData.liked).map(({key}) => key),
    getUserSaved: state => state.userData && state.userData.saved && objectToArray(state.userData.saved).map(({key}) => key),
    getUserAssisting: state => state.userData && state.userData.assisting && objectToArray(state.userData.assisting).map(({key}) => key),
    getUserPublished: state => state.userData && state.userData.published && objectToArray(state.userData.published).map(({key}) => key),
    getUserPhoto: state => state.userProfile ? state.userProfile.photoURL : null,
    isAuthenticated: state => state.isAuthenticated,
    getCountries: state => state.countries,
    getCurrencies: state => state.currencies,
    getGenreList: state => state.genreList,
    getConcertDetails: state => state.concertDetails,
    getPageSize: state => state.pageSize,
    getUserCountry: state => state.userCountry,
    getLoading: state => state.loading
}
