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
                <icon-text icon="lnr-enter" text="Log In" @click.native="showLogin = true"></icon-text>
            </el-dropdown-item>
            <el-dropdown-item>
                <icon-text icon="lnr-pencil" text="Sign Up" @click.native="showSignup = true"></icon-text>
            </el-dropdown-item>
        </el-dropdown-menu>
    
        <el-dialog title="Login to your account" :visible.sync="showLogin" :append-to-body="true">
            <auth-form show="login"></auth-form>
        </el-dialog>
        <el-dialog title="Sign up for an account" :visible.sync="showSignup" :append-to-body="true">
            <auth-form show="signup"></auth-form>
        </el-dialog>
    </el-dropdown>
</template>

<script>
    import IconButton from "./IconButton";
    import IconText from "./IconText";
    import AuthForm from "./AuthForm";
    import publish from "~/pages/publish";
    
    export default {
        name: "user-button",
        data: () => ({
            isAuthenticated: false,
            showLogin: false,
            showSignup: false
        }),
        components: {
            IconButton,
            IconText,
            AuthForm
        }
    }
</script>

<style>
    .user-dropdown {
        font-size: 1em;
    }
    
    .user-dropdown .icon-button {
        padding-bottom: 0.3em;
    }
</style>