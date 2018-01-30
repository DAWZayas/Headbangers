<template>
    <div class="avatar" :style="{width: size+'px', height: size+'px', borderRadius: (size/2)+'px'}">
        <img :src="picture || '/img/user-icon.png'" :style="{width: size+'px'}">
    </div>
</template>
<script>
export default {
    props: ['picture', 'size']
}
</script>
<style>
    .avatar{
        overflow: hidden;
        border: 1px solid #ccc;
        margin: auto;
        background-color: #fff;
    }

    .avatar img{
        margin-bottom: 0.5em;
    }
</style>
