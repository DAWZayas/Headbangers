<template>
    <div v-loading="loading">
        <concert-edit v-if="concert" :concert="concert"></concert-edit>
    </div>
</template>
<script>
import {mapActions, mapGetters} from 'vuex'
import { ConcertEdit } from '~/components/publish'
export default {
    components: { ConcertEdit },
    methods: {
        ...mapActions(['bindConcert', 'unbindConcert', 'bindAuth']),
    },
    computed: {
        ...mapGetters({concert: 'getConcertDetails', isAuthenticated: 'isAuthenticated', userProfile: 'getUserProfile', loading: 'getLoading'})
    },
    created () {
        this.bindAuth().then(() => {
            this.bindConcert(this.$route.params.id).then((exists) => {
                if(!this.isAuthenticated || !exists || this.concert.author !== this.userProfile.uid){
                    this.$router.push('/error')
                }
            })
        })
    },
    beforeDestroy () {
        this.unbindConcert()
    }
}
</script>

