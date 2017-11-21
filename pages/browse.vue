<template>
    <!--
    <el-radio-group v-model="selectedMode" size="mini">
        <el-radio-button label="list">
            <icon-text icon="lnr-list" text="List"></icon-text>
        </el-radio-button>
        <el-radio-button label="map">
            <icon-text icon="lnr-map" text="Map"></icon-text>
        </el-radio-button>
        <el-radio-button label="calendar">
            <icon-text icon="lnr-calendar-full" text="Calendar"></icon-text>
        </el-radio-button>
    </el-radio-group>
    -->
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
    
        <div class="padding">
            <event-card v-for="event in events" :key="event.name" :id="event.name" img="/img/placeholder.png" :title="event.name" :date="event.date" :time="event.time" :location="`${event.location.name} (${event.location.city})`" :price="event.price"></event-card>
        </div>
    </div>
</template>

<script>
    import IconText from '~/components/common/IconText';
    import EventCard from '~/components/browse/EventCard';
    import { mapActions } from 'vuex';
    export default {
        data() {
            return {
                selectedMode: 'list'
            }
        },
        computed: {
            events() { return this.$store.getters.getConcerts; }
        },
        components: {
            IconText,
            EventCard
        },
        methods:{
            ...mapActions(['bindConcerts'])
        },
        created(){
            this.bindConcerts();
        }
    }
</script>

<style lang="scss">
    
</style>
