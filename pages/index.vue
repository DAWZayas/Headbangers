<template>
    <div>
        <header-component></header-component>
        <side-menu></side-menu>
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