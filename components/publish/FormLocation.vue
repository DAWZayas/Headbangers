<template>
    <div class="step-form">
        <h3>Location Info</h3>
            <div v-if="!manual">
                <location-google @hide="manual = true" @back="back" @done="done"></location-google>
            </div>
            <div v-if="manual">
                <location-manual @hide="manual = false" @back="back" @done="done"></location-manual>
            </div>
    </div>
</template>
    
<script>
import LocationManual from './LocationManual'
import LocationGoogle from './LocationGoogle'
export default {
    components: { LocationManual, LocationGoogle },
    data () {
        return {
            manual: false,
            country: ''
        }
    },
    props: ['data'],
    created () {
        if(process.BROWSER_BUILD){
            window.scrollTo(0,0);
        }
    },
    methods: {
        done (location) {
            this.$emit('done', location)
        },
        back () {
            this.$emit('back')
        }
    }
}
</script>