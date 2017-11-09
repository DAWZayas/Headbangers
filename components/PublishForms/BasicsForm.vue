<template>
    <div class="step-form">
        <h3>Basic Info</h3>
    
        <el-form ref="form" :model="form" label-width="7em">
    
            <el-form-item label="Event Name">
                <el-input placeholder="name" v-model="form.input"></el-input>
            </el-form-item>
    
            <el-form-item label="Choose Date">
                <el-date-picker v-model="form.value1" type="date" placeholder="Pick a day"></el-date-picker>
            </el-form-item>
    
            <el-form-item label="Description">
                <el-input type="textarea" v-model="form.desc"></el-input>
            </el-form-item>
    
            <el-form-item label="Price">
                <el-input-number v-model="form.num1" controls-position="right" @change="handleChange" :min="1" :max="100000"></el-input-number>
            </el-form-item>
    
            <el-form-item label="Picture">
                <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview" :on-remove="handleRemove" multiple :limit="3" :on-exceed="handleExceed" :file-list="fileList">
                    <el-button size="small" type="primary">Click to upload</el-button>
                    <div slot="tip" class="el-upload__tip">jpg/png files with a size less than 500kb</div>
                </el-upload>
            </el-form-item>
        </el-form>
        <footer-buttons>
            <el-button type="primary" @click="done">Next</el-button>
        </footer-buttons>
    </div>
</template>

<script>
    import FooterButtons from './FooterButtons'
    export default {
        name: "basic-form",
    
        data() {
            return {
                form: {
                    input: '',
                    value1: '',
                    desc: '',
                    num1: 1,
                    fileList: [{}]
                }
            }
        },
    
        methods: {
            done() {
                this.$emit("done")
            }
        },
        components: {
            FooterButtons
        }
    };
</script>