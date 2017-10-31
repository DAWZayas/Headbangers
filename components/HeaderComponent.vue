<template>
    <header>
        <el-menu class="top-menu" mode="horizontal">
            <el-menu-item index="1"><menu-button></menu-button></el-menu-item>
            <el-menu-item index="2"><header-logo></header-logo></el-menu-item>
            <div class="float-right">
                <el-menu-item index="3"><icon-button icon="fa-search"></icon-button></el-menu-item>
                <el-menu-item index="4"><icon-button icon="fa-user-o"></icon-button></el-menu-item>
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
  components: {IconButton, MenuButton, HeaderLogo}
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
    .top-menu  > * {
        float: left;
    }
    .float-right {
        float: right;
    }

    .top-menu .el-menu-item:hover{
        background-color: transparent;
    }

    .float-right .el-menu-item:hover{
        background-color: #293352;
    }
</style>