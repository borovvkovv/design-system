<template>
  <div
    :class="[
      pageNumber === currentPage ? 'bg-grey-5 pointer-events-none rounded-sm' : ' cursor-pointer bg-white',
      'h-8 min-w-8',
      'flex shrink-0 grow-0 items-center justify-center',
    ]"
    @click="() => emit('click:page', pageNumber)"
  >
    {{ pageNumber }}
  </div>
</template>

<script setup lang="ts">
defineProps<{
  pageNumber: number;
  currentPage: number;
}>();

const emit = defineEmits<{
  (eventName: 'click:page', newPage: number): void;
}>();
</script>
