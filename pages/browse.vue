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
        <filters class="filters" v-if="filtersPage" @hide="showFilters(false)"></filters>        
        <browse-list :concerts="concerts"></browse-list>
        <button v-if="!filtersPage" @click="showFilters(true)" id="filters-fab"><img src="~/static/img/icons/basic_mixer2.svg"></button>

    </div>
</template>

<script>
    import BrowseList from '~/components/browse/BrowseList'
    import Filters from '~/components/browse/Filters'
    import {IconText, IconButton} from '~/components/common'
    import {mapActions, mapGetters} from 'vuex'
    export default {
        data () {
            return {
                filtersPage: false,
                selectedMode: 'list'
            }
        },
        computed: {
            ...mapGetters({concerts: 'getConcertsList'})
        },
        components: {
            BrowseList,
            IconText,
            IconButton,
            Filters
        },
        methods: {
            ...mapActions(['bindConcertsList', 'unbindConcertsList']),
            showFilters ($bool) { this.filtersPage = $bool }
        },
        mounted () {
            this.bindConcertsList()
        },
        beforeDestroy () {
            this.unbindConcertsList()
        }
    }
</script>

<style lang="scss">
    @import "assets/styles/colors.scss";
    .filters {
        position: fixed;
        width: calc(100% - 2em);
        margin: 1em;
        z-index: 1;
    }
    #filters-fab{
        background: $accentColor;
        position: sticky;
        right: 3em;
        padding: 18px 18px 16px 18px;
        width: 56px;
        height: 56px;
        float: right;
        border: none;
        border-radius: 100%;
        box-shadow: 0px 2px 2px rgba(0,0,0,.5);
        
        img{
            width: 20px;
        }
    }
        #filters-fab:hover{
            cursor: pointer;
            background: $accentColorDark;
        }
        #filters-fab:active{
            cursor: pointer;
            background: $accentColorDark;
        }
</style>
