<template>
    <div class="login-form padding">
        <login-form v-if="action === 'login'" @signup="action = 'signup'" @error="setError"></login-form>
        <signup-form v-if="action === 'signup'" @login="action = 'login'" @error="setError"></signup-form>
        <el-alert v-if="error !== ''" :title="error" type="error" class="margin-top" @close="error = ''"></el-alert>
        <hr class="margin-top margin-bottom">
        <div class="servicesButtons">
            <button class="loginBtn loginBtn--facebook" @click="loginWithFacebook">Login with Facebook</button>
            <button class="loginBtn loginBtn--google" @click="loginWithGoogle">Login with Google</button>
        </div>
    </div>
</template>

<script>
import firebase from 'firebase';
import firebaseApp from '~/firebaseapp';
import {LoginForm, SignupForm} from '~/components/auth';
import { mapGetters } from 'vuex';
export default {
    data(){
        return {
            action: 'login',
            error: ''
        }
    },
    computed: {
        ...mapGetters({isAuthenticated: 'isAuthenticated'})
    },
    created(){
        setTimeout((() => {
            if(this.isAuthenticated){
                this.$router.push('/')
            }
        }).bind(this), 1000)
    },
    methods: {
        loginWithFacebook(){
            firebaseApp.auth().signInWithRedirect(new firebase.auth.FacebookAuthProvider());
            firebaseApp.auth().getRedirectResult()
            .then(() => this.$router.push('/'))
            .catch((error) => this.error = error);
        },
        loginWithGoogle(){
            firebaseApp.auth().signInWithRedirect(new firebase.auth.GoogleAuthProvider());
            firebaseApp.auth().getRedirectResult()
            .then(() => this.$router.push('/'))
            .catch((error) => this.error = error);
        },
        setError(error){
            this.error = error.message;
        }
    },
    components: { LoginForm, SignupForm }
}   
</script>

<style lang="scss">
    @import "assets/styles/breakpoints.scss";

    @media (min-width: $break-sm) {
        .login-form {
            width: 75%;
            margin: 0 auto;
        }
    }
    
    @media (min-width: $break-lg) {
        .login-form {
            width: 50%;
            margin: 0 auto;
        }
    }

    .servicesButtons{
        display: flex;
    }

    @media(min-width: $break-sm) and (max-width: $break-md){
        .servicesButtons{
            flex-wrap: wrap;
        }
    }
    @media(max-width: 560px){
        .servicesButtons{
            flex-wrap: wrap;
        }
    }
    /* Shared */
    
    .loginBtn {
        position: relative;
        width: 98%;
        margin: 0.2em;
        padding: 0 15px 0 46px;
        border: none;
        text-align: left;
        line-height: 34px;
        white-space: nowrap;
        border-radius: 0.2em;
        font-size: 16px;
        color: #FFF;
    }
    .loginBtn:hover{
        cursor:pointer;
    }
    .loginBtn:before {
        content: "";
        box-sizing: border-box;
        position: absolute;
        top: 0;
        left: 0;
        width: 34px;
        height: 100%;
    }
    
    .loginBtn:focus {
        outline: none;
    }
    
    .loginBtn:active {
        box-shadow: inset 0 0 0 32px rgba(0, 0, 0, 0.1);
    }
    
    
    /* Facebook */
    
    .loginBtn--facebook {
        background-color: #4C69BA;
    }
    
    .loginBtn--facebook:before {
        border-right: #364e92 1px solid;
        background: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/14082/icon_facebook.png') 6px 6px no-repeat;
    }
    
    .loginBtn--facebook:hover,
    .loginBtn--facebook:focus {
        background-color: #5B7BD5;
    }
    
    
    /* Google */
    
    .loginBtn--google {
        /*font-family: "Roboto", Roboto, arial, sans-serif;*/
        background: #DD4B39;
    }
    
    .loginBtn--google:before {
        border-right: #BB3F30 1px solid;
        background: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/14082/icon_google.png') 6px 6px no-repeat;
    }
    
    .loginBtn--google:hover,
    .loginBtn--google:focus {
        background: #E74B37;
    }
</style>