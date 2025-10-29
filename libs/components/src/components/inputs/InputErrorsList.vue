<template>
  <ul
    v-if="errorList.length"
    class="text-size-7 text-red-3 mt-2 p-0"
  >
    <li
      v-for="(error, index) in errorList"
      :key="index"
      class="m-0 list-none p-0"
    >
      {{ error }}
    </li>
  </ul>
</template>

<script setup lang="ts">
defineProps<{
  errorList: string[];
}>();
</script>
