<template>
    <header>
        <menu-button></menu-button>
        <menu-logo></menu-logo>
        <div class="float-right">
            <icon-button icon="fa-search"></icon-button>
            <icon-button icon="fa-user-o"></icon-button>
        </div>
    </header>
</template>
<script>
import MenuLogo from "./MenuLogo";
import IconButton from "./IconButton";
import MenuButton from "./MenuButton";

export default {
  name: "header-component",
  components: {IconButton, MenuButton, MenuLogo}
}
</script>

<style>
    header {
        position: fixed;
        width: 100%;
        padding: 0.75em;
        background-color: #000b29;
    }
    header > * {
        float: left;
    }
    .float-right {
        float: right;
    }
</style>