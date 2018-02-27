<template>
    <div>
        <el-tabs type="border-card">
            <el-tab-pane>
                <span slot="label"><icon-text icon="lnr-bookmark" text="Saved"></icon-text></span>
                <concerts-list empty-message="You don't have saved concerts" :concerts="saved"></concerts-list>
            </el-tab-pane>
            <el-tab-pane>
                <span slot="label"><icon-text icon="lnr-checkmark-circle" text="Going"></icon-text></span>
                <concerts-list empty-message="You're not going to any concert" :concerts="assisting"></concerts-list>
            </el-tab-pane>
            <el-tab-pane>
                <span slot="label"><icon-text icon="lnr-bullhorn" text="Published"></icon-text></span>
                <concerts-list empty-message="You have no published concerts" :editable="true" :concerts="published"></concerts-list>
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
        ...mapGetters({concertsList: 'getAllConcerts', savedConcerts: 'getUserSaved', assistingConcerts: 'getUserAssisting', publishedConcerts: 'getUserPublished'}),
        saved () { return this.filterConcertsByKey(this.concertsList, this.savedConcerts) },
        assisting () { return this.filterConcertsByKey(this.concertsList, this.assistingConcerts) },
        published () { return this.filterConcertsByKey(this.concertsList, this.publishedConcerts) }
    },
    methods: {
        ...mapActions(['bindAllConcerts', 'unbindAllConcerts']),
        filterConcertsByKey: (concerts, keys) => {
            return concerts && keys && concerts.filter(({key}) => keys.includes(key)).sort(this.sortByDate)
        },
        sortByDate: (a, b) => a.date - b.date
    },
    mounted () {
        this.bindAllConcerts()
    },
    beforeDestroy () {
        this.unbindAllConcerts()
    }
}
</script>
