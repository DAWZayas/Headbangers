<template>
    <div class="index-genres">
        <el-row>
            <el-col v-for="genre in genres" :key="genre.text" :xs="8" :sm="4">
                <div class="square" :style="`background-color: ${genre.color}`">
                    <div class="square-content">
                        <img :src="iconsPath+genre.icon">
                        {{ genre.text }}
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                iconsPath: '/img/icons/genres/',
                genres: [{
                    icon: 'acoustic.svg',
                    text: 'Acoustic',
                    color: '#506da0'
                }, {
                    icon: 'rock.svg',
                    text: 'Rock',
                    color: '#8ea4cc'
                }, {
                    icon: 'classic.svg',
                    text: 'Classic',
                    color: '#5b76a5'
                }, {
                    icon: 'electronic.svg',
                    text: 'Electronic',
                    color: '#7797ce'
                }, {
                    icon: 'pop.svg',
                    text: 'Pop',
                    color: '#607daf'
                }, {
                    icon: 'rap.svg',
                    text: 'Rap',
                    color: '#6890d8'
                }]
            }
        },
        methods: {
            randomColor () {
                return 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')'
            }
        }
    }
</script>

<style lang="scss">
    @import "assets/styles/breakpoints.scss";
    
    .index-genres {
        width: 100%;
    }
    
    .square {
        color: #fff;
        width: 100%;
        padding-top: 93%;
        position: relative;
        transition: all 0.4s ;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
    }
    
    .square:hover {
        /*cursor: pointer;*/
        filter: saturate(2);
        opacity: 0.8;
    }
    
    .square-content {
        position: absolute;
        bottom: 0;
        text-align: center;
        width: 100%;
        padding: 1em;
    }

    .square-content img{
        width: 50%;
        display: block;
        margin: 0 auto 1em auto;
    }

    @media (min-width: $break-lg){
        .square{
            font-size: 1.2em;
        }
    }
</style>
