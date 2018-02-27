<template>
    <div>
        <filters ref="filters" :data="filters" @setFilters="setFilters" @hide="toggleFilters(false)"></filters>
        <button v-show="showFab" id="fab" @click="toggleFilters(true)"><img src="~/static/img/icons/basic_mixer2.svg"></button>
    </div>
</template>
<script>
    import Filters from '~/components/browse/Filters'
    export default {
        data () {
            return {
                filters: [],
                showFab: true,
                windowWidth: 0
            }
        },

        components: {
            Filters
        },

        methods: {

            toggleFilters (show) {
                var right = 0
                    if (this.windowWidth < 400) {
                        var scroll = "hidden"
                        if (!show) right = "-100%", scroll = "scroll"
                        document.body.style.overflowY = scroll
                    }else if (this.windowWidth < 600) {
                        if (!show) right = "-70%"
                    }else if (this.windowWidth < 768) {
                        if (!show) right = "-55%"
                    }else if (this.windowWidth < 852) {
                        if (!show) right = "-45%"
                    }else if (this.windowWidth < 1050) {
                        if (!show) right = "-35%"
                    }else if (this.windowWidth < 1500) {
                        if (!show) right = "-30%"
                    }
                show ? window.scroll({top:0, left: 0, behavior: 'smooth'}) : false;
                document.querySelector(".filters").style.right = right
                document.querySelector(".filters").style.display = show ? "initial" : "none"
            },

            setFilters(filters) {
                this.filters = filters;
                this.$emit('setFilters', this.filters);
            }
        },

        mounted() {
            document.querySelector(".filters").style.display= "none"

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
        }
    }
</script>
<style lang="scss">
    @import "assets/styles/colors.scss";
    @import "assets/styles/breakpoints.scss";
    
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
