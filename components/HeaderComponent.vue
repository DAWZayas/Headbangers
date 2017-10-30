<template>
        <header>
        <button id="menu-button" class="header-button">
            <i class="fa fa-bars" aria-hidden="true"></i>
        </button>
        <a href="index.html">Headbangers</a>

        <div class="float-right">

            <button class="header-button">
                <i class="fa fa-search" aria-hidden="true"></i>
            </button>

            <button class="header-button">
                <i class="fa fa-user-o" aria-hidden="true"></i>
            </button>
        </div>

    </header>
</template>
<script>
export default {
  name: "header-component"
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

.header-button {
  font-size: 1.5em;

  width: 1.5em;
  height: 1.5em;

  color: #fff;
  border: none;
  background-color: transparent;
}

.header-button + .header-button {
  margin-left: 0.5em;
}

.header-button:hover {
  cursor: pointer;
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