<template>
    <div class="avatar" :style="{width: size+'px', height: size+'px', borderRadius: (size/2)+'px'}">
        <img :src="photo || '/img/user-icon.png'" :style="`width: ${size}`">
    </div>
</template>
<script>
export default {
    props: ['photo', 'size']
}
</script>
<style>
    .avatar{
        overflow: hidden;
        border: 1px solid #ccc;
        cursor: pointer;
    }

    .avatar img{
        width: 36px;
        margin-bottom: 0.5em;
    }
</style>
