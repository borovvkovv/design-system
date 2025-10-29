<template>
  <SwitcherButton
    v-model="model"
    :switcher
  />
</template>

// ...

<script setup lang="ts">
  import { ref } from 'vue';
  import {SwitcherButton} from '@libs/components/buttons/SwitcherButton.vue';

  const model = ref<string>();
  const switcher = {
    left: {
      text: 'Title 1',
      value: 'Value 1',
    },
    right: {
      text: 'Title 2',
      value: 'Value 2',
    },
  };
</script>
