<template>
    <div class="list-container">
        <div class="cards padding">
            <event-card v-for="(concert ,i) in paginatedConcerts" :key="i" :concert="concert"></event-card>
        </div>
        <div class="separator"></div>
        <div class="full-width text-center margin-bottom">
            <el-pagination background layout="prev, pager, next" :page-size="pageSize" :total="concerts && concerts.length" :current-page.sync="currentPage"></el-pagination>
        </div>
    </div>
</template>

<script>
    import EventCard from '~/components/browse/EventCard'
    import {mapGetters} from 'vuex'
    export default {
        data () {
            return {
                currentPage: 1
            }
        },
        computed: {
            ...mapGetters ({pageSize: 'getPageSize'}),
            paginatedConcerts () { return this.concerts.slice((this.currentPage-1) * this.pageSize, (this.currentPage-1) * this.pageSize + this.pageSize) }
        },
        components: {
            EventCard
        },
        methods: {
            resetPage () {
                this.currentPage = 1
            }
        },
        props: ['concerts'],
    }
</script>

<style lang="scss">
    @import "assets/styles/breakpoints.scss";
    .cards {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        grid-auto-rows: 1fr;
        grid-gap: 1em;
    }
    .list-container{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        min-height: calc(100vh - 60px);

        .separatos{
            flex-grow: 2;
        }
    }
</style>
