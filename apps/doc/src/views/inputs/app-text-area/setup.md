<template>
  <AppTextArea
    v-model="text"
    placeholder="Text here"
    label="Label"
    :rows="2"
    :is-disabled="false"
    required
    :is-error
    :error-list
  />
</template>

// ...

<script setup lang="ts">
  import { ref, computed } from 'vue';
  import {AppTextArea} from '@/components/AppTextArea.vue';

  const text = ref<string>('');
  const isError = computed<boolean>(() => text.value === '');
  const errorList = computed<Array<string> | undefined>(() => isError.value ? ['Must be filled'] : undefined);
</script>
