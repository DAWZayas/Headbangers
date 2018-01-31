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
            this.setUserCountry().then(() => {
                this.setAllReferences()
            })
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
                    this.prepareSlideout()
                    geolocator.config({
                        google: {
                            version: "3",
                            key: "AIzaSyB0BavoaQqF9ViPldtHAp4kj2FJ7CHAFRI"
                        }
                    });
                })
            }
        },
        methods: {
            ...mapActions(['bindAuth', 'setAllReferences', 'setUserCountry']),
            prepareSlideout(){
                var slideout = new Slideout({
                    'panel': document.querySelector('main'),
                    'menu': document.querySelector('#side-menu'),
                    'touch': false,
                    'padding': 256
                })
                document.querySelector('#menu-button').onclick = () => slideout.toggle()
                window.innerWidth > 768 && slideout.open()
                document.querySelectorAll('#side-menu .el-menu-item').forEach((item) => { item.onclick = () => { window.innerWidth < 768 && slideout.close() } })
            }
        }
    }
</script>