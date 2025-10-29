<template>
  <AppSwitcher
    :model-value="isChecked"
    :is-disabled="false"
    :tab-index="1"
/>
</template>

// ...

<script setup lang="ts">
  import { ref } from 'vue';
  import {AppSwitcher} from '@/components/AppSwitcher.vue';

  const isChecked = ref(false);
</script>
