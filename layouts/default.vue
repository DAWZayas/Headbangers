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
                <footer-component></footer-component>
            </main>
        </div>
    </div>
</template>

<script>
    import HeaderComponent from "~/components/header/HeaderComponent";
    import SideMenu from "~/components/SideMenu";
    import Splash from "~/components/Splash";
    import FooterComponent from "~/components/index/FooterComponent";
    import { mapActions } from 'vuex';
    export default {
        components: {
            HeaderComponent,
            SideMenu,
            Splash,
            FooterComponent
        },
        data() {
            return {
                isLoading: true
            }
        },
        created() {
            this.setReferences();
            this.isLoading = true;
            setTimeout(() => {
                this.isLoading = false;
            }, 2000)
        },
        methods: {
            ...mapActions(['setReferences'])
        }
    }
</script>