<template>
    <button>
        <i class="fa" v-bind:class="icon" aria-hidden="true" ></i>
    </button>
</template>
<script>
    export default {
        name: "icon-button",
        props: ["icon"]
    };
</script>
<style>
    button {
    font-size: 1.5em;

    width: 1.5em;
    height: 1.5em;

    color: #fff;
    border: none;
    background-color: transparent;
    }

    button + button {
    margin-left: 0.5em;
    }

    button:hover {
    cursor: pointer;
    }
</style>