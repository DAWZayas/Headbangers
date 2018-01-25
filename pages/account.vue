<template>
    <profile-form v-if="profile" :isNew="false" :profile="{displayName: this.profile.displayName, email: this.profile.email, photoURL: this.profile.photoURL, uid: this.profile.uid}" :editable="profile.providerData.filter(({providerId}) => providerId == 'facebook.com' || providerId == 'google.com').length == 0"></profile-form>
</template>
<script>
import {ProfileForm} from '@/components/auth'
import {mapGetters} from 'vuex'
export default {
    middleware: 'auth',
    computed:{
        ...mapGetters({profile: 'getUserProfile'})
    },
    components: {ProfileForm}
}
</script>
