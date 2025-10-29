<template>
  <div :class="['flex items-center justify-center gap-x-3']">
    <span :class="[styles.first, 'first bg-blue-6 h-3 w-3 rounded-xl']"></span>
    <span :class="[styles.second, 'second bg-blue-5 h-3 w-3 rounded-xl']"></span>
    <span :class="[styles.third, 'third bg-blue-2 h-3 w-3 rounded-xl']"></span>
  </div>
</template>

<script setup lang="ts">
import { useCssModule } from 'vue';

const styles = useCssModule();
</script>

<style module lang="scss">
@use '@comp/assets/styles/colors.module.scss' as *;

.first {
  animation: loading-first 1s linear infinite;
}

.second {
  animation: loading-second 1s linear infinite;
}

.third {
  animation: loading-third 1s linear infinite;
}

@keyframes loading-first {
  0% {
    background-color: $blue6;
  }
  33% {
    background-color: $blue2;
  }
  66% {
    background-color: $blue5;
  }
  100% {
    background-color: $blue6;
  }
}

@keyframes loading-second {
  0% {
    background-color: $blue5;
  }
  33% {
    background-color: $blue6;
  }
  66% {
    background-color: $blue2;
  }
  100% {
    background-color: $blue5;
  }
}

@keyframes loading-third {
  0% {
    background-color: $blue2;
  }
  33% {
    background-color: $blue5;
  }
  66% {
    background-color: $blue6;
  }
  100% {
    background-color: $blue2;
  }
}
</style>
