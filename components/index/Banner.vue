<template>
    <div class="banner" :style="`background-image: url('${background}')`">
        <div style="margin-top:-4em">
            <p>Find the best concerts around you</p>
            <div id="search-bar">
                <input v-model="searchQuery" type="text" placeholder="Band, location, genre...">
                <button @click="search">
                    <span class="lnr lnr-magnifier"></span>
                </button>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        props: ['background'],
        data () {
            return {
                searchQuery: ''
            }
        },
        methods: {
            search () {
                this.$router.push('/search/' + this.searchQuery.replace(' ', '+'))
            }
        }        
    }
</script>

<style lang="scss">
    @import "assets/styles/breakpoints.scss";
    .banner {
        background-size: cover;
        background-position: bottom;
        padding: 2em;
        width: 100%;
        color: #fff;
        text-align: center;
        height: 55vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    
    .banner p {
        font-size: 1.2em;
        margin-top: 0;
    }
    
    @media (min-width: $break-sm) {
        .banner {
            padding: 4em;
            height: 60vh;
        }
        .banner p {
            font-size: 1.5em;
        }
    }

    @media (min-width: $break-lg-xl){
        .banner p{
            font-size: 2em;
        }
    }
    
    #search-bar {
        width: 100%;
        display: flex;
    }
    
    #search-bar input {
        font-size: 1em;
        flex-grow: 0.9;
        padding: 0.5em;
        border: 1px solid #ddd;
    }
    
    #search-bar button {
        font-size: 1em;
        flex-grow: 0.1;
        padding: 1em;
        background-color: #eee;
        color: #323232;
        border: 1px solid #ddd;
    }
    
    #search-bar button:hover {
        cursor: pointer;
    }
</style>