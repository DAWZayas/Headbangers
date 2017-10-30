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
button {
  font-size: 1.5em;

  width: 1.5em;
  height: 1.5em;

  color: #fff;
  border: none;
  background-color: transparent;
}

#menu-button {
  font-size: 1.3em;

  width: 1.75em;
  height: 1.75em;
  margin-right: 1em;

  border: none;
  border-radius: 0.2em;
  background-color: #1f273f;
}

#menu-button:hover {
  cursor: pointer;

  background-color: #293352;
}
</style>