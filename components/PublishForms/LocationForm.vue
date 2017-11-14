<template>
    <div class="step-form">
        <h3>Location Info</h3>
        <el-form ref="form" :model="form">
            <el-form-item label="Venue Name">
                <el-input placeholder="where it gonna take place"></el-input>
            </el-form-item>
            <el-form-item label="Description">
                <el-input type="textarea" placeholder="warnings, restrictions, all info you can tell us about the place"></el-input>
            </el-form-item>
            <el-row :gutter="20">
                <el-col :span="13">
                    <el-form-item label="Street">
                        <el-input placeholder="skynyrd avenue"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :xs="5" :sm="3" :md="3" :lg="3" :xl="3">
                    <el-form-item label="Number">
                        <el-input placeholder="21"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item label="Country">
                        <el-input placeholder="south korea"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="13">
                    <el-form-item label="City">
                        <el-input placeholder="amsterdam"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :xs="8" :sm="5" :md="5" :lg="5" :xl="5">
                    <el-form-item label="ZIP Code">
                        <el-input placeholder="56984"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <div class="form-buttons">
            <el-button @click="back">Back</el-button>
            <el-button type="primary" @click="done">Next</el-button>
        </div>
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
        components: {
            FooterButtons
        }
    };
</script>

