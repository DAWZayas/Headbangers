<template>
    <div>

        <el-tag class="tag" v-for="tag in tags" :key="tag" closable type="warning" @close="removeTag(tag)">{{tag}}</el-tag>
        <el-button v-if="!showTagInput" class="tag button-new-tag" size="small" @click="showTagInput = true" icon="el-icon-plus" >Add genre</el-button>
        <el-input v-else v-model="tagInput" autofocus="true" class="tag input-new-tag" size="small" autosize="true" @blur="addTag" @keyup.enter.native="addTag"></el-input>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                tags: [],
                tagInput: "",
                showTagInput: false
            }
        },
        methods: {
            addTag() {
                if (this.tagInput !== "") {
                    this.tags.push(this.tagInput)
                    this.tagInput = "" 
                    this.$emit("added", this.tagInput)
                }
                this.showTagInput = false
            },
            removeTag(tag) {
                this.tags.splice(this.tags.indexOf(tag), 1)
            }
        }
    }
</script>

<<style lang="scss">
    .tag {
        margin-right: 0.5em;
        margin-bottom: 0.5em;
    }
    
    .input-new-tag,
    .button-new-tag {
        width: 10em;
        vertical-align: bottom;
    }
</style>
