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
        
        <filters ref="filters" class="filters" :data="filters" @setFilters="setFilters"></filters>
                <concerts-list ref="list" :concerts="filteredConcerts"></concerts-list>
                <div id="fab-container">
                    <button v-show="showFab" id="fab"><img src="~/static/img/icons/basic_mixer2.svg"></button>
                </div>
    </div>
</template>

<script>
    import ConcertsList from '~/components/browse/ConcertsList'
    import Filters from '~/components/browse/Filters'
    import {IconText, IconButton} from '~/components/common'
    import {mapActions, mapGetters, mapMutations} from 'vuex'
    export default {
        data () {
            return {
                filters: [((concerts) => concerts.sort((a, b) => a.date - b.date))],
                showFab: true,
                selectedMode: 'list',
                filteredConcerts: []
            }
        },
        computed: {
            ...mapGetters({concerts: 'getConcertsList', initialized: 'isInitialized'}),
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
            ...mapActions(['bindConcertsList', 'unbindConcertsList', 'setUserCountry']),
            ...mapMutations(['setConcertsListRef']),
            applyFilters(){
                this.filteredConcerts =  this.concerts && this.filters.reduce((acc, func) => func(acc), this.concerts)
            },

            setFilters (filters) {
                this.filters = filters;           
            },

            prepareSlideout(){
                var slideout = new Slideout({
                    'panel': document.querySelector('concerts-list'),
                    'menu': document.querySelector('filters'),
                    'touch': false,
                    'side': 'right',
                    'padding': 256
                })
                document.querySelector('#fab').onclick = () => slideout.toggle()
                window.innerWidth > 768 && slideout.open(), this.showFab = false
                document.querySelectorAll('#back-button, #apply-button').forEach((item) => { item.onclick = () => { window.innerWidth < 768 && slideout.close(), this.showFab = true } })
            }
        },
        mounted () {
            if(!this.initialized){
                this.setUserCountry().then(() => {
                    this.setConcertsListRef()
                    this.bindConcertsList()
                })
            }else{
                this.setConcertsListRef()
                this.bindConcertsList()
            }
        },
        created () {
            if (process.browser) {
                window.onNuxtReady((app) => {
                    this.prepareSlideout()
                })
            }
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
