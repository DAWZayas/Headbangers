<template>
    <div>
        <concerts-list :concerts="results" empty-message="No results :("></concerts-list>
    </div>
</template>
<script>
import ConcertsList from '~/components/browse/ConcertsList'
import {mapActions, mapGetters, mapMutations} from 'vuex'
export default {
    components: {ConcertsList},
    computed: {
        ...mapGetters({concerts: 'getCountryConcerts'}),
        results () {
            return this.concerts && this.filterResults(this.concerts, this.$route.params.query)
        }
    },
    methods: {
        ...mapActions(['getUserCountry', 'bindCountryConcerts', 'unbindCountryConcerts']),
        ...mapMutations(['setCountryConcertsRef']),
        filterResults (concerts, query){
            let queryClean = query.toLowerCase().replace("+"," ");
            let concertListQuery = concerts.filter(function (concert) {
                var detail = concert.title+' '+concert.city;
                return detail.toLowerCase().indexOf(queryClean) > -1
            })
            return concertListQuery
        }        
    },
    mounted () {
        this.getUserCountry().then(country => {
            this.setCountryConcertsRef(country)
            this.bindCountryConcerts()
        })
    },
    beforeDestroy () {
        this.unbindCountryConcerts()
    }
}
</script>
