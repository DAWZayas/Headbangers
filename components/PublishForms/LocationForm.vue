<template>
    <div class="step-form">
        <h3>Location Info</h3>
        <el-form ref="form" :model="form" label-width="7em">
            <el-form-item label="Venue">
                <el-input placeholder="where it gonna take place"></el-input>
            </el-form-item>
    
            <el-form-item label="Description">
                <el-input type="textarea" placeholder="warnings, restrictions, all info you can tell us about the place"></el-input>
            </el-form-item>
            <el-form-item label="Street">
                <el-col :span="8">
                    <el-input placeholder="'skynyrd avenue'"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="Nº">
                <el-col :span="4">
                    <el-input placeholder=""></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="Country">
                <el-col :span="12">
                    <el-input placeholder="'north korea'"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="ZIP Code">
                <el-col :span="8">
                    <el-input placeholder=""></el-input>
                </el-col>
            </el-form-item>
        </el-form>
        <footer-buttons>
                <el-button @click="back">Back</el-button>
                <el-button type="primary" @click="done">Next</el-button>
        </footer-buttons>
    </div>
</template>
    
<script>
    import FooterButtons from './FooterButtons'
    export default {
        data() {
            return {
                form: {
                    name: "",
                    region: "",
                    date1: "",
                    date2: "",
                    delivery: false,
                    type: [],
                    resource: "",
                    desc: ""
                }
            };
        },
        methods: {
            done() {
                this.$emit("done");
            },
            back() {
                this.$emit("back");
            }
        },
        components: {FooterButtons}
    };
</script>

