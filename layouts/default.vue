<template>
    <div>
        <div v-if="isLoading">
            <splash></splash>
        </div>
        <div>
            <header-component></header-component>
            <side-menu></side-menu>
            <main>
                <nuxt/>
            </main>
        </div>
<script src="/slideout/slideout.config.js">
    
</script>
    </div>
</template>

<script>
    import HeaderComponent from "~/components/header/HeaderComponent";
    import SideMenu from "~/components/SideMenu";
    import Splash from "~/components/Splash";
    import { mapActions } from 'vuex';
    export default {
        components: {
            HeaderComponent,
            SideMenu,
            Splash
        },
        data() {
            return {
                isLoading: true
            }
        },
        created() {
            this.setConcertsRef();
            this.isLoading = true;
            setTimeout(() => {
                this.isLoading = false;
            }, 2000)
        },
        methods: {
            ...mapActions(['setConcertsRef'])
        }
    }
</script>