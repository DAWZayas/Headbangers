<template>
    <div class="step-form">
        <h3>Location Info</h3>
            <div v-if="!manual">
                <location-google :data="data" @hide="$emit('toggleManual')" @back="back" @done="done"></location-google>
            </div>
            <div v-if="manual">
                <location-manual :data="data" @hide="$emit('toggleManual')" @back="back" @done="done"></location-manual>
            </div>
    </div>
</template>
    
<script>
import LocationManual from './LocationManual'
import LocationGoogle from './LocationGoogle'
export default {
    components: { LocationManual, LocationGoogle },
    props: ['data', 'manual'],
    created () {
        if(process.BROWSER_BUILD){
            window.scrollTo(0,0);
        }
    },
    methods: {
        done (location) {
            this.$emit('done', location)
        },
        back (location) {
            this.$emit('back', location)
        }
    }
}
</script>