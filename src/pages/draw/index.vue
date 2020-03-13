<template>
  <div id="app">
    <Draw></Draw>
  </div>
</template>

<script>
import Draw from './draw.vue'

export default {
  name: 'app',
  components: {
    Draw
  }
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
