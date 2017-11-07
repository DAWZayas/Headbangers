<template>
    <header class="top-menu">
        <div class="menu-item">
            <menu-button></menu-button>
        </div>
        <div class="menu-item top-logo">
            <header-logo></header-logo>
        </div>
        <div class="float-right">
            <div class="menu-item top-logo">
                <box-search></box-search>
            </div>
            <div class="menu-item">
                <icon-button icon="lnr-magnifier"></icon-button>
            </div>
            <div class="menu-item">
                <user-button></user-button>
            </div>
        </div>
        </el-menu>
    </header>
</template>

<script>
    import HeaderLogo from "./HeaderLogo";
    import IconButton from "./IconButton";
    import MenuButton from "./MenuButton";
    import IconText from "./IconText";
    import UserButton from "./UserButton";
    import BoxSearch from "./BoxSearch";
    export default {
        name: "header-component",
        components: {
            IconButton,
            HeaderLogo,
            MenuButton,
            IconText,
            UserButton,
            BoxSearch
        }
    }
</script>

<style lang='scss'>
    @import "assets/styles/colors.scss";
    .top-menu {
        position: fixed;
        top: 0;
        width: 100%;
        background-color: $mainColor;
        z-index: 10;
        border: none;
        box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.26);
        height: 60px;
        line-height: 60px;

        .menu-item {
            text-align: center;
            display: inline-block;
            height: 60px;
            line-height: 60px;
            padding: 0 5px;
            position: relative;
            box-sizing: border-box;
        }
        .menu-item * {
            vertical-align: middle;
        }
        .menu-item:hover {
            background-color: $mainColorLight;
        }
        .float-right {
            float: right;
            display: flex;
        }
        .top-logo:hover {
            background-color: transparent;
        }
        @media (min-width: 768px) {
            .menu-item {
                padding: 0 15px;
            }
        }
    }
</style>