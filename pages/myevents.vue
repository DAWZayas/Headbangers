<template>
    <div>
        <el-tabs type="border-card">
            <el-tab-pane>
                <span slot="label"><icon-text icon="lnr-bookmark" text="Saved"></icon-text></span>
                <concerts-list :concerts="filterConcerts(savedConcerts)"></concerts-list>
            </el-tab-pane>
            <el-tab-pane>
                <span slot="label"><icon-text icon="lnr-checkmark-circle" text="Going"></icon-text></span>
                <concerts-list :concerts="filterConcerts(assistingConcerts)"></concerts-list>
            </el-tab-pane>
            <el-tab-pane>
                <span slot="label"><icon-text icon="lnr-bullhorn" text="Published"></icon-text></span>
                <concerts-list :concerts="filterConcerts(publishedConcerts)"></concerts-list>
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
        ...mapGetters({concertsList: 'getConcertsList', savedConcerts: 'getUserSaved', assistingConcerts: 'getUserAssisting', publishedConcerts: 'getUserPublished'}),
    },
    methods: {
        ...mapActions(['bindConcertsList', 'unbindConcertsList']),
        filterConcerts(keys) {
            return this.concertsList && keys && this.concertsList.filter(({key}) => keys.includes(key)).sort((a,b) => a.date - b.date)
        }
    },
    mounted () {
        this.bindConcertsList()
    },
    beforeDestroy () {
        this.unbindConcertsList()
    }
}
</script>
