<template>
    <div>
        <section-component class="section" icon="lnr-star" text="Populares"></section-component>
        <section-component class="section" icon="lnr-pushpin" text="Sugerencias"></section-component>
    </div>
</template>


<script>
    import SectionComponent from "@/components/SectionComponent";
    export default {
        components: {SectionComponent}
    }
</script>

<style lang="scss">
@import "assets/styles/colors.scss";
    
</style>