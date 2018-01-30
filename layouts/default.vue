<template>
    <div>
        <div v-if='isLoading'>
            <splash></splash>
        </div>
        <div>
            <header-component></header-component>
            <side-menu></side-menu>
            <main>
                <nuxt/>
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
        computed: {
            ...mapGetters({isAuthenticated: 'isAuthenticated'})
        },
        data () {
            return {
                isLoading: true
            }
        },
        beforeMount () {
            this.setAllReferences()
        },
        created () {
            setTimeout(() => this.isLoading = false, 2000)
            if (process.browser) {
                window.onNuxtReady((app) => {
                    this.bindAuth()
                    if(process.env.authNeeded.includes(this.$route.name) && !this.isAuthenticated){
                        this.$route.push('login')
                    }else if(this.$route.name == 'login' && this.isAuthenticated){
                        this.$route.push('/')
                    }
                    this.loadScripts()
                })
            }
        },
        methods: {
            ...mapActions(['bindAuth', 'setAllReferences']),
            loadScripts(){
                let script = document.createElement('script')
                script.setAttribute('src', '/slideout/slideout.config.js')
                document.body.appendChild(script)
            }
        }
    }
</script>