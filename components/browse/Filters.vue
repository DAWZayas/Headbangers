<template>

    <div class="filters">
        <div class="header">
            <button @click="hide"><icon-button icon="lnr-arrow-left"></icon-button></button>
        </div>
    </div>
  
</template>
<script>
import IconButton from "~/components/common/IconButton";
export default {
    name: "filters",
    components:{
        IconButton
    },
    methods: {
        hide(){
            this.$emit("hide")
        }
    }
}
</script>
<style lang="scss">
    @import "assets/styles/colors.scss";
    .header{
        background-color: $mainColorLight;
    }
    button {
        
    }

</style>

