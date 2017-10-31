<template>
    <button id="menu-button">
        <i class="fa fa-bars" aria-hidden="true"></i>
    </button>
</template>
<script>
export default {
  name: "menu-button"
};
</script>
<style>
#menu-button {
  font-size: 1.3em;
  width: 1.75em;
  height: 1.75em;
  border: none;
  border-radius: 0.2em;
  background-color: #1f273f;
  color: #fff;
}

#menu-button:hover {
  cursor: pointer;
  background-color: #293352;
}
</style>