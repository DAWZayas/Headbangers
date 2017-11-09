<template>
    <div class="step-form">
        <h3>Bands Info</h3>
        <p>Now add the playing bands:</p>
        <el-form>
            <band-card v-for="band in bands" :key="band.name" :name="band.name" :description="band.description" :link="band.link"></band-card>
            <el-form-item>
                <el-button @click="showBandDialog = true" icon="el-icon-plus">Add Band</el-button>
            </el-form-item>
            <el-form-item>
                <el-button @click="back">Back</el-button>
                <el-button type="primary" @click="done">Publish</el-button>
            </el-form-item>
        </el-form>
        <el-dialog v-if="showBandDialog" :visible.sync="showBandDialog" append-to-body  title="Add band">
            <band-form @confirm="addedBand" @cancel="showBandDialog = false" ></band-form>
        </el-dialog>
    </div>
</template>

<script>
    import BandCard from './BandCard'
    import BandForm from './BandForm'
    export default {
        data() {
            return {
                bands: [],
                showBandDialog: false
            }
        },
        methods: {
            addedBand(band) {
                console.log(this.bands);
                this.bands.push(band)
                this.showBandDialog = false
            },
            done() {
                this.$emit("done")
            },
            back() {
                this.$emit("back")
            }
        },
        components: {
            BandCard,
            BandForm
        }
    }
</script>