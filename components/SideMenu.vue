<template>
    <el-menu id="side-menu" background-color="#293352" text-color="#fff" active-text-color="#edb83d">
        <el-menu-item index="1">
            <icon-text icon="lnr-eye" text="Explorar"></icon-text>
        </el-menu-item>
        <el-menu-item index="2">
            <icon-text icon="lnr-map" text="Mapa"></icon-text>
        </el-menu-item>
        <el-menu-item index="3">
            <icon-text icon="lnr-calendar-full" text="Calendario"></icon-text>
        </el-menu-item>
        <el-menu-item index="4">
            <icon-text icon="lnr-alarm" text="Notificaciones"></icon-text>
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

<style>
    #side-menu {
        width: 16em;
        padding-top: 60px;
        position: fixed;
        height: 100%;
        z-index: 1;
        display: none;
    }
    
    .el-menu-item i {
        color: #eee;
    }
    
    @media (min-width: 768px) {
        #side-menu {
            display: block;
        }
    }
</style>