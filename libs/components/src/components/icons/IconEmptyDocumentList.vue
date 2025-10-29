<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M28.5 4H9V44H39.5V15.5L28.5 4Z"
      stroke="currentColor"
      stroke-width="2"
      stroke-linejoin="round"
    />
    <path
      d="M28.5 4V15.5H39.5"
      stroke="currentColor"
      stroke-width="2"
      stroke-linejoin="round"
    />
    <path
      d="M17.5 34.5L31 24"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
    />
    <circle
      cx="24"
      cy="29"
      r="9"
      stroke="currentColor"
      stroke-width="2"
    />
  </svg>
</template>

<script setup lang="ts">
defineProps({
  size: {
    type: Number,
    required: false,
    default: 48,
  },
});
</script>
