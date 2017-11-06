<template>
    <el-card>
        <img class="card-img" :src="img">
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
        </div>
        <hr>
        <div class="event-buttons">
            <button>
                <icon-text icon="lnr-heart" text="Like"></icon-text>
            </button>
            <button>
                <icon-text icon="lnr-bookmark" text="Save"></icon-text>
            </button>
            <button>
                <icon-text icon="lnr-bubble" text="Share"></icon-text>
            </button>
        </div>
    </el-card>
</template>

<script>
    import IconText from "./IconText";
    export default {
        data() {
            return {
                id: "01",
                img: "img/placeholder.png",
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
        }
    }
</script>

<style lang='scss'>
    @import "assets/styles/colors.scss";
    .el-card {
        line-height: 2em;
        transition: 0.2s;
        border: 1px solid #ddd;
    }
    
    .el-card h3 {
        margin: 0;
        text-align: center;
    }
    
    .el-card:hover {
        cursor: pointer;
        box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    }

    .el-card:hover .event-info .lnr{
        color: $accentColor;
    }

    .event-info .lnr{
        transition: 0.2s;
    }
    
    .el-card__body {
        padding: 0;
    }
    
    .el-card .lnr {
        color: $gray;
    }
    
    .card-img {
        width: 100%;
    }
    
    .article-more:hover {
        background-color: $accentColorLight;
    }
    
    .event-info {
        color: $lightGray;
        padding: 1em;
    }
    
    .price-info {
        font-size: 1.5em;
        text-align: center;
        line-height: 2.5em;
        color: $gray;
    }

    .event-buttons{
        display: flex;
        padding: 0.5em;
        
    }
    .event-buttons > button{
        border: none;
        background-color: transparent;
        cursor: pointer;    
        font-size: 0.8em;
        font-weight: bold;
        color: $lightGray;
        width: 100%;
    }

    .event-buttons > button:hover{
        color: #409EFF;
    }

    hr{
        margin:0 0 0 5%;
        width: 90%;
        border: 0;
        height: 1px;
        background: #bbb;
    }
</style>
