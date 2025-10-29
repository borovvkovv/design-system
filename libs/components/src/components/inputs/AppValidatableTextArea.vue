<template>
  <AppTextArea
    v-bind="props"
    v-model="modelValue.$model"
    :error-list="modelValue.$errors.map((error) => unref(error.$message))"
    :is-error="modelValue.$error"
  />
</template>

<script setup lang="ts">
import type { IAppValidatableTextAreaProps } from '@comp/components/inputs/utils/models';
import AppTextArea from '@comp/components/inputs/AppTextArea.vue';
import { unref } from 'vue';

const props = defineProps<IAppValidatableTextAreaProps>();
</script>
