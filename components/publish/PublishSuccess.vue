<template>
    <div class="step-form">
        <div class="publish-success">
            <div>
                <span class="lnr lnr-checkmark-circle"></span>
                <p>The concert was published succesfully!</p>
                <el-button type="primary" @click="$router.push('concert/'+concertKey)">Show</el-button>
            </div>
        </div>
     </div>
</template>

<script>
export default {
    props: ['concertKey']
}
</script>

<style lang="scss">
    .publish-success{
        text-align: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin-top: 25%;
        .lnr{
            color: green;
            font-size: 5em;
        }
    }
</style>

