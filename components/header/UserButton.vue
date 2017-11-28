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
                <icon-text icon="lnr-enter" text="Log In" @click.native="showLogin"></icon-text>
            </el-dropdown-item>
            <el-dropdown-item>
                <icon-text icon="lnr-pencil" text="Sign Up" @click.native="showSignup"></icon-text>
            </el-dropdown-item>
        </el-dropdown-menu>

        <el-dialog :title="dialogTitle" :visible.sync="showDialog" :append-to-body="true">
            <auth-forms :dialogAction="dialogAction" @signup="showSignup" @login="showLogin" @close="showDialog = false"></auth-forms>
        </el-dialog>

    </el-dropdown>
</template>

<script>
    import {IconButton, IconText} from "~/components/common";
    import AuthForms from "~/components/auth/AuthForms";
    
    export default {
        name: "user-button",
        data: () => ({
            isAuthenticated: false,
            showDialog: false,
            dialogAction: ''
        }),
        computed:{
            dialogTitle(){ return (this.dialogAction === 'login') ? 'Login to your account' : 'Sign up for an account' }
        },
        methods:{
            showLogin(){
                this.showDialog = true;
                this.dialogAction = 'login';
            },
            showSignup(){
                this.showDialog = true;
                this.dialogAction = 'signup';
            }
        },
        components: {
            IconButton,
            IconText,
            AuthForms
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