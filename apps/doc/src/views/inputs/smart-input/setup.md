<template>
  <SmartInput
    v-model="option"
    :options="options"
    :title="option?.title"
    placeholder="Text here"
    label="Label"
    :size="Size.S"
    :icon-left="IconName.IconArrowRight"
    :disabled="false"
    required
    :is-error
    :error-list
  />
</template>

// ...

<script setup lang="ts">
  import { ref, computed } from 'vue';
  import SmartInput from '@/components/SmartInput.vue';
  import { IconName, ISelectItem } from '@/components/utils/models';
  import { Size } from '@/common/utils/models';

  const option = ref<ISelectItem | undefined>();

  const options: Array<ISelectItem> = [
      { title: 'title1', value: 'value1' },
      { title: 'title2', value: 'value2' },
      { title: 'title3', value: 'value3' },
  ];

  const isError = computed<boolean>(() => option.value === undefined);
  const errorList = computed<Array<string> | undefined>(() => isError.value ? ['Must be filled'] : undefined);

</script>
