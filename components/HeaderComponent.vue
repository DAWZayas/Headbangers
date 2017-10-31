<template>
    <header>
        <el-menu class="top-menu" mode="horizontal">
            <el-menu-item>
                <icon-button icon="lnr-menu"></icon-button>
            </el-menu-item>
            <el-menu-item id="top-logo">
                <header-logo></header-logo>
            </el-menu-item>
            <div class="float-right">
                <el-menu-item>
                    <icon-button icon="lnr-magnifier"></icon-button>
                </el-menu-item>
                <el-menu-item>
                    <icon-button icon="lnr-user"></icon-button>
                </el-menu-item>
            </div>
        </el-menu>
    </header>
</template>

<script>
    import HeaderLogo from "./HeaderLogo";
    import IconButton from "./IconButton";
    
    export default {
        name: "header-component",
        components: {
            IconButton,
            HeaderLogo
        }
    }
</script>

<style>
    .top-menu {
        position: fixed;
        width: 100%;
        background-color: #000b29;
        z-index: 10;
        border: none;
    }
    
    .top-menu>* {
        float: left;
    }
    
    .float-right {
        float: right;
    }
    
    #top-logo:hover {
        background-color: transparent;
    }

    
    .top-menu .el-menu-item.is-active{
        border-bottom: none;
        background-color: #000b29;
    }

    .top-menu .el-menu-item:hover {
        background-color: #293352;
    }

    
</style>