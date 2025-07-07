<template>
  <div id="app">
    <AccountManager />
  </div>
</template>

<script setup lang="ts">
import AccountManager from './components/AccountManager.vue'
</script>

<style>
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
  background-color: #f5f5f5;
}

#app {
  min-height: 100vh;
  padding: 20px 0;
}
</style>
