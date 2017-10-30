<template>
        <header>
        <button id="menu-button" class="header-button">
            <i class="fa fa-bars" aria-hidden="true"></i>
        </button>
        
        <a href="index.html">Headbangers</a>

        <div class="float-right">

            <icon-button icon="fa-search" color="white"></icon-button>
            <icon-button icon="fa-user-o"></icon-button>

        </div>

    </header>
</template>
<script>
import IconButton from "./IconButton"
export default {
  name: "header-component",
  components: {IconButton}
};
</script>

<style>
header {
  position: fixed;

  width: 100%;
 /* height: 3.75em; */
  padding: 0.75em;

  background-color: #000b29;
}

header > * {
  float: left;
}

header > a {
  font-family: "Ruda";
  font-size: 1.25em;
  font-weight: bold;

  margin-top: 0.4em;

  text-decoration: none;

  color: #fff;
}

.float-right {
  float: right;
}

#menu-button{
    font-size: 1.3em;

    width: 1.75em;
    height: 1.75em;
    margin-right: 1em;

    border: none;
    border-radius: .2em;
    background-color: #1f273f;
}

#menu-button:hover{
    cursor: pointer;

    background-color: #293352;
}

@media (min-width: 768px){

    header > a{
        font-size: 2em;

        margin-top: 0;
    }
}
</style>