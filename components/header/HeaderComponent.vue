<template>
    <header class="top-menu">
        <div class="menu-item">
            <menu-button></menu-button>
        </div>
        <div class="menu-item top-logo">
            <header-logo></header-logo>
        </div>
        <div class="separator"></div>
        <div class="menu-item search-item">
            <search-box></search-box>
        </div>
        <div class="menu-item">
            <icon-button icon="lnr-magnifier"></icon-button>
        </div>
        <div class="menu-item">
            <user-dropdown></user-dropdown>
        </div>
        </el-menu>
    </header>
</template>

<script>
    import HeaderLogo from './HeaderLogo'
    import MenuButton from './MenuButton'
    import {IconText, IconButton} from '~/components/common'
    import UserDropdown from './UserDropdown'
    import SearchBox from './SearchBox'
    export default {
        components: {
            IconButton,
            HeaderLogo,
            MenuButton,
            IconText,
            UserDropdown,
            SearchBox
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
        box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.26);
        height: 60px;
        line-height: 60px;
        display: flex;
        justify-content: space-between;
        .menu-item {
            text-align: center;
            display: inline-block;
            padding: 0 0.5em;
            position: relative;
            box-sizing: border-box;
        }
        .menu-item > * {
            padding-top: 0.1em;
            vertical-align: middle;
        }
        .menu-item:hover {
            background-color: $mainColorLight;
        }
        .top-logo {
            margin-left: 0;
            height: 60px;
            padding: 0;
        }
        .search-item{
            display: none;
        }
        .top-logo:hover, .search-item:hover {
            background-color: transparent;
        }
        .separator{
           flex-grow: 1;
        }
        @media (min-width: 768px) {
            .search-item{
                display: inline-block;
            }
            .menu-item {
                padding: 0 15px;
            }
            .separator {
                flex-grow: 2;
            }
        }
    }
</style>