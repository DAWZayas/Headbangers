<template>
    <div id="side-menu">
        <el-menu background-color="#293352" text-color="#fff" active-text-color="#edb83d" :default-active="index" mode="vertical">
            <nuxt-link to="/">
                <el-menu-item index="1">
                    <icon-text icon="lnr-home" text="Home"></icon-text>
                </el-menu-item>
            </nuxt-link>
            <nuxt-link to="/browse">
                <el-menu-item index="2">
                    <icon-text icon="lnr-earth" text="Browse"></icon-text>
                </el-menu-item>
            </nuxt-link>
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
        data() {
            return {
                pages: ['home', 'browse', 'mine', 'publish'],
            }
        },
        computed: {
            index(){ return this.pages.indexOf(this.$route.path.slice(1)).toString()}
        },  
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
        overflow: hidden;
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