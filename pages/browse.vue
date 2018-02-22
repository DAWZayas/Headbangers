<template>
    <div>
        <div>
            <concerts-list class="concerts-list" ref="list" :concerts="filteredConcerts"></concerts-list>
            <filters ref="filters" class="filters" :data="filters" @setFilters="setFilters" @hide="toggleFilters(false)"></filters>
            <button v-show="showFab" id="fab" @click="toggleFilters(true)"><img src="~/static/img/icons/basic_mixer2.svg"></button>
        </div>
    </div>
</template>

<script>
    import ConcertsList from '~/components/browse/ConcertsList'
    import Filters from '~/components/browse/Filters'
    import {IconText, IconButton} from '~/components/common'
    import {mapActions, mapGetters, mapMutations} from 'vuex'
    export default {
        data () {
            return {
                filters: [((concerts) => concerts.sort((a, b) => a.date - b.date))],
                showFab: true,
                fabPosition: 0,
                windowWidth: 0,
                selectedMode: 'list',
                filteredConcerts: []
            }
        },

        computed: {
            ...mapGetters({concerts: 'getCountryConcerts', userCountry: 'getUserCountry', userLocation: 'getUserLocation'}),
        },

        watch: {
            filters () {
                this.applyFilters()
            },
            concerts () {
                this.applyFilters()
            },
        },

        components: {
            ConcertsList,
            IconText,
            IconButton,
            Filters
        },
        
        methods: {
            ...mapActions(['bindCountryConcerts', 'unbindCountryConcerts', 'getUserCountry', 'askUserLocation']),
            ...mapMutations(['setCountryConcertsRef']),
            applyFilters () {
                this.filteredConcerts = this.concerts && this.filters.reduce((acc, func) => func(acc), this.concerts.map(this.getConcertDistance))
            },

            setFilters (filters) {
                this.filters = filters;           
            },

            getConcertDistance(concert){
                return {...concert, distance: geolocator.calcDistance({
                        from: {
                            latitude: this.userLocation && this.userLocation.coords.latitude,
                            longitude: this.userLocation && this.userLocation.coords.longitude
                        },
                        to: {
                            latitude: concert.coords.lat,
                            longitude: concert.coords.lng
                        },
                        formula: geolocator.DistanceFormula.HAVERSINE,
                        unitSystem: geolocator.UnitSystem.METRIC
                    })}
            },

            toggleFilters (show) {
                var right;
                    if (this.windowWidth < 768) {
                        right = show ? 0 : "-100%"
                        show ? window.scroll({top:0, left: 0, behavior: 'smooth'}) : false;
                        document.body.style.overflowY = show ? "hidden" : "scroll"
                    }else if (this.windowWidth < 1050) {
                        right = show ? 0 : "-45%"
                         show ? window.scroll({top:0, left: 0, behavior: 'smooth'}) : false;
                    }else if (this.windowWidth < 1500) {
                        right = show ?  0 : "-35%"
                         show ? window.scroll({top:0, left: 0, behavior: 'smooth'}) : false;
                    }
                document.querySelector(".filters").style.right = right;
            }
        },

        mounted () {
                this.getUserCountry().then((country) => {
                    this.setCountryConcertsRef()
                    this.bindCountryConcerts()
                })
                setTimeout( () => {
                        if(!this.usrLocation) {
                            this.$notify.info({
                                title: 'Info',
                                message: 'Para que puedas filtrar conciertos por cercanía, necesitamos conocer tu ubicacion.',
                                duration: 2500,
                                offset: 60
                            });
                            this.askUserLocation().then(console.log)
                        }
                    }, 2500);
                
                this.windowWidth = window.innerWidth
                window.addEventListener('resize', (e) => {
                    this.windowWidth = window.innerWidth
                })

                const fab = document.querySelector("#fab");
                const footer = document.querySelector(".footer");

                window.addEventListener('scroll', (i) => {
                    var fabDist = fab.getBoundingClientRect().top
                    var footerDist = footer.getBoundingClientRect().top
                        if (window.innerHeight < (footerDist + 15)) {
                            fab.style.position = 'fixed'
                            fab.style.bottom = '25px'
                        }else if (fabDist + fab.offsetHeight >= footerDist - 15) {
                            fab.style.position = 'absolute'
                            fab.style.bottom = (document.querySelector(".footer").offsetHeight + 13) + 'px'
                        }
                })
                
        },

        beforeDestroy () {
            this.unbindCountryConcerts()
        }
    }
</script>

<style lang="scss">
    @import "assets/styles/colors.scss";
    @import "assets/styles/breakpoints.scss";
    
    body {
        overflow-x: hidden;
    }
    #fab {
        position: fixed;
        right: 25px;
        bottom: 25px;
        z-index: 1;
        background: $accentColor;
        padding: 18px 18px 15px 18px;
        border: none;
        border-radius: 100%;
        box-shadow: 0px 2px 2px rgba(0,0,0,.5);
            img {
                width: 20px;
            }
    }
    #fab:hover {
        cursor: pointer;
        background: $accentColorDark;
    }
</style>
