<template>

  <div class="section">
      <icon-text class="section-title" :icon="icon" :text="text"></icon-text>
        <el-row :gutter="16">
            <el-col class="event-col" :key="num" v-for="num in 4" :xs="24" :sm="12" :md="8" :lg="6" :xl="6">
                <event-card></event-card>
            </el-col>
        </el-row>
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
    @import "assets/styles/breakpoints.scss";

    .section-title{
        font-size: 1.5em;
        margin-bottom: 1em;
    }
    
    .section + .section {
        margin-top: 1em;
    }
    
    .event-col {
        margin-bottom: 1em;
    }

</style>