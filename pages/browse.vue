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
        
        <filters class="filters" v-show="filtersPage" @hide="showFilters(false)" :data="filters" @setFilters="setFilters"></filters>
        <concerts-list :concerts="filteredConcerts"></concerts-list>
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
                filters: [],
                filtersPage: false,
                selectedMode: 'list'
            }
        },
        computed: {
            ...mapGetters({concerts: 'getConcertsList'}),

            concertsArray: function () { return this.concerts && Object.keys(this.concerts).map(key => ({...this.concerts[key], key})).filter(concert => concert.key !== '.key') },
            
            filteredConcerts: function () {
                var filters = Object.keys(this.filters).length === 0 ? [function (concertsArray) { return concertsArray.sort(function (a, b) {return a.date - b.date});}] : this.filters;
                return this.concerts && this.reduce(this.concertsArray, filters);
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

            showFilters (bool) {
                this.filtersPage = bool;
                //$bool ? document.body.style.overflow="hidden" : document.body.style.overflow="scroll";
            },

            setFilters (filters) {
                this.filters = filters;
                console.log (this.filters);
            },

            reduce (concertsArray, filters) {
                console.log(filters);
                var filteredConcerts = [];
                for (var i = 0; i < filters.length; i++) {
                    filteredConcerts = filters[i](concertsArray);
                }
                return filteredConcerts;
            },

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
