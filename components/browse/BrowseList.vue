<template>
    <div>
        <event-card class="card" v-for="concert in concerts" v-if="concert.location" :key="concert.key" :id="concert.name" img="/img/placeholder.png" :title="concert.name" :date="concert.date" :time="concert.time" :location="`${concert.location.name} (${concert.location.city})`" :price="concert.price"></event-card>
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
    @import "assets/styles/colors.scss";
    @import "assets/styles/breakpoints.scss";
    
    @media (min-width: $break-lg) {
        .card {
            width: 30%;
            margin: 0 auto;
        }
    }

</style>
