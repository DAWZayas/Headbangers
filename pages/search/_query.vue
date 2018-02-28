<template>
    <concerts-list :concerts="results"></concerts-list>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
    computed: {
        ...mapGetters({concerts: 'getCountryConcerts'}),        
        results () {
            return filterResults(this.concerts, this.$router.params.query)
        }
    },
    methods: {
        filterResults (concerts, query){
            queryClean = query.toLowerCase().replace("+"," ");
            concertListQuery = concerts.filter(function (concert) {
                var detail = concert.info.title+' '+concert.description+' '+concert.location.city;
                return detail.toLowerCase().indexOf(querySpace) > -1;
            })
            return concertListQuery;
        }        
    }
}
</script>
