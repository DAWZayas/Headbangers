<template>
    <div class="cards padding">
        <nuxt-link v-for="(value, key) in concerts" v-bind:key="key" :to="'/concert/'+key" v-if="key !== '.key'">
            <event-card  :concert="value"></event-card>
        </nuxt-link>
    </div>
</template>

<script>
    import EventCard from '~/components/browse/EventCard';

    export default {
        components: {
            EventCard
        },
        props: ['concerts']
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
