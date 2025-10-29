<template>
  <TransitionChild
    as="template"
    enter="duration-300 ease-out"
    enter-from="opacity-0"
    enter-to="opacity-100"
    leave="duration-200 ease-in"
    leave-from="opacity-100"
    leave-to="opacity-0"
  >
    <div class="bg-black-1 fixed inset-0 bg-opacity-50" />
  </TransitionChild>
</template>

<script setup lang="ts">
import { TransitionChild } from '@headlessui/vue';
</script>
