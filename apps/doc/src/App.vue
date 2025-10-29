<template>
  <RouterView />
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
</script>

<style lang="scss">
@import '@/assets/styles/tailwind';
@import '@/assets/styles/normalize';
@import '@/assets/styles/fonts';

html,
#app {
  height: 100%;
}

body,
input,
button,
label {
  font-family: Roboto, serif;
  font-style: normal;
  font-weight: 400;
}
</style>
