<template>
    <div class="cards padding">
        <event-card v-for="concert in concerts" :key="concert.key" :concert="concert"></event-card>
    </div>
</template>

<script>
    import EventCard from '~/components/browse/EventCard'
    export default {
        components: {
            EventCard
        },
        props: ['concerts'],
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
