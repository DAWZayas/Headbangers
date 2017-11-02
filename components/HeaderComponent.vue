<template>
    <header>
        <el-menu class="top-menu" mode="horizontal">
            <el-menu-item index="1">
                <menu-button></menu-button>
            </el-menu-item>
            <el-menu-item id="top-logo" index="2">
                <header-logo></header-logo>
            </el-menu-item>
            <div class="float-right">
                <el-menu-item index="3">
                    <icon-button icon="lnr-magnifier"></icon-button>
                </el-menu-item>
                <el-menu-item index="4">
                    <icon-button icon="lnr-user"></icon-button>
                </el-menu-item>
            </div>
        </el-menu>
    </header>
</template>

<script>
    import HeaderLogo from "./HeaderLogo";
    import IconButton from "./IconButton";
    import MenuButton from "./MenuButton";   
    export default {
        name: "header-component",
        components: {
            IconButton,
            HeaderLogo,
            MenuButton
        }
    }
</script>

<style lang='scss'>
@import "assets/styles/colors.scss";
    .top-menu {
        position: fixed;
        width: 100%;
        background-color: $mainColor;
        z-index: 10;
        border: none;

        .el-menu-item:hover {
            background-color: $mainColorLight;
        }

        .el-menu-item.is-active {
            border-bottom: none;
            background-color: $mainColor;
        }

        .float-right {
            float: right;
        }

        #top-logo:hover {
            background-color: transparent;
        }
    }
</style>