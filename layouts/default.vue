<template>
    <div id="app">
        <header-component></header-component>
        <side-menu></side-menu>
        <nuxt/>
    </div>
</template>

<script>
    import HeaderComponent from "~/components/HeaderComponent";
    import SideMenu from "~/components/SideMenu";
    export default {
        data () {
            return {}
        },
        components: { HeaderComponent, SideMenu}
    }
</script>