<template>
  <SimpleSelect
    :model-value="fontWeightOption"
    :options="fontWeightOptions"
    :size="Size.XS"
    label="Выберите размер"
    @update:model-value="
      (newValue) => {
        fontWeightOption = newValue;
      }
    "
  />
</template>

<script setup lang="ts">
import { computed, type ComponentInstance } from 'vue';
import type { ISelectItem } from '@libs/components/selects-types';
import { SimpleSelect } from '@libs/components/selects';
import { allIconsPropsNames, type AllIconsProps } from '../utils/models';
import { Size } from '@libs/components/enums';

const selectedIconProps = defineModel<AllIconsProps>();
const props = defineProps<{
  selectedIconRef: ComponentInstance<any> | undefined;
}>();

const fontWeightOptions: ISelectItem<number>[] = [100, 200, 300, 400, 500, 600, 700, 800, 900].map((wightNumber) => ({
  title: wightNumber.toString(),
  value: wightNumber,
}));

const fontWeightOption = computed<ISelectItem<number> | undefined>({
  get() {
    console.log(props.selectedIconRef.$props[allIconsPropsNames.fontWeight]);
    return props.selectedIconRef
      ? {
          title: props.selectedIconRef.$props[allIconsPropsNames.fontWeight]?.toString() ?? '',
          value: props.selectedIconRef.$props[allIconsPropsNames.fontWeight] as number,
        }
      : undefined;
  },
  set(newValue) {
    selectedIconProps.value = {
      ...selectedIconProps.value,
      fontWeight: newValue?.value,
    };
  },
});
</script>
