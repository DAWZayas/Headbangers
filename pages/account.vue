<template>
    <profile-form :isNew="false" :profile="profile" :editable="profile && profile.providerData.filter(({providerId}) => providerId == 'facebook.com' || providerId == 'google.com').length == 0"></profile-form>
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
