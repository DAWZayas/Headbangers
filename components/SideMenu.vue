<template>
    <div id="side-menu">
        <el-menu background-color="#293352" text-color="#fff" active-text-color="#edb83d" default-active="1" mode="vertical">
            <nuxt-link to="/">
                <el-menu-item index="1">
                    <icon-text icon="lnr-home" text="Home"></icon-text>
                </el-menu-item>
            </nuxt-link>
            <el-submenu index="2">
                <template slot="title">
                    <icon-text icon="lnr-eye" text="Browse"></icon-text>
                </template>
                <nuxt-link to="/explore">
                    <el-menu-item index="2-1">
                        <icon-text icon="lnr-list" text="List"></icon-text>
                    </el-menu-item>
                </nuxt-link>
                <nuxt-link to="/explore">
                    <el-menu-item index="2-2">
                        <icon-text icon="lnr-map" text="Map"></icon-text>
                    </el-menu-item>
                </nuxt-link>
                <nuxt-link to="/explore">
                    <el-menu-item index="2-3">
                        <icon-text icon="lnr-calendar-full" text="Calendar"></icon-text>
                    </el-menu-item>
                </nuxt-link>
            </el-submenu>
            <el-menu-item index="3">
                <icon-text icon="lnr-heart" text="My Events"></icon-text>
            </el-menu-item>
            <nuxt-link to="/publish">
                <el-menu-item index="4">
                    <icon-text icon="lnr-bullhorn" text="Publish"></icon-text>
                </el-menu-item>
            </nuxt-link>
        </el-menu>
    </div>
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
        background-color: #293352;
        a {
            text-decoration: none;
        }
        .el-menu {
            border: none;
        }
        .el-menu-item {
            i {
                color: #fff;
            }
        }
    }
</style>