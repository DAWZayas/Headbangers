<template>
    <el-radio-group v-model="selectedMode">
        <el-radio-button label="list">
            <icon-text icon="lnr-list" text="List"></icon-text>
        </el-radio-button>
        <el-radio-button label="map">
            <icon-text icon="lnr-map" text="Map"></icon-text>
        </el-radio-button>
        <el-radio-button label="calendar">
            <icon-text icon="lnr-calendar-full" text="Calendar"></icon-text>
        </el-radio-button>
    </el-radio-group>
    </div>
</template>

<script>
    import IconText from '~/components/IconText';
    export default {
        data() {
            return {
                selectedMode: 'list'
            }
        },
        components: {
            IconText
        }
    }
</script>

<style lang="scss">
    
</style>
