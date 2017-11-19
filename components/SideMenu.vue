<template>
    <div id="side-menu">
        <el-menu background-color="#293352" text-color="#fff" active-text-color="#edb83d" :default-active="this.$route.path" mode="vertical" router>
            <el-menu-item index="/">
                <icon-text icon="lnr-home" text="Home"></icon-text>
            </el-menu-item>
            <el-menu-item index="/browse">
                <icon-text icon="lnr-earth" text="Browse"></icon-text>
            </el-menu-item>
            <el-menu-item index="/myevents">
                <icon-text icon="lnr-heart" text="My Events"></icon-text>
            </el-menu-item>
            <el-menu-item index="/publish">
                <icon-text icon="lnr-bullhorn" text="Publish"></icon-text>
            </el-menu-item>
        </el-menu>
    </div>
</template>

<script>
    import IconText from "~/components/common/IconText";
    export default {
        components: {
            IconText
        }
    }
</script>

<style lang='scss'>
    @import "assets/styles/breakpoints.scss";
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
    
    @media (min-width: $break-lg-xl) {
        #side-menu .icon-text {
            font-size: 1.2em;
        }
    }
</style>