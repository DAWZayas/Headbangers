<template>
    <el-menu id="side-menu"
        background-color="#293352"
        text-color="#fff"
        active-text-color="#edb83d">
        <el-menu-item index="1">
            <i class="el-icon-view" aria-hidden="true"></i>
            <span>Explorar</span>
        </el-menu-item>
        <el-menu-item index="2">
            <i class="el-icon-location-outline" aria-hidden="true"></i>
            <span>Mapa</span>
        </el-menu-item>
        <el-menu-item index="3">
            <i class="el-icon-date" aria-hidden="true"></i>
            <span>Calendario</span>
        </el-menu-item>
        <el-menu-item index="4">
            <i class="el-icon-bell" aria-hidden="true"></i>
            <span>Notificaciones</span>
        </el-menu-item>
    </el-menu>
</template>

<script>
export default {
  name: "side-menu"
};
</script>

<style>
#side-menu {
    width: 16em;
    padding-top: 4em;
    position: fixed;
    height: 100%;
    z-index: 1;
    display: none;
}
.el-menu-item i {
    color: #eee;
}
@media (min-width: 768px){
    #side-menu{
        display: block;
    }
}
</style>