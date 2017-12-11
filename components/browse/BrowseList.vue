<template>
    <div class="cards padding">
        <event-card v-for="(value, key) in filteredList" v-if="key !== '.key'" v-bind:key="key" :concert="value" :id="key"></event-card>
    
    {{concerts}}
    </div>
</template>

<script>
    import EventCard from '~/components/browse/EventCard'
    export default {
        props: ['concerts', 'filters'],
        computed: {
            filteredList: function () {
                return this.concerts
            }
           /* filteredList: function () {
                var concertsDrained = [];
                for (var i = 0; i < this.concerts.length; i++){
                    if(filters.price[0] < this.concerts.price && this.concerts.price < filters.price[1]){
                        concertsDrained.push(this.concerts[i]);
                    }
                }
                return concertsDrained;
            } */
        },
        components: {
            EventCard
        },
    }
</script>

<style lang="scss">
    @import "assets/styles/breakpoints.scss";
    .cards {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            grid-auto-rows: 1fr;
            grid-gap: 1em;
        }
</style>
