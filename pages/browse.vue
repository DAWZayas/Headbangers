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
                filters: {},
                filtersPage: false,
                selectedMode: 'list'
            }
        },
        computed: {
            ...mapGetters({concerts: 'getConcertsList'}),
            concertsArray: function () { return this.concerts && Object.keys(this.concerts).map(key => ({...this.concerts[key], key})).filter(concert => concert.key !== '.key') },
            filteredConcerts: function () { 
                var filters = Object.keys(this.filters).length === 0 ? {sort: 'sooner'} : this.filters;
                return this.concerts && this.applyFilters(this.concertsArray, filters);
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
            },
            applyFilters (concertsArray, filters) {
               const sorting = filters.sort.toLowerCase();
               var filteredConcerts = [];
                switch (sorting) {
                    case 'likes':
                        filteredConcerts = this.sorting(concertsArray, 'desc', 'likes');
                        break;
                    case 'nearer':
                        navigator.geolocation.getCurrentPosition( this.setLocation );
                        break;
                    case 'cheaper':
                        filteredConcerts = this.sorting(concertsArray, 'asc', 'price');
                        break;
                    case 'people assisting':
                        filteredConcerts = this.sorting(concertsArray, 'desc', 'assisting');                    
                        break;
                    case 'sooner':
                        filteredConcerts = this.sorting(concertsArray,'asc', 'date');
                        break;
                    default:
                        filteredConcerts = concertsArray;
                        break;
                }
                return filteredConcerts;
            },
            setLocation (position, error){
                const lat = position.coords.latitude;
                const long = position.coords.longitude;
                console.log(lat + ' , ' + long);
            },
            sorting (concertsArray, order, subject) {
                if (order == 'asc') {
                    concertsArray = concertsArray.sort(function (a, b) {return a[subject] - b[subject]});
                }else if (order == 'desc') {
                    concertsArray = concertsArray.sort(function (a, b) {return b[subject] - a[subject]});
                }
                return concertsArray;
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
