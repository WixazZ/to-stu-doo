<template>
  <div id="app">
    <router-view/>
  </div>

</template>

<script>

export default {
  name: 'App',
  data () {

  },
  beforeCreate () {
    document.querySelector('body').setAttribute('style', 'background:-sharpfff')
  },
  beforeUnmount () {
    document.querySelector('body').setAttribute('style', 'background:-sharp***')
  }

}
</script>

<style>
body {
  overflow-y: hidden;
  height: 100vh;
  background: rgba(74, 21, 193, 1) linear-gradient(180deg, rgba(74, 21, 193, 1) 0%, rgba(54, 112, 212, 1) 100%) no-repeat;
}
</style>
