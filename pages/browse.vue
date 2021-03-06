<template>
    <div>
        <concerts-list class="concerts-list" ref="list" :concerts="filteredConcerts" empty-message="No results"></concerts-list>
        <filter-slideout class="slide-filters" ref="slideout" :data="filters" @setFilters="setFilters" @hide="toggleFilters(false)"></filter-slideout>
        <filters class="big-filters" ref="filters" :data="filters" @setFilters="setFilters" ></filters>
    </div>
</template>

<script>
    import ConcertsList from '~/components/browse/ConcertsList'
    import Filters from '~/components/browse/Filters'
    import FilterSlideout from '~/components/browse/FilterSlideout'
    import {IconText, IconButton} from '~/components/common'
    import {mapActions, mapGetters, mapMutations} from 'vuex'
    export default {
        data () {
            return {
                filters: [((concerts) => concerts.sort((a, b) => a.date - b.date))],
                showFab: true,
                fabPosition: 0,
                windowWidth: 0,
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
            userCountry () {
                this.bindCountryConcerts()
            }
        },

        components: {
            ConcertsList,
            IconText,
            IconButton,
            Filters,
            FilterSlideout
        },
        
        methods: {
            ...mapActions(['bindCountryConcerts', 'unbindCountryConcerts', 'askUserLocation', 'getUserCountry']),
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
            }
        },

        mounted () {
            this.getUserCountry().then(country => {
                this.setCountryConcertsRef(country)
                this.bindCountryConcerts()
            })
            setTimeout( () => {
                    if(!this.userLocation) {
                        this.$notify.info({
                            title: 'Info',
                            message: 'We need your location so you can filter the gigs by distance.',
                            offset: 50
                        });
                        this.askUserLocation()
                    }
                }, 3500);                
        },

        beforeDestroy () {
            this.unbindCountryConcerts()
        }
    }
</script>

<style lang="scss">
    @import "assets/styles/colors.scss";
    @import "assets/styles/breakpoints.scss";
    
    .big-filters{
        display: none;
    }
    .slide-filters {
        display: initial;
    }
@media (min-width: $break-lg-xl) {
    .big-filters {
        display: initial;
    }
    .slide-filters {
        display: none;
    }
}
    
</style>
