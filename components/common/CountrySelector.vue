<template>
    <div class="country-select">
        <label>Country:</label>
        <el-select v-model="userCountry" filterable placeholder="Select">
            <el-option v-for="country in countries" :key="country.alpha2" :label="country.name" :value="country.alpha2"></el-option>
        </el-select>
    </div>
</template>
<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
export default {
    computed: {
        userCountry: {
            get () {
                return this.getUserCountry
            },
            set (country) {
                this.setUserCountry(country)
                this.setConcertsListRef()
                if(this.$route.name == 'browse'){
                    this.bindConcertsList()
                }
            }
        },
        ...mapGetters({countries: 'getCountries', getUserCountry: 'getUserCountry'})
    },
    methods: {
        ...mapActions(['bindConcertsList']),
        ...mapMutations(['setUserCountry', 'setConcertsListRef'])
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
        color: $grayLight;
    }
    .el-input__inner{
        font-size: 1.1em;
        color: #fff;
        background-color: transparent;
        border-bottom: none;
    }
}

</style>

