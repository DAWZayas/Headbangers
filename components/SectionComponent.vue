<template>
  <div class="section">
      <icon-text class="icon-text" :icon="icon" :text="text"></icon-text>
        <el-row gutter="32">
            <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="2"><event-card></event-card></el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="2"><event-card></event-card></el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="2"><event-card></event-card></el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="2"><event-card></event-card></el-col>
        </el-row>
  </div>
</template>

<script>
    import IconText from "./IconText";
    import EventCard from "./EventCard";
        export default {
             data() {
            return {
                title: ['a','b','c','d']
            }
        },
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
    .section > .icon-text{
        font-size: 1.5em;
        margin-bottom: 1em;
    }
    .el-col{
        margin-bottom: 2em;
    }
    
</style>