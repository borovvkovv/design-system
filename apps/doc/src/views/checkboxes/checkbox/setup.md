<template>
  <AppCheckbox
    :v-model="isChecked"
    label="label"
    :is-disabled="false"
    :is-error="false"
    :inverse-color="false"
    field-id="id"
    :tabindex="0"
  />
</template>

// ...

<script setup lang="ts">
  import { ref } from 'vue';
  import {AppCheckbox} from '@/components/AppCheckbox.vue';

  const isChecked = ref(false);
</script>
