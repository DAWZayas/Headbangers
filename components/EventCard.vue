<template>
    <el-card>
        <img class="card-img" src="img/placeholder.png">
        <h3>{{title}}</h3>
        <div>
            <el-row>
                <el-col :span="12">
                    <icon-text icon="lnr-calendar-full" :text="date"></icon-text>
                    <icon-text icon="lnr-clock" :text="time"></icon-text>
                </el-col>
                <el-col :span="12">
                    {{ price }} €
                </el-col>
            </el-row>
            <el-row>
                <icon-text icon="lnr-map-marker" :text="location"></icon-text>
            </el-row>
            <el-row :gutter="10">
                <el-col :span="18">
                    <el-button type="primary" class="block-button" >
                        Ver más
                    </el-button>
                </el-col>
                <el-col :span="6" >
                    <el-button type="text" class="block-button" icon="el-icon-share"></el-button>    
                </el-col>
            </el-row>
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
        }
    }
</script>

<style lang='scss'>
    .el-card {
        width: 33%;
    }
    
    .el-card__body {
        padding: 1em;
    }
    
    .card-img {
        margin-top: -1em;
        margin-left: -1em;
        width: calc(100% + 2em);
    }
    .block-button{
        width: 100%;
    }

</style>
