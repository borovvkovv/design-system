<template>
  <SimpleSelect
    v-model="selectedIconOption"
    :options="iconOptions"
    :size="Size.XS"
    :label
  />
</template>

<script lang="ts">
export default {
  name: 'IconSelect',
};
</script>

<script setup lang="ts">
import { computed } from 'vue';
import { Size } from '@libs/components/enums';
import type { ISelectItem } from '@libs/components/selects-types';
import { SimpleSelect } from '@libs/components/selects';
import { IconName } from '@libs/components/icons-enums';
import { IconComponents } from '@/views/icons/utils/models';

const modelValue = defineModel<IconName>();

defineProps<{ label: string }>();

const selectedIconOption = computed<ISelectItem<IconName> | undefined>({
  get() {
    return modelValue.value
      ? {
          title: modelValue.value.toString(),
          value: modelValue.value,
        }
      : undefined;
  },
  set(newValue) {
    modelValue.value = newValue?.value;
  },
});

const iconOptions: ISelectItem<IconName>[] = Object.keys(IconComponents)
  .sort()
  .map((iconName) => ({
    title: iconName,
    value: iconName as IconName,
  }));
</script>
