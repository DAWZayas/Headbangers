<template>
    <div>
        <div v-if="isLoading">
            <splash></splash>
        </div>
        <div>
            <banner :background="bannerImg"></banner>
            <top-genres></top-genres>
            <gradient-section background="/img/section_1.jpg" title="Browse concerts" text="You can browse according to date, price or proximity." button-text="Browse" target="/browse" alignment="left"></gradient-section>
            <gradient-section background="/img/section_2.jpg" title="Do you have a band?" text="Let the people know about your next gigs." button-text="Publish" target="/publish" alignment="right"></gradient-section>
            <gradient-section background="/img/section_3.jpg" title="Create an account" text="Create an account to save your favorite concerts or publish new ones." button-text="Sign Up" target="/" alignment="center"></gradient-section>
        </div>
    </div>
</template>


<script>
    import SectionComponent from "~/components/index/SectionComponent";
    import Splash from "~/components/Splash"
    import {
        TopGenres,
        Banner,
        GradientSection
    } from "~/components/index";
    export default {
        data() {
            return {
                bannerImg: '/img/banner.jpg',
                isLoading: true
            }
        },
        components: {
            SectionComponent,
            TopGenres,
            Banner,
            GradientSection,
            Splash
        },
        beforeCreate(){
            setTimeout(() => {
                this.isLoading = false;
            }, 2000)
        }
    }
</script>

<style lang="scss">
    @import "assets/styles/breakpoints.scss";
</style>
