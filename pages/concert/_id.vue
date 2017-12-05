<template>
    <div>
        <div v-if="concert" >
            <h1>{{concert.info.title}}</h1><br>
            <p>assisting: {{concert.assisting}}</p>
            <p>autor: {{concert.author}}</p>
            <p>bands: <br>
            <p v-for="band in concert.bands">description {{band.description}}, link {{band.link}}, name {{band.name}}</p>

            <p>genres: <span v-for="genre in concert.genres">{{genre}} </span></p><br>
            <p>{{concert.info.currency}}</p>
            <p>{{concert.info.date}}</p>
            <p>{{concert.info.description}}</p>
            <p>{{concert.info.poster}}</p>
            <p>{{concert.info.price}}</p>
            <p>{{concert.info.time}}</p>
            <p>{{concert.info.title}}</p><br>
            <p>{{concert.likes}}</p><br>
            <p>{{concert.location.city}}</p>
            <p>{{concert.location.country}}</p>
            <p>{{concert.location.descripton}}</p>
            <p>{{concert.location.number}}</p>
            <p>{{concert.location.street}}</p>
            <p>{{concert.location.venue}}</p><br><br>
        </div>
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