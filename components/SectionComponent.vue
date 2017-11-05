<template>
  <div>
      <icon-text :icon="icon" :text="text"></icon-text>
      <event-card></event-card>
  </div>
</template>

<script>
    import IconText from "./IconText";
    import EventCard from "./EventCard";
        export default {
            name: "section-component",
            props: ["icon", "text"],
            components: {
                IconText,
                EventCard
            },
        }
</script>

<style lang="scss">
    @import "assets/styles/colors.scss";
    
</style>