<template>
    <el-menu id="side-menu" background-color="#293352" text-color="#fff" active-text-color="#edb83d" default-active="1" mode="vertical">
        <nuxt-link to="/">
            <el-menu-item index="1">
                <icon-text icon="lnr-home" text="Inicio"></icon-text>
            </el-menu-item>
        </nuxt-link>
        <nuxt-link to="/explore">
            <el-menu-item index="2">
                <icon-text icon="lnr-eye" text="Explorar"></icon-text>
            </el-menu-item>
        </nuxt-link>
        <nuxt-link to="/map">
            <el-menu-item index="3">
                <icon-text icon="lnr-map" text="Mapa"></icon-text>
            </el-menu-item>
        </nuxt-link>
        <nuxt-link to="/calendar">
            <el-menu-item index="4">
                <icon-text icon="lnr-calendar-full" text="Calendario"></icon-text>
            </el-menu-item>
        </nuxt-link>
        <el-menu-item index="5">
            <icon-text icon="lnr-bullhorn" text="Publicar"></icon-text>
        </el-menu-item>
    </el-menu>
</template>

<script>
    import IconText from "./IconText";
    export default {
        name: "side-menu",
        components: {
            IconText
        }
    }
</script>

<style lang='scss'>
    #side-menu {
        width: 16em;
        padding-top: 60px;
        position: fixed;
        height: 100%;
        z-index: 1;
        display: none;
        border: none;
        box-shadow: 2px 0px 3px 0 rgba(0, 0, 0, 0.26);
    }

    #side-menu a{
        text-decoration: none;
    }
    
    .el-menu-item{
        i {
            color: #fff;
        }
    }
    
    @media (min-width: 768px) {
        #side-menu {
            display: block;
        }
    }
</style>