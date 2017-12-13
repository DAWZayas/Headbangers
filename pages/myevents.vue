<template>
    <div>
        <el-tabs type="border-card">
            <el-tab-pane>
                <span slot="label"><icon-text icon="lnr-heart" text="Liked"></icon-text></span>
                <concerts-list :concerts="liked"></concerts-list>
            </el-tab-pane>
            <el-tab-pane label="Config">
                <span slot="label"><icon-text icon="lnr-bookmark" text="Saved"></icon-text></span>
                <concerts-list :concerts="saved"></concerts-list>
            </el-tab-pane>
            <el-tab-pane label="Config">
                <span slot="label"><icon-text icon="lnr-checkmark-circle" text="Assisting"></icon-text></span>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
import ConcertsList from '~/components/browse/ConcertsList'
import { mapGetters, mapActions } from 'vuex'
import IconText from '~/components/common/IconText'
export default {
    middleware: 'auth',
    components: {ConcertsList, IconText},
    computed: {
        ...mapGetters({likedConcerts: 'getUserLiked', savedConcerts: 'getUserSaved', concertsList: 'getConcertsList'}),
        liked () {
            return this.likedConcerts && Object.keys(this.likedConcerts).reduce((obj, concertKey) => {
                obj[concertKey] = this.concertsList[concertKey]
                return obj
            }, {})
        },
        saved () {
            return this.savedConcerts && Object.keys(this.savedConcerts).reduce((obj, concertKey) => {
                obj[concertKey] = this.concertsList[concertKey]
                return obj
            }, {})
        }
    },
    methods: {
        ...mapActions(['bindConcertsList', 'unbindConcertsList'])
    },
    mounted () {
        this.bindConcertsList()
    },
    beforeDestroy () {
        this.unbindConcertsList()
    }
}
</script>
