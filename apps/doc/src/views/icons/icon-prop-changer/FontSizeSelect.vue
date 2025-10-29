<template>
  <SimpleSelect
    :model-value="sizeMode"
    :options="stringSizeOptions"
    :size="Size.XS"
    label="Выберите размер"
    @update:model-value="
      (newValue) => {
        sizeMode = newValue;
      }
    "
  />
</template>

<script lang="ts">
export default {
  name: 'FontSizeSelect',
};
</script>

<script setup lang="ts">
import { computed, type ComponentInstance } from 'vue';
import { Size } from '@libs/components/enums';
import type { ISelectItem } from '@libs/components/selects-types';
import { SimpleSelect } from '@libs/components/selects';
import { allIconsPropsNames, type AllIconsProps } from '../utils/models';

const selectedIconProps = defineModel<AllIconsProps>();
const props = defineProps<{
  selectedIconRef: ComponentInstance<any> | undefined;
}>();

const stringSizeOptions: ISelectItem<Size.M | Size.S>[] = Object.values<Size.M | Size.S>([Size.M, Size.S]).map(
  (size) => ({
    title: size.toString(),
    value: size,
  }),
);

const sizeMode = computed<ISelectItem<Size.M | Size.S> | undefined>({
  get() {
    return props.selectedIconRef
      ? {
          title: props.selectedIconRef.$props[allIconsPropsNames.size]?.toString() ?? '',
          value: props.selectedIconRef.$props[allIconsPropsNames.size] as Size.M | Size.S,
        }
      : undefined;
  },
  set(newValue) {
    selectedIconProps.value = {
      ...selectedIconProps.value,
      size: newValue?.value,
    };
  },
});
</script>
