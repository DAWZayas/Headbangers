<template>
    <div>
        <!--
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
        -->
        <browse-list :concerts="concerts"></browse-list>

    </div>
</template>

<script>
    import BrowseList from '~/components/browse/BrowseList';
    import {IconText} from "~/components/common";
    import {mapActions, mapGetters} from 'vuex';
    export default {
        data() {
            return {
                selectedMode: 'list'
            }
        },
        computed: {
            ...mapGetters({concerts: 'getConcertsList'})
        },
        components: {
            BrowseList,
            IconText
        },
        methods:{
            ...mapActions(['bindConcertsList', 'unbindConcertsList'])
        },
        created(){    
            this.bindConcertsList();
        },
        beforeDestroy(){
            this.unbindConcertsList();
        }
    }
</script>

<style lang="scss">
    
</style>
