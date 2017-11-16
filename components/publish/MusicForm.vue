<template>
    <div class="step-form">
        <h3>Bands Info</h3>
        <p>Now add the playing bands:</p>
        <band-card v-for="(band, index) in bands" :key="band.name" :band="{name: band.name, description: band.description, link: band.link}" @remove="removeBand(band)"></band-card>
        <el-button @click="showBandDialog = true" icon="el-icon-plus" size="small">Add band</el-button>
    
        <p>And finally add the genres:</p>
        <genre-tags @added="addedGenre"></genre-tags>
    
        <div class="form-buttons">
            <el-button @click="back">Back</el-button>
            <el-button type="primary" @click="done">Next</el-button>
        </div>
    
        <el-dialog v-if="showBandDialog" :visible.sync="showBandDialog" append-to-body title="Add band">
            <band-form @confirm="addedBand" @cancel="showBandDialog = false"></band-form>
        </el-dialog>
    
    
    </div>
</template>

<script>
    import BandCard from './BandCard'
    import BandForm from './BandForm'
    import GenreTags from './GenreTags'
    
    export default {
        data() {
            return {
                bands: [],
                genres: [],
                showBandDialog: false,
                showTagInput: false
            }
        },
        methods: {
            addedBand(band) {
                this.bands.push(band)
                this.showBandDialog = false
            },
            removeBand(band) {
                this.bands.splice(this.bands.indexOf(band), 1)
            },
            addedGenre(genre) {
                this.genres.push(genre);
            },
            done() {
                this.$emit("done", {
                    bands: this.bands,
                    genres: this.genres
                });
            },
            back() {
                this.$emit("back")
            }
        },
        components: {
            BandCard,
            BandForm,
            GenreTags
        }
    }
</script>
