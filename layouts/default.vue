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
        beforeMount () {
            this.configGeolocator()
            this.setUserCountry()
            this.setUsersRef()
            this.setConcertsListRef()
        },
        created () {
            setTimeout(() => this.showSplash = false, 2000)
            if (process.browser) {
                window.onNuxtReady((app) => { 
                    this.bindAuth().then((isAuth) =>{
                        if(process.env.authNeeded.includes(this.$route.name) && !isAuth){
                            this.$router.push('login')
                        }else if(this.$route.name == 'login' && isAuth){
                            this.$router.push('/')
                        }
                    })
                    this.setSlideout()
                })
            }

        },
        methods: {
            ...mapActions(['bindAuth', 'setUsersRef', 'setUserCountry']),
            ...mapMutations(['setUsersRef', 'setConcertsListRef']),
            setSlideout () {
                var slideout = new Slideout({
                    'panel': document.querySelector('main'),
                    'menu': document.querySelector('#side-menu'),
                    'touch': false,
                    'padding': 256,
                })
                document.querySelector('#menu-button').onclick = () => slideout.toggle()
                window.innerWidth > 768 && slideout.open()
                document.querySelectorAll('#side-menu .el-menu-item').forEach((item) => { item.onclick = () => { window.innerWidth < 768 && slideout.close() } })
            },
            configGeolocator(){
                geolocator.config({
                    google: {
                        version: "3",
                        key: "AIzaSyB0BavoaQqF9ViPldtHAp4kj2FJ7CHAFRI"
                    }
                })
            }
        }
    }
</script>