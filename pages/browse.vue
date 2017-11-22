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

            <event-card v-for="concert in concerts" v-if="concert.location" :key="concert.key" :id="concert.name" img="/img/placeholder.png" :title="concert.name" :date="concert.date" :time="concert.time" :location="`${concert.location.name} (${concert.location.city})`" :price="concert.price"></event-card>

    </div>
</template>

<script>
    import IconText from '~/components/common/IconText';
    import EventCard from '~/components/browse/EventCard';
    import { mapActions, mapGetters } from 'vuex';
    export default {
        data() {
            return {
                selectedMode: 'list'
            }
        },
        computed: {
            ...mapGetters({concerts: 'getConcerts'})
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
