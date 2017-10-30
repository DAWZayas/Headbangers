<template>
    <nuxt-link id="logo" to="/">Headbangers</nuxt-link>
</template>
<script>
export default {
  name: "header-logo"
};
</script>
<style>
#logo {
  font-family: "Ruda";
  font-size: 1.25em;
  font-weight: bold;
  margin-top: 0.4em;
  text-decoration: none;
  color: #fff;
}

@media (min-width: 768px) {
  #logo {
    font-size: 2em;
    margin-top: 0;
  }
}
</style>