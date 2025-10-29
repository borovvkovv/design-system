<template>
  <div class="border-blueGrey-4 flex h-6 items-center justify-center rounded-full border px-2">
    <h3 :class="[isDisabled ? 'text-grey-2' : 'text-blue-2', 'text-size-7 font-medium']">
      {{ number }}
    </h3>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  number: string;
  isDisabled: boolean;
}>();
</script>
