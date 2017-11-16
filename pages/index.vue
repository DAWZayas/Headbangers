<template>
    <div>
        <div class="banner" :style="`background-image: url('${bannerImg}')`">
            <div style="margin-top:-4em;">
                <p>Find the best concerts around you</p>
                <div id="search-bar">
                    <input type="text" placeholder="Band, location, genre...">
                    <button>
                                <span class="lnr lnr-magnifier"></span>
                            </button>
                </div>
            </div>
        </div>
        <index-genres></index-genres>
        <section>
            <el-row class="image-back-1">
                <el-col :xs="24" :sm="12" class="text-left padding bg-dark">
                    <h4>Browse concerts</h4>
                    <p>You can browse concerts by style, proximity or price.</p>
                    <el-button type="primary">Browse</el-button>
                </el-col>
                <el-col :xs="24" :sm="12">
                    <div class="section-img-1"></div>
                </el-col>
            </el-row>
        </section>
        <section class="padding">
            <el-row>
                <el-col :xs="24" :sm="12">
    .
                </el-col>
                <el-col :xs="24" :sm="12" class="text-right">
                    <h4>Do you have a band?</h4>
                    <p>Let people know about your next gigs.</p>
                    <el-button type="primary">Publish</el-button>
                </el-col>
            </el-row>
        </section>
    </div>
</template>


<script>
    import SectionComponent from "@/components/index/SectionComponent";
    import IndexGenres from "@/components/index/IndexGenres";
    export default {
        data() {
            return {
                bannerImg: '/img/banner.jpg'
            }
        },
        components: {
            SectionComponent,
            IndexGenres
        }
    }
</script>

<style lang="scss">
    @import "assets/styles/breakpoints.scss";
    .banner {
        background-size: cover;
        background-position: center;
        padding: 2em;
        width: 100%;
        color: #fff;
        text-align: center;
        height: 22em;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    
    .banner p {
        font-size: 1.2em;
        margin-top: 0;
    }
    
    @media (min-width: $break-sm) {
        .banner {
            padding: 4em;
            height: 25em;
        }
        .banner p {
            font-size: 1.5em;
        }
    }
    
    #search-bar {
        width: 100%;
        display: flex;
    }
    
    #search-bar input {
        font-size: 1em;
        flex-grow: 0.9;
        padding: 0.5em;
        border: 1px solid #ddd;
    }
    
    #search-bar button {
        font-size: 1em;
        flex-grow: 0.1;
        padding: 1em;
        background-color: #eee;
        color: #323232;
        border: 1px solid #ddd;
    }
    
    #search-bar button:hover {
        cursor: pointer;
    }

    .image-back-1{
        background-image: url('/img/section_1.jpg');
        background-size: cover;
        background-position: center;
        height: 18em;
    }

    .bg-dark{
        color: #dddddd;
        background: linear-gradient(to left, transparent, black);
        height: 100%;
    }
</style>
