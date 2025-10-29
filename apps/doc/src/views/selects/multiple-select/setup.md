<template>
  <MultiSelect
    v-model:selected-options="selectedOptions"
    :options
    placeholder="Text here"
    :size="Size.S"
    label="Label"
    :disabled="false"
    :required="true"
    :is-loading="false"
    :is-error-loading="false"
    :is-error
    :error-list
  />
</template>

// ...

<script setup lang="ts">
  import { ref, computed } from 'vue';
  import MultiSelect from '@/components/MultiSelect.vue';
  import { Size } from '@/common/utils/models';

const selectedOptions = ref<Array<ISelectItem>>([]);

const options: Array<ISelectItem> = [
  { title: 'title1', value: 'value1' },
  { title: 'title2', value: 'value2' },
  { title: 'title3', value: 'value3' },
];

const isError = computed<boolean>(() => selectedOptions.value.length === 0);
const errorList = computed<Array<string> | undefined>(() => (isError.value ? ['Must be filled'] : undefined));

</script>
