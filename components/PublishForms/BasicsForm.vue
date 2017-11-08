<template>
    <div>
        <h3>Basic Info</h3>
        <p>
            <span>Event Name</span>
            <el-input class="basic-form" placeholder="Event Name" v-model="input"></el-input>
         </p>
        
        <div class="block">
            <span class="basic-form">Choose Date</span>
            <el-date-picker v-model="value1" type="date" placeholder="Pick a day"></el-date-picker>
        </div>

        <p><el-button type="primary" @click="done">
            Next
        </el-button></p>
    </div>
</template>

<script>
    export default {
        name: "basic-form",

        data() {
            return {
                input: ''
            }
        },         

        data() {
            return {             
               value1: ''
            }
        },        

        methods: {
            done: function() {
                this.$emit("done")
            }
        }

    };

    

</script>