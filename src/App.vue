<template>
  <div id="app">
    <router-view />
    <!-- <router-link to=""/> -->
  </div>
</template>

<script>

// import Admin from './admin.vue' 
export default {
  name: 'App',
  components: {
    // Admin
  }
}
</script>

<style>
*{
        box-sizing:border-box;
        padding:0px;
        margin:0px;  
    }
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
   
}
</style>
