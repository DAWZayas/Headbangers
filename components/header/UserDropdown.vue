<template>
    <el-dropdown class="user-dropdown" @command="handleAction">
        <div>
            <icon-button v-if="!isAuthenticated" icon="lnr-user"></icon-button>
            <avatar size="36" v-else :photo="userPhoto"></avatar>
        </div>
        <el-dropdown-menu v-if="isAuthenticated" slot="dropdown">
            <el-dropdown-item command="account">
                <icon-text icon="lnr-user" text="Account"></icon-text>
            </el-dropdown-item>
            <el-dropdown-item command="notifications">
                <icon-text icon="lnr-alarm" text="Notifications"></icon-text>
            </el-dropdown-item>
            <el-dropdown-item command="settings">
                <icon-text icon="lnr-cog" text="Settings"></icon-text>
            </el-dropdown-item>
            <el-dropdown-item command="logout">
                <icon-text icon="lnr-exit" text="Log Out"></icon-text>
            </el-dropdown-item>
        </el-dropdown-menu>
        <el-dropdown-menu v-else slot="dropdown">
            <el-dropdown-item command="login">
                <icon-text icon="lnr-enter" text="Log In"></icon-text>
            </el-dropdown-item>
        </el-dropdown-menu>
    </el-dropdown>
</template>

<script>
    import firebaseApp from '~/firebaseapp'
    import {IconButton, IconText, Avatar} from '~/components/common'
    import {mapGetters, mapMutations} from 'vuex'
    export default {
        data: () => ({
            showDialog: false,
            dialogAction: ''
        }),
        computed: {
            ...mapGetters({isAuthenticated: 'isAuthenticated', userPhoto: 'getUserPhoto'}),
            dialogTitle () { return (this.dialogAction === 'login') ? 'Login to your account' : 'Sign up for an account' }
        },
        methods: {
            ...mapMutations(['setUserData']),
            handleAction (command) {
                if (command === 'login') {
                    this.$router.push('/login')
                } else if (command === 'logout') {
                    firebaseApp.auth().signOut()
                    this.$router.push('/')
                    this.$notify({
                        message: 'Logged out',
                        type: 'info',
                        duration: 1000
                    })
                } else {
                    this.$router.push(command)
                }
            }
        },
        components: {
            IconButton,
            IconText,
            Avatar
        }
    }
</script>

<style>
    .user-dropdown {
        font-size: 1em;
    }
    
    .user-dropdown .icon-button {
        padding-top: 0.5em;
    }

</style>