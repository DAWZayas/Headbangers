<template>
    <div class="country-select">
        <label>Country:</label>
        <el-select v-model="userCountry" filterable placeholder="Country">
            <el-option v-for="country in countries" :key="country.alpha2" :label="country.name" :value="country.alpha2"></el-option>
        </el-select>
    </div>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
    computed: {
        userCountry: {
            get () {
                return this.getUserCountry
            },
            set (country) {
                this.setUserCountry(country)
            }
        },
        ...mapGetters({countries: 'getCountryList', getUserCountry: 'getUserCountry'})
    },
    methods: {
        ...mapMutations(['setUserCountry'])
    }
}
</script>
<style <style lang="scss">
@import "assets/styles/colors.scss";
.country-select{
    background-color: $mainColorLessDark;
    display: flex;
    align-items: baseline;
    padding: 0.5em;
    label{
        color: $gray;
    }
    .el-input__inner{
        font-size: 1.1em;
        color: $grayLight;
        background-color: transparent;
        border-bottom: none;
    }
}

</style>

