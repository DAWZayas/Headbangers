<template>
    <div class="icon-text">
        <span class="lnr" :class="icon" ></span>
        <span>{{text}}</span>
    </div>
</template>

<script>
    export default {
        props: ['icon', 'text']
    }
</script>

<style lang='scss'>
  .icon-text > .lnr{
      font-size: 1.5em;
      margin-right: 0.5em;
      vertical-align: -20%;
  }
</style>
