<template>
    <div>
    <div v-if="concert" ><h1>{{concert.info.title}}</h1></div>
    </div>
</template>
<script>

    import firebaseApp from '~/firebaseapp';
    import {mapActions, mapGetters} from 'vuex';

    export default {
        computed:{
            ...mapGetters({concert: 'getConcertDetails'})
        },
        created(){
            this.bindConcert(this.$route.params.id);
            //firebaseApp.database().ref('/concertsFull').child(this.id).on('value',function(concert){ this.concert = concert.val() }.bind(this))
        },
        beforeDestroy(){
            this.unbindConcert();
        },
        methods: {
            ...mapActions(['bindConcert', 'unbindConcert'])
        }

    }
</script>