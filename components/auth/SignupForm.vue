<template>
    <el-form :model="this" ref="signupForm" :rules="rules">
        <h4 class="text-center"> Sign up for an account </h4>
        <el-form-item label="Full Name" prop="name" class="margin-bottom">
            <el-input placeholder="" v-model="name"></el-input>
        </el-form-item>
        <el-form-item label="Email" prop="email" class="margin-bottom">
            <el-input placeholder="" v-model="email"></el-input>
        </el-form-item>
        <el-form-item label="Password" prop="password" class="margin-bottom">
            <el-input type="password" placeholder="" v-model="password"></el-input>
        </el-form-item>
        <el-form-item label="Confirm Password" prop="passwordConfirm" class="margin-bottom">
            <el-input type="password" placeholder="" v-model="passwordConfirm"></el-input>
        </el-form-item>
        <el-form-item class="full-width text-center margin-top">
            <el-button @click="createAccount" type="primary">Sign up</el-button>
        </el-form-item>
        <a class="link" @click="showLogin">Login to an existing account</a><br>
    </el-form>  
</template>
<script>
import firebaseApp from '~/firebaseapp'
export default {
    data () {
        return {
            name: '',
            email: '',
            password: '',
            passwordConfirm: '',
            error: '',
            rules: {
                name: [
                    { required: true, min: 6, message: 'Enter a valid name', trigger: 'blur' }
                ],
                email: [
                    { required: true, type: 'email', message: 'Enter a valid email', trigger: 'blur' }
                ],
                password: [
                    { required: true, min: 6, message: 'Enter a valid password (6 characters)', trigger: 'blur' }
                ],
                passwordConfirm: [
                    //{ required: true, min: 6, message: 'Enter a confirmation password', trigger: 'blur' },
                    { validator: this.passwordsMatch, message: 'Passwords don\'t match' }
                ]
            }
        }
    },
    methods: {
        showLogin () {
            this.$emit('login')
        },
        createAccount () {
            if (this.name === '' || this.email === '' || this.password === '' || this.passwordConfirm === '') {
                this.emitError('Please fill all the fields')
            } else if (this.password !== this.passwordConfirm) {
                this.emitError('The passwords don\'t match')
            } else {
                firebaseApp.auth().createUserWithEmailAndPassword(this.email, this.password)
                    .then((user) => {
                        user.updateProfile({displayName: this.name})
                        this.$message({
                            message: 'Account created succesfully',
                            type: 'success'
                        })
                        this.$router.push('/account')
                    })
                    .catch((error) => {
                        this.emitError(error.message)
                    })
            }
        },
        passwordsMatch (rule, value, cb) {
            this.password === this.passwordConfirm ? cb() : cb(new Error('The passwords don\'t match'))
        },
        emitError (message) {
            this.$emit('error', { message })
        }
    }
}
</script>