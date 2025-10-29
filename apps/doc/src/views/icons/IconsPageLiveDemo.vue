<template>
  <div>
    <h3 class="mb-6">Выбор иконки</h3>
    <div class="grid grid-cols-2 gap-5">
      <div>
        <SimpleSelect
          :model-value="selectedIconOption"
          :options="iconOptions"
          :size="Size.XS"
          label="Выберите иконку"
          class="mb-12"
          @update:model-value="
            (newValue) => {
              selectedIconOption = newValue;
              selectedIconProps = getIconProps(newValue?.value);
            }
          "
        />
        <h3 class="mb-6">Пропсы</h3>
        <div class="flex flex-col gap-y-5">
          <FontWeightSelect
            v-if="selectedIconRef?.$props.hasOwnProperty(allIconsPropsNames.fontWeight)"
            v-model="selectedIconProps"
            :selected-icon-ref="selectedIconRef"
          />
          <FontSizeSelect
            v-if="
              selectedIconRef?.$props.hasOwnProperty(allIconsPropsNames.size) &&
              typeof selectedIconRef?.$props[allIconsPropsNames.size] === 'string'
            "
            v-model="selectedIconProps"
            :selected-icon-ref="selectedIconRef"
          />
          <BaseInput
            v-if="
              selectedIconRef?.$props.hasOwnProperty(allIconsPropsNames.size) &&
              typeof selectedIconRef?.$props[allIconsPropsNames.size] === 'number'
            "
            v-model="size"
            :type="InputType.Number"
            label="Размер"
            :size="Size.XS"
          />
          <ColorInput
            v-if="selectedIconRef?.$props.hasOwnProperty(allIconsPropsNames.stroke)"
            v-model="stroke"
            label="Цвет обводки"
          />
          <ColorInput
            v-if="selectedIconRef?.$props.hasOwnProperty(allIconsPropsNames.fill)"
            v-model="fill"
            label="Цвет заливки"
          />
          <BaseInput
            v-if="selectedIconRef?.$props.hasOwnProperty(allIconsPropsNames.extension)"
            v-model="extension"
            label="Расширение"
            :size="Size.XS"
          />
          <BaseInput
            v-if="selectedIconRef?.$props.hasOwnProperty(allIconsPropsNames.delay)"
            v-model="delay"
            label="Отложить анимацию, с"
            :size="Size.XS"
            :type="InputType.Number"
          />
          <BaseInput
            v-if="selectedIconRef?.$props.hasOwnProperty(allIconsPropsNames.number)"
            v-model="number"
            label="Число"
            :size="Size.XS"
            :type="InputType.Number"
          />
          <AppCheckbox
            v-if="selectedIconRef?.$props.hasOwnProperty(allIconsPropsNames.animate)"
            v-model="animate"
            label="Анимировать"
            class="mb-5"
          />
          <AppCheckbox
            v-if="selectedIconRef?.$props.hasOwnProperty(allIconsPropsNames.indicated)"
            v-model="indicated"
            label="С индикатором"
          />
        </div>
      </div>
      <div>
        <p class="text-size-5 text-grey-1 mb-2.5 block">Иконка</p>
        <div
          class="border-blueGrey-4 min-h-25 flex max-h-screen items-center justify-center rounded-md border px-4 py-1"
        >
          <component
            :is="IconComponents[selectedIconOption.value]"
            v-bind="selectedIconProps"
            v-if="selectedIconOption"
            ref="selectedIconRef"
            class="mx-auto"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'IconsPageLiveDemo',
};
</script>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { Size } from '@libs/components/enums';
import { InputType } from '@libs/components/inputs-enums';
import { BaseInput, AppCheckbox } from '@libs/components/inputs';
import ColorInput from '@/views/icons/icon-prop-changer/ColorInput.vue';
import type { ISelectItem } from '@libs/components/selects-types';
import { SimpleSelect } from '@libs/components/selects';
import { IconComponents } from '@/views/icons/utils/models';
import { allIconsPropsNames, type AllIconsProps } from './utils/models';
import FontWeightSelect from './icon-prop-changer/FontWeightSelect.vue';
import FontSizeSelect from './icon-prop-changer/FontSizeSelect.vue';
import { getIconProps } from './utils';
import type { IconName } from '@libs/components/icons-enums';

const selectedIconRef = ref();
const selectedIconProps = ref<AllIconsProps>({});
const selectedIconOption = ref<ISelectItem<IconName> | undefined>();
const iconOptions: ISelectItem<IconName>[] = Object.keys(IconComponents)
  .sort()
  .map((iconName) => ({
    title: iconName,
    value: iconName as IconName,
  }));

const number = computed<string>({
  get() {
    return selectedIconRef.value?.$props[allIconsPropsNames.number].toString() ?? '';
  },
  set(newValue) {
    selectedIconProps.value.number = Number(newValue);
  },
});

const stroke = computed<string>({
  get() {
    return selectedIconRef.value?.$props[allIconsPropsNames.stroke] ?? '';
  },
  set(newValue) {
    selectedIconProps.value.stroke = newValue;
  },
});

const fill = computed<string>({
  get() {
    return selectedIconRef.value?.$props[allIconsPropsNames.fill] ?? '';
  },
  set(newValue) {
    selectedIconProps.value.fill = newValue;
  },
});

const extension = computed<string>({
  get() {
    return selectedIconRef.value?.$props[allIconsPropsNames.extension] ?? '';
  },
  set(newValue) {
    selectedIconProps.value.extension = newValue;
  },
});

const size = computed<string>({
  get() {
    return selectedIconRef.value?.$props[allIconsPropsNames.size].toString() ?? '';
  },
  set(newValue) {
    selectedIconProps.value.size = Number(newValue);
  },
});

const delay = computed<string>({
  get() {
    return selectedIconRef.value?.$props[allIconsPropsNames.delay].toString() ?? '';
  },
  set(newValue) {
    selectedIconProps.value.delay = Number(newValue);
  },
});

const animate = computed<boolean>({
  get() {
    return selectedIconRef.value?.$props[allIconsPropsNames.animate] ?? false;
  },
  set(newValue) {
    selectedIconProps.value.animate = newValue;
  },
});

const indicated = computed<boolean>({
  get() {
    return selectedIconRef.value?.$props[allIconsPropsNames.indicated] ?? false;
  },
  set(newValue) {
    selectedIconProps.value.indicated = newValue;
  },
});
</script>
