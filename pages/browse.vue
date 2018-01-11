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
        
        <filters class="filters" v-show="filtersPage" @hide="showFilters(false)" :data="filters" @applyFilters="applyFilters"></filters>
        <concerts-list :concerts="arrayConcerts"></concerts-list>
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
                arrayConcerts: [],
                selectedMode: 'list'
            }
        },
        computed: {
            ...mapGetters({concerts: 'getConcertsList'}),
        },
        components: {
            ConcertsList,
            IconText,
            IconButton,
            Filters
        },
        methods: {
            ...mapActions(['bindConcertsList', 'unbindConcertsList']),
            showFilters ($bool) {
                this.filtersPage = $bool;
                //$bool ? document.body.style.overflow="hidden" : document.body.style.overflow="scroll";
            },
            applyFilters ($filters) {
               const $sorting = $filters.sort.toLowerCase();
                switch ($sorting) {
                    case 'likes':
                        this.sorting('desc', 'likes');
                        break;
                    case 'nearer':
                        navigator.geolocation.getCurrentPosition( this.setLocation );
                        break;
                    case 'cheaper':
                        this.sorting('asc', 'price');
                        break;
                    case 'people assisting':
                        this.sorting('desc', 'assisting');                    
                        break;
                    default:
                        this.sorting('asc', 'date');
                        break;
                }
            },
            setLocation (position, error){
                const lat = position.coords.latitude;
                const long = position.coords.longitude;
                console.log(lat + ' , ' + long);
            },
            sorting ($order, $subject) {
                console.log($subject);
                if ($order == 'asc') {
                    this.arrayConcerts.sort(function (a, b) {return a[1][$subject] - b[1][$subject]});
                }else if ($order == 'desc') {
                    this.arrayConcerts.sort(function (a, b) {return b[1][$subject] - a[1][$subject]});
                }
            }
        },
        mounted () {
            this.bindConcertsList();
            for (const key in this.concerts) {
                    this.arrayConcerts.push([key, this.concerts[key]]);
            }
            this.sorting('asc', 'date');
        },
        beforeDestroy () {
            this.unbindConcertsList();
        }
    }
</script>

<style lang="scss">
    @import "assets/styles/colors.scss";
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
            bottom: 7em;
            right: 2em;
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
</style>
