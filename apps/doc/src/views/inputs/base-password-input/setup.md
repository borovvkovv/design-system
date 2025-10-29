<template>
  <BasePasswordInput
    v-model="text"
    placeholder="Text here"
    label="Label"
    :size="Size.S"
    :disabled="false"
    required
    :is-correct
    :is-error
    :error-list
  />
</template>

// ...

<script setup lang="ts">
  import { ref, computed } from 'vue';
  import BasePasswordInput from '@/components/BasePasswordInput.vue';
  import { Size } from '@/common/utils/models';

  const text = ref<string>('');
  const isError = computed<boolean>(() => text.value === '');
  const isCorrect = computed<boolean>(() => text.value !== '');
  const errorList = computed<Array<string> | undefined>(() => isError.value ? ['Must be filled'] : undefined);

</script>
