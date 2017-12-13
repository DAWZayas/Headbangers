<template>
    <div>
        <el-tabs type="border-card">
            <el-tab-pane>
                <span slot="label">Liked</span>
            </el-tab-pane>
            <el-tab-pane label="Config">
                <span slot="label">Saved</span>
            </el-tab-pane>
            <el-tab-pane label="Config">
                <span slot="label">Assisting</span>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
import ConcertsList from '~/components/browse/ConcertsList'
import mapGetters from 'vuex'
export default {
    middleware: 'auth',
    computed: {
        ...mapGetters({userLiked: 'getUserLiked', userSaved: 'getUserSaved'}),
        liked () {

        },
        saved () {
            
        }
    }
}
</script>
