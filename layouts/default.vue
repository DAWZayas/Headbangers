<template>
    <div>
        <div v-if='showSplash'>
            <splash></splash>
        </div>
        <div>
            <header-component></header-component>
            <side-menu></side-menu>
            <main>
                <nuxt v-loading="loading" />
                <footer-component></footer-component>
            </main>
        </div>
    </div>
</template>

<script>
    import HeaderComponent from '~/components/header/HeaderComponent'
    import SideMenu from '~/components/SideMenu'
    import Splash from '~/components/Splash'
    import FooterComponent from '~/components/FooterComponent'
    import { mapActions, mapMutations, mapGetters } from 'vuex'
    export default {
        components: {
            HeaderComponent,
            SideMenu,
            Splash,
            FooterComponent
        },
        data () {
            return {
                showSplash: true
            }
        },
        computed: {
            ...mapGetters({loading: 'getLoading'})
        },
        methods: {
            ...mapActions(['bindAuth', 'setReferences']),
            //...mapMutations(['setReferences'])
        },

        beforeMount () {
            this.setReferences()
            this.bindAuth()
        },

        created () {
            this.showSplash = true
            setTimeout(() => {
                this.showSplash = false
            }, 2000)
        }
    }
</script>