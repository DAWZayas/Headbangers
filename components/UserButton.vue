<template>
    <el-dropdown class="user-dropdown">
        <icon-button icon="lnr-user"></icon-button>

        <el-dropdown-menu v-if="isAuthenticated" slot="dropdown">
            <el-dropdown-item>
                <icon-text icon="lnr-user" text="Account"></icon-text>
            </el-dropdown-item>
            <el-dropdown-item>
                <icon-text icon="lnr-alarm" text="Notifications"></icon-text>
            </el-dropdown-item>
            <el-dropdown-item>
                <icon-text icon="lnr-cog" text="Settings"></icon-text>
            </el-dropdown-item>
            <el-dropdown-item>
                <icon-text icon="lnr-exit" text="Log Out"></icon-text>
            </el-dropdown-item>
        </el-dropdown-menu>

        <el-dropdown-menu v-else slot="dropdown">
            <el-dropdown-item>
                <icon-text icon="lnr-enter" text="Log In"></icon-text>
            </el-dropdown-item>
            <el-dropdown-item>
                <icon-text icon="lnr-pencil" text="Sign Up"></icon-text>
            </el-dropdown-item>
        </el-dropdown-menu>
    </el-dropdown>
</template>

<script>
    import IconButton from "./IconButton";
    import IconText from "./IconText";

    export default {
        name: "user-button",
        data: () => ({
            isAuthenticated: true
        }),
        components: {
            IconButton,
            IconText
        }
    }
</script>

<style>
    .user-dropdown{
        font-size: 1em;
    }

    .user-dropdown .icon-button{
        padding-bottom: 0.7em;
    }
</style>