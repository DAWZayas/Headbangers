<template>
    <div class="form padding">
        <el-form  v-loading="loading" :model="profileModel" action="javascript:void(0)">
            <div class="text-center">
              <el-form-item prop="poster">
                <el-upload action="" accept="image/*" :disabled="!editable"  :on-change="fileAdded" :file-list="files" :show-file-list="false">
                    <avatar size="120" :picture="profileModel.photoURL"></avatar>
                    <el-button v-if="editable" class="margin-top">{{ (!profileModel.photoURL) ? 'Select' : 'Change'}} Picture</el-button>
                </el-upload>
              </el-form-item>
            </div>  
            <el-form-item label="Name:" class="no-margin">
                <el-input :readonly="!editable" placeholder="" v-model="profileModel.displayName" ></el-input>
            </el-form-item>
            <el-form-item label="Email:" class="no-margin">
                <el-input :readonly="!editable" placeholder="" v-model="profileModel.email"></el-input>
            </el-form-item>
            <div v-if="editable" class="space-between margin-top padding-top">
                <el-button @click="changePassword">Change Password</el-button>
                <el-button type="primary"  @click="saveProfile" native-type="submit">Save</el-button>
            </div>
            <div class="margin-top padding-top text-center">
                <el-button @click="logOut">Log Out</el-button>
            </div>
        </el-form>
    </div>
</template>
<script>
import firebaseApp from '~/firebaseapp'
import {Avatar} from '@/components/common'
import {mapActions, mapGetters, mapMutations} from 'vuex'
export default {
    data () {
        return {
            files: [],
            profileModel: {
                displayName: '',
                email: '',
                photoURL: '',
                uid: ''
            }
        }
    },
    watch: {
        profile (profile) {
            this.profileModel = {...profile}
        }
    },
    created () {
        this.profileModel = {...this.profile}
    },
    computed:{
            ...mapGetters({loading: 'getLoading'}),
    },
    methods:{
        ...mapActions(['updatePicture', 'updateName', 'updateEmail', 'updatePassword', 'signOut']),
        ...mapMutations(['setLoading']),
        fileAdded (file) {
            this.files = [file]
            this.profileModel.photoURL = URL.createObjectURL(file.raw);
        },
        saveProfile () {
            let changes = []
            if(this.profileModel.photoURL != this.profile.photoURL){
                changes.push(this.updatePicture({file: this.files[0].raw, path: `profilePictures/${this.profile.uid}.${this.files[0].name.split('.')[1]}`}))
            }
            if(this.profileModel.displayName != this.profile.displayName){
                changes.push(this.updateName(this.profileModel.displayName))
            }
            if(this.profileModel.email != this.profile.email){
                changes.push(this.askPassword('Change email').then(({value}) => {
                        return this.updateEmail({newEmail: this.profileModel.email, currentEmail: this.profile.email, currentPassword: value})
                    })
                )
            }
            if(changes.length !== 0){
                this.setLoading(true)
                Promise.all(changes)
                .then(() => { 
                    this.$notify({message: 'Profile updated', type: 'success', duration: 2000})
                    this.setLoading(false)
                })
                .catch((error) => { 
                    error.message && this.$notify({message: error.message, type: 'error', duration: 5000})
                    this.setLoading(false)
                })
            }
        },
        changePassword(){
            this.setLoading(true)
            let currentPassword
            this.askPassword('Change password').then((pass) => {
                currentPassword = pass.value
                return this.askPassword('New password', true)
            }).then(({value}) => this.updatePassword({currentEmail: this.profile.email, currentPassword, newPassword: value}))
            .then(() => {
                this.$notify({message: 'Password changed', type: 'success', duration: 2000})
                this.setLoading(false)
            })
            .catch((error) => {
                error && error.message && this.$notify({message: error.message, type: 'error', duration: 5000})
                this.setLoading(false)
            })
        },
        askPassword(title, isNew){
            return this.$prompt(`Please enter your${isNew ? ' new ' : ' '}password`, title, {
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancel',
                inputErrorMessage: 'Invalid Password',
                inputType: 'password'
            })
        },
        logOut () {
            this.$router.push('/')
            firebaseApp.auth().signOut().then(() => {
                this.$notify({
                    message: 'Logged out',
                    type: 'info',
                    duration: 2000
                })
                
            })
        }
    },
    props: ['profile', 'editable'],
    components: {Avatar}
}
</script>

