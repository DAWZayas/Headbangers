<template>
        <el-form ref="authForm">
            <h4 class="text-center"> Login to your account </h4>
            <el-form-item label="Email" class="no-margin">
                <el-input placeholder="" v-model="email"></el-input>
            </el-form-item>
            <el-form-item label="Password" class="margin-bottom">
                <el-input type="password" placeholder="" v-model="password"></el-input>
            </el-form-item>
            <el-form-item class="full-width text-center margin-top">
                <el-button type="primary" @click="loginWithEmail">Login</el-button>
            </el-form-item>
            <a class="link" @click="showSignup">Create an account</a><br>
            <a class="link" @click="restorePassword">Forgot my password</a>  
        </el-form>
</template>
<script>
import firebaseApp from '~/firebaseapp'
import {mapActions} from 'vuex'
export default {
    data () {
        return {
            email: '',
            password: '',
            error: ''
        }
    },
    methods: {
        ...mapActions(['signIn', 'sendPasswordEmail']),
        showSignup () {
            this.$emit('signup')
        },
        loginWithEmail () {
            if (this.email === '' || this.password === '') {
                this.emitError('Please enter an email and password')
            } else {
                this.signIn({email: this.email, password: this.password})
                .then((user) => {
                    this.$message({
                        message: 'Logged in succesfully',
                        type: 'success'
                    })
                    this.$router.push('/')
                })
                .catch((error) => {
                    if (error.code === 'auth/wrong-password') {
                        this.emitError('Invalid password')
                    } else {
                        this.emitError(error.message)
                    }
                })
            }
        },
        restorePassword () {
            this.$prompt('Please enter your email', 'Password recovery')
            .then(({value}) => this.sendPasswordEmail(value)
                            .then(() => this.$alert('An email was sent to you with instructions to restore your password', 'Email sent'))
                            .catch((error) => error && this.$notify({message: error.message, type: 'error', duration: 5000}))
            ) 
        },
        emitError (message) {
            this.$emit('error', { message })
        }
    }
}
</script>