<template>
    <div v-loading="loading">
    </div>
</template>
<script>
import {mapActions, mapGetters} from 'vuex'
export default {
    fetch ({store, route}) {
        store.dispatch('bindConcert', route.params.id)
        return store.dispatch('bindAuth')
    },
    methods: {
        ...mapActions(['bindConcert', 'unbindConcert'])
    },
    computed: {
        ...mapGetters({concert: 'getConcertDetails', isAuthenticated: 'isAuthenticated', userProfile: 'getUserProfile', loading: 'getLoading'})
    },
    mounted () {
        if(this.concert == null || this.concert.author !== this.userProfile.uid){
            console.log('wrong')
        }
        /*
        this.checkConcertExists(this.$route.params.id).then(exists => !exists && this.$router.push('/error'))
        this.bindConcert(this.$route.params.id)
        window.onNuxtReady( () => {
            if(this.concert.author !== this.userProfile.uid) this.$router.push('/error')
        })
        */
    },
    beforeDestroy () {
        this.unbindConcert()
    }
}
</script>

