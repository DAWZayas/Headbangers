<template>
    <div>
        <el-tabs type="border-card">
            <el-tab-pane>
                <span slot="label"><icon-text icon="lnr-list" text="List"></icon-text></span>
            </el-tab-pane>
            <el-tab-pane label="Config">
                <span slot="label"><icon-text icon="lnr-map" text="Map"></icon-text></span>
            </el-tab-pane>
            <el-tab-pane label="Role">
                <span slot="label"><icon-text icon="lnr-calendar-full" text="Calendar"></icon-text></span>
            </el-tab-pane>
        </el-tabs>
    
        <div>
            <event-card v-for="event in events" :key="event.name" :id="event.name" img="/img/placeholder.png" :title="event.name" :date="event.date" :time="event.time" :location="`${event.location.name} (${event.location.city})`" :price="event.price"></event-card>
        </div>
    </div>
</template>

<script>
    import IconText from '~/components/common/IconText';
    import EventCard from '~/components/browse/EventCard';
    export default {
        data() {
            return {
                selectedMode: 'list'
            }
        },
        computed: {
            events() {
                return this.$store.getters.getEvents;
            }
        },
        components: {
            IconText,
            EventCard
        }
    }
</script>

<style lang="scss">
    
</style>
