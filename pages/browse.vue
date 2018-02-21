<template>
    <div>
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
            <filters ref="filters" class="filters" :data="filters" @setFilters="setFilters" @hide="toggleFilters(false)"></filters>
            <concerts-list v-loading="loading" class="concerts-list" ref="list" :concerts="filteredConcerts"></concerts-list>
            <button v-show="showFab" id="fab" @click="toggleFilters(true)"><img src="~/static/img/icons/basic_mixer2.svg"></button>
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
                fabPosition: 0,
                windowWidth: 0,
                selectedMode: 'list',
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
            applyFilters () {
                this.filteredConcerts = this.concerts && this.filters.reduce((acc, func) => func(acc), this.concerts)
            },

            setFilters (filters) {
                this.filters = filters;           
            },

            toggleFilters (show) {
                var right;
                    if (this.windowWidth < 768) {
                        right = show ? 0 : "-100%"
                        show ? window.scrollTo(0, 0) : false;
                        document.body.style.overflowY = show ? "hidden" : "scroll"
                    }else if (this.windowWidth < 1050) {
                        right = show ? 0 : "-45%"
                        show ? window.scrollTo(0, 0) : false
                    }else if (this.windowWidth < 1500) {
                        right = show ?  0 : "-35%"
                        show ? window.scrollTo(0, 0) : false
                    }
                document.querySelector(".filters").style.right = right;
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
                
                this.windowWidth = window.innerWidth
                window.addEventListener('resize', (e) => {
                    this.windowWidth = window.innerWidth
                })

                const fab = document.querySelector("#fab");
                const footer = document.querySelector(".footer");

                window.addEventListener('scroll', (i) => {
                    var fabDist = fab.getBoundingClientRect().top
                    var footerDist = footer.getBoundingClientRect().top
                        if (window.innerHeight < (footerDist + 15)) {
                            fab.style.position = 'fixed'
                            fab.style.bottom = '25px'
                        }else if (fabDist + fab.offsetHeight >= footerDist - 15) {
                            fab.style.position = 'absolute'
                            fab.style.bottom = (document.querySelector(".footer").offsetHeight + 13) + 'px'
                        }
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
    
    body {
        overflow-x: hidden;
    }
    #fab {
        position: fixed;
        right: 25px;
        bottom: 25px;
        z-index: 1;
        background: $accentColor;
        padding: 18px 18px 15px 18px;
        border: none;
        border-radius: 100%;
        box-shadow: 0px 2px 2px rgba(0,0,0,.5);
            img {
                width: 20px;
            }
    }
    #fab:hover {
        cursor: pointer;
        background: $accentColorDark;
    }
</style>
