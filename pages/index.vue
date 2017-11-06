<template>
    <div>
        <section-component class="section" icon="lnr-bubble" text="Sugerencias"></section-component>
        <section-component class="section" icon="lnr-star" text="Populares"></section-component>
    </div>
</template>


<script>
    import SectionComponent from "@/components/SectionComponent";
    export default {
        components: {SectionComponent }
    }
</script>

<style lang="scss">
@import "assets/styles/colors.scss";

.section + .section{
    margin-top: 10em;
}
    
</style>