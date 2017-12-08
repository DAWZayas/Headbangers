<template>

    <div class="filters">
        <div class="header">
            <button id="back-button" @click="hide"><icon-button icon="lnr-arrow-left"></icon-button></button>
        </div>
        <div class="filters-form">
            <h3>Price:</h3>
            <el-slider v-model="sliderPrice" :max="500" range></el-slider>
        </div>
    </div>
  
</template>
<script>
import IconButton from '~/components/common/IconButton'
export default {
    name: "filters",
    data () {
        sliderPrice: [0, 500]
    },
    components:{
        IconButton
    },
    methods: {
        hide () {
            this.$emit('hide')
        }
    }
}
</script>
<style lang="scss">
    @import "assets/styles/colors.scss";
    .filters{
        background-color: white;
        margin-bottom: 1em;
        #back-button{
            padding: .5 .25em;
            background-color: transparent;
            border: none;
        }
        .header{
            background-color: $mainColorLight;
            border-radius: .1em;
            box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
        }
        .filters-form{
            margin: 1em;
            .el-slider__bar{
                background-color: $mainColorLightest;
            }
            .el-slider__button{
                border-color: $mainColorLighter;

            }
        }
    }
    
</style>

