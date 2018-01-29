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
        
        <filters ref="filters" class="filters" v-show="filtersPage" @hide="showFilters(false)" :data="filters" @setFilters="setFilters"></filters>
        <concerts-list ref="list" :concerts="filteredConcerts"></concerts-list>
        <div id="fab-container">
            <button v-show="!filtersPage" @click="showFilters(true)" id="fab"><img src="~/static/img/icons/basic_mixer2.svg"></button>
        </div>
    </div>
</template>

<script>
    import ConcertsList from '~/components/browse/ConcertsList'
    import Filters from '~/components/browse/Filters'
    import {IconText, IconButton} from '~/components/common'
    import {mapActions, mapGetters} from 'vuex'
    export default {
        data () {
            return {
                filters: [((concerts) => concerts.sort((a, b) => a.date - b.date))],
                filtersPage: false,
                selectedMode: 'list',
                filteredConcerts: []
            }
        },
        computed: {
            ...mapGetters({concerts: 'getConcertsList'}),
        },
        watch: {
            filters () {
                this.applyFilters()
            },
            concerts () {
                this.applyFilters()
            }
        },
        components: {
            ConcertsList,
            IconText,
            IconButton,
            Filters
        },
        
        methods: {
            ...mapActions(['bindConcertsList', 'unbindConcertsList']),
            applyFilters(){
                this.filteredConcerts =  this.concerts && this.filters.reduce((acc, func) => func(acc), this.concerts)
            },
            showFilters (bool) {
                this.filtersPage = bool;
            },
            setFilters (filters) {
                this.filters = filters;           
            }
        },
        mounted () {
            this.bindConcertsList();
        },
        beforeDestroy () {
            this.unbindConcertsList()
        }
    }
</script>

<style lang="scss">
    @import "assets/styles/colors.scss";
    @import "assets/styles/breakpoints.scss";
    .filters {
        position: fixed;
        width: calc(100% - 2em);
        margin: 1em;
        z-index: 6;
    }

    #fab-container{
        text-align: right;
        width: 100%;
        #fab{
            position: fixed;
            bottom: 1.5em;
            right: 1.5em;
            background: $accentColor;
            padding: 18px 18px 16px 18px;
            width: 56px;
            height: 56px;
            border: none;
            border-radius: 100%;
            box-shadow: 0px 2px 2px rgba(0,0,0,.5); 
            img{
                width: 20px;
            }
        }
    }
        #fab:hover{
            cursor: pointer;
            background: $accentColorDark;
        }
        #fab:active{
            cursor: pointer;
            background: $accentColorDark;
        }
    @media (min-width: $break-xs-sm) {
        #fab{
            bottom: 3em;
            right: 3em;
        }
    }
</style>
