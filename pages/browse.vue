<template>
    <div>
        <nuxt v-loading="loading" />
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
            <filters ref="filters" id="filters" :data="filters" @setFilters="setFilters" @hide="showFilters(false)"></filters>
            <concerts-list class="concerts-list" ref="list" :concerts="filteredConcerts"></concerts-list>
            <div id="fab-container">
                <button v-show="showFab" id="fab" @click="showFilters(true)"><img src="~/static/img/icons/basic_mixer2.svg"></button>
            </div>
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
                windowWidth: 0,
                filteredConcerts: []
            }
        },

        computed: {
            ...mapGetters({concerts: 'getConcertsList', userCountry: 'getUserCountry', loading: 'getLoading'}),
        },

        watch: {
            filters () {
                this.applyFilters()
            },
            concerts () {
                this.applyFilters()
            },
            windowWidth () {
                var right, width, backButton = "visible", content = "100"
                
                if (this.windowWidth < 678) {
                    right = "-100"
                    width = "100"
                }else if (this.windowWidth < 1500) {
                    right = "-45"
                    width = "45"
                }else {
                    right = "0"
                    width = "25"
                    content = "75"
                    backButton = "hidden"
                }
                document.getElementById("concerts-list").style.width = content + '%'
                document.getElementById("back-button").style.visibility = backButton
                document.getElementById("filters").style.width = width + '%'
                document.getElementById("filters").style.right = right + '%'
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

            showFilters(bool){
                if (this.windowWidth < 768) {
                    
                    if (bool) {
                        document.getElementById("filters").style.right = 0;
                    }else{
                        document.getElementById("filters").style.right = "-100%";
                    }

                }else if (this.windowWidth < 1500) {

                    if (bool) {
                        document.getElementById("filters").style.right = 0;
                    }else {
                        document.getElementById("filters").style.right = '-45%';
                    }

                }
            }
        },

        mounted () {
                if(!this.userCountry){
                    this.setUserCountry().then(() => {
                    this.setConcertsListRef()
                    this.bindConcertsList()
                    })
                }else{
                    this.setConcertsListRef()
                    this.bindConcertsList()
                }
                var that = this
                that.windowWidth = window.innerWidth
                window.addEventListener('resize', function(e) {
                    that.windowWidth = window.innerWidth
                })
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
        right: -100%;
        transition: all .5s;
    }
    #fab-container {
        text-align: right;
        width: 100%;
        z-index: 1;
        #fab {
            position: fixed;
            bottom: 2.5em;
            right: 2em;
            background: $accentColor;
            padding: 18px 18px 16px 18px;
            width: 56px;
            height: 56px;
            border: none;
            border-radius: 100%;
            box-shadow: 0px 2px 2px rgba(0,0,0,.5);
            img {
                width: 20px;
            }
        }
    }
    #fab:hover {
        cursor: pointer;
        background: $accentColorDark;
    }

    @media (min-width: $break-xs-sm) {
        #fab {
            bottom: 3em;
            right: 3em;
        }
    }
</style>
