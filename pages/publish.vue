<template>
    <div>
        <el-steps :active="active" finish-status="success">
            <el-step title="Basics"></el-step>
            <el-step title="Location"></el-step>
            <el-step title="Musical"></el-step>
        </el-steps>
        <div v-if="active == 0">
            <basics-form @done="active++"></basics-form>
        </div>
        <div v-if="active == 1">
            <location-form @done="active++"></location-form>
        </div>
        <div v-if="active == 2">
            <musical-form @done="active++"></musical-form>
        </div>
        <div v-if="active == 3">
            <h3>Done!</h3>
        </div>
    </div>
</template>

<script>
    import { BasicsForm, LocationForm, MusicalForm } from '~/components/PublishForms'
    export default {
        data: () => ({
            active: 0
        }),
        components: {
            BasicsForm,
            LocationForm,
            MusicalForm
        }
    }
</script>
