<template>
    <div>
        <section-component class="section" icon="lnr-star" text="Populars"></section-component>
        <section-component class="section" icon="lnr-pushpin" text="Recommended"></section-component>
    </div>
</template>


<script>
    import SectionComponent from "@/components/index/SectionComponent";
    export default {
        components: {SectionComponent}
    }
</script>
