<template>
    <div>
        <div>
            <concerts-list class="concerts-list" ref="list" :concerts="filteredConcerts"></concerts-list>
            <filters ref="filters" class="filters" :data="filters" @setFilters="setFilters" @hide="toggleFilters(false)"></filters>
            <div id="fab-container">
                <button v-show="showFab" id="fab" @click="toggleFilters(true)"><img src="~/static/img/icons/basic_mixer2.svg"></button>
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
                fabPosition: 0,
                windowWidth: 0,
                selectedMode: 'list',
                filteredConcerts: []
            }
        },

        computed: {
            ...mapGetters({concerts: 'getCountryConcerts', userCountry: 'getUserCountry'}),
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
                
                if (this.windowWidth < 768) {
                    right = "-100"
                    width = "100"
                }else if (this.windowWidth < 1050) {
                    right = "-45"
                    width = "45"
                }else if (this.windowWidth < 1500) {
                    right = "-35"
                    width = "35"
                }else {
                    right = "0"
                    width = "25"
                    content = "75"
                    backButton = "hidden"
                }
                document.querySelector(".concerts-list").style.width = content + '%'
                document.querySelector("#back-button").style.visibility = backButton
                document.querySelector(".filters").style.width = width + '%'
                document.querySelector(".filters").style.right = right + '%'
            }
        },

        components: {
            ConcertsList,
            IconText,
            IconButton,
            Filters
        },
        
        methods: {
            ...mapActions(['bindCountryConcerts', 'unbindCountryConcerts', 'getUserCountry']),
            ...mapMutations(['setCountryConcertsRef']),
            applyFilters () {
                this.filteredConcerts = this.concerts && this.filters.reduce((acc, func) => func(acc), this.concerts)
            },

            setFilters (filters) {
                this.filters = filters;           
            },

            toggleFilters (show) {
                if (this.windowWidth < 768) {
                    
                    show ? document.querySelector(".filters").style.right = 0 : document.querySelector(".filters").style.right = "-100%"
                    show ? document.body.style.overflow = "hidden" : document.body.style.overflow = "scroll"

                }else if (this.windowWidth < 1050) {

                    show ? document.querySelector(".filters").style.right = 0 : document.querySelector(".filters").style.right = '-45%'

                }else if (this.windowWidth < 1500) {

                    show ? document.querySelector(".filters").style.right = 0 : document.querySelector(".filters").style.right = '-35%'

                }
            }
        },

        mounted () {
                this.getUserCountry().then((country) => {
                    this.setCountryConcertsRef()
                    this.bindCountryConcerts()
                })
                this.windowWidth = window.innerWidth
                window.addEventListener('resize', (e) => {
                    this.windowWidth = window.innerWidth
                })
                
                const fab = document.querySelector("#fab-container");
                const footer = document.querySelector(".footer");

                window.addEventListener('scroll', (i) => {
                    var fabDist = fab.getBoundingClientRect().top
                    var footerDist = footer.getBoundingClientRect().top
                    if ((fabDist + document.body.scrollTop) + fab.offsetHeight >= (footerDist + document.body.scrollTop) - 20) {
                        fab.style.position = 'relative'
                    }else if (document.body.scrollTop + window.innerHeight < (footerDist + document.body.scrollTop)) {
                        fab.style.position = 'fixed'
                    }
                })
                
        },

        beforeDestroy () {
            this.unbindCountryConcerts()
        }
    }
</script>

<style lang="scss">
    @import "assets/styles/colors.scss";
    @import "assets/styles/breakpoints.scss";
    .filters {
        right: -100%;
        transition: all .45s;
    }
    #fab-container {
        position: fixed;
        margin-top: -49px;
        right: 25px;
        bottom: 25px;
        text-align: right;
        z-index: 1;
        #fab {
            background: $accentColor;
            padding: 18px 18px 15px 18px;
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
</style>
