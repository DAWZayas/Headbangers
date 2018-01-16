<template>
    <profile-form :isNew="false" :profile="userProfile" :editable="userProfile.providerData.filter(({providerId}) => providerId == 'facebook.com' || providerId == 'google.com').length == 0"></profile-form>
</template>
<script>
import {ProfileForm} from '@/components/auth'
import {mapGetters} from 'vuex'
export default {
    middleware: 'auth',
    computed:{
        ...mapGetters({userProfile: 'getUserProfile'})
    },
    components: {ProfileForm}
}
</script>
