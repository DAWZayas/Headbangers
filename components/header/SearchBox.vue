<template>
    <el-input placeholder="Search" v-model="searchQuery">  
        <!-- <button @click="search">
            <span class="lnr lnr-magnifier"></span>
        </button> -->
    </el-input>
</template>
<script>
export default {
    data () {
        return {
            searchQuery: ''
        }
    },
    methods: {
        search (){
            console.log('aqui'),
            this.$router.push('/search/' + searchQuery.replace(' ', '+'))
        }
    }
}
</script>