<template>
    <el-card>
        <img class="card-img" src="img/placeholder.png">
        <h3>{{title}}</h3>
        <div class="event-info">
            <el-row>
                <el-col :span="12">
                    <icon-text icon="lnr-calendar-full" :text="date"></icon-text>
                    <icon-text icon="lnr-clock" :text="time"></icon-text>
                </el-col>
                <el-col :span="12">
                    <div class="price-info">
                        {{ price }} €
                    </div>
                </el-col>
            </el-row>
            <el-row>
                <icon-text icon="lnr-map-marker" :text="location"></icon-text>
            </el-row>
    
            <div class="article-more">
                Ver más
            </div>
    
        </div>
    </el-card>
</template>

<script>
    import IconText from "./IconText";
    export default {
        data() {
            return {
                title: "Concierto en nosedonde",
                date: "01/02/2018",
                time: "22:00",
                location: "Sala Galileo, Madrid",
                price: "9,00"
            }
        },
        name: "event-card",
        components: {
            IconText
        },
        methods: {
            mas: () => console.log("mas")
        }
    }
</script>

<style lang='scss'>
    @import "assets/styles/colors.scss";
    .el-card {
        line-height: 2em;
    }
    
    .el-card h3 {
        margin: 0.5em;
        text-align: center;
    }
    
    .el-card:hover {
        cursor: pointer;
    }
    
    .el-card__body {
        padding: 1em;
    }
    
    .el-card .lnr {
        color: $gray;
        vertical-align: text-bottom;
    }
    
    .card-img {
        margin-top: -1em;
        margin-left: -1em;
        width: calc(100% + 2em);
    }
    
    .article-more {
        padding: 0.5em;
        text-align: center;
        background-color: $accentColor;
        color: #fff;
        margin-top: 1em;
    }
    
    .article-more:hover {
        background-color: $accentColorLight;
    }
    
    .event-info {
        color: $lightGray;
    }
    
    .price-info {
        font-size: 1.5em;
        text-align: center;
        line-height: 2.5em;
        color: $gray;
    }
</style>
