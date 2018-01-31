<template>
    <div class="step-form">
        <h3>Music Info</h3>
        
            <p>Playing bands</p>
            <el-form v-for="(band, i) in bands" :key="'band'+i" :rules="bandRules" :model="band" :ref="'bands-form'+i">
                <el-card class="band-card">
                    <el-button type="text" icon="el-icon-close" class="close-button" @click="removeBand(band)"></el-button>
                    <el-form-item label="Band Name" prop="name">
                        <el-input v-model="band.name"></el-input>
                    </el-form-item>
                    <el-form-item label="Short Description" prop="description">
                        <el-input v-model="band.description"></el-input >
                    </el-form-item>
                    <el-form-item label="Website / Social" prop="link">
                        <el-input v-model="band.link"></el-input>
                    </el-form-item>
                </el-card>
            </el-form>
        
            <el-button @click="addBand" icon="el-icon-plus" size="small">Add band</el-button>
        
            <el-form ref="genres-form" :model="this">
                <el-form-item label="Genres" prop="genres" :rules="[{required: true, message: 'Please add some genre'}]">
                    <el-select v-model="genres" multiple filterable placeholder="Select" class="full-width">
                        <el-option v-for="genre in genreList" :key="genre" :label="genre" :value="genre"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>

            <div class="form-buttons">
                <el-button @click="back">Back</el-button>
                <el-button type="primary" @click="done">Next</el-button>
            </div>  
    </div>
</template>

<script>
    import BandForm from './BandForm'
    import { mapGetters } from 'vuex'
    import { Band } from '~/schemas'
    export default {
        data () {
            return {
                bands: [],
                genres: [],
                bandRules: {
                    name: [{ required: true, message: 'Please enter the band name' }],
                    description: [{ required: true, message: 'Please enter band description' }],
                    link: [{ required: true, message: 'Please enter a website or social network' }]
                }
            }
        },
        computed: {
            ...mapGetters({ genreList: 'getGenreList' })
        },
        props: ['data'],
        methods: {
            addBand () {
                this.bands.push(new Band())
            },
            removeBand (band) {
                this.bands.splice(this.bands.indexOf(band), 1)
            },
            done () {
                this.$refs['genres-form'].validate(valid => valid ? this.$emit('done', { bands: this.bands, genres: this.genres }) : false)
            },
            back () {
                this.$emit('back')
            }
        },
        created () {
            Object.assign(this.genres, this.data.genres)
            Object.assign(this.bands, this.data.bands)
        },
        components: {
            BandForm
        }
    }
</script>

<style lang="scss">
    .band-card {
        margin-bottom: 0.5em;
        position: relative;
    }
    .band-card .el-form-item{
        margin-bottom: 0.3em;
    }
    .close-button {
        position: absolute;
        right: 0.75em;
        top: 0;
    }
</style>

