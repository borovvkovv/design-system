<template>
  <div>
    <div class="grid grid-cols-2 gap-5">
      <div>
        <h3 class="mb-6">Пропсы</h3>
        <div class="flex flex-col gap-y-5">
          <template
            v-for="propName in Object.values(simpleSelectPropsNames)"
            :key="`${propName}-${simpleSelectProps[propName]}`"
          >
            <ISelectItemsChanger
              v-if="isISelectItemArray(propName)"
              v-model="simpleSelectProps[propName]"
              :label="propName"
            />
            <ISelectItemSelect
              v-else-if="isISelectItem(propName)"
              v-model="simpleSelectProps[propName]"
              :options="simpleSelectProps.options"
              :label="propName"
            />
            <InputSizeSelect
              v-else-if="isSize(propName)"
              :model-value="multiSelectRef?.$props[propName]"
              @update:model-value="(newValue) => (simpleSelectProps[propName] = newValue)"
            />
            <ErrorListChanger
              v-else-if="isStringArray(propName)"
              v-model="simpleSelectProps[propName]"
              :label="propName"
            />
            <BaseInput
              v-else-if="isString(propName)"
              :model-value="multiSelectRef?.$props[propName]?.toString() ?? ''"
              :label="propName"
              :size="Size.XS"
              @update:model-value="(newValue) => (simpleSelectProps[propName] = newValue)"
            />
            <BaseInput
              v-else-if="isNumber(propName)"
              :model-value="multiSelectRef?.$props[propName]?.toString() ?? ''"
              :label="propName"
              :size="Size.XS"
              :type="InputType.Number"
              @update:model-value="(newValue) => (simpleSelectProps[propName] = Number(newValue))"
            />
            <AppCheckbox
              v-else-if="isBoolean(propName)"
              :model-value="multiSelectRef?.$props[propName] ?? null"
              :label="propName"
              @update:model-value="(newValue) => (simpleSelectProps[propName] = newValue)"
            />
          </template>
        </div>
      </div>
      <div>
        <p class="text-size-5 text-grey-1 mb-2.5 block">Инпут</p>
        <div
          class="border-blueGrey-4 min-h-25 flex max-h-screen items-center justify-center rounded-md border px-4 py-1"
        >
          <SimpleSelect
            v-bind="simpleSelectProps"
            :key="`${simpleSelectProps.modelValue}`"
            ref="multiSelectRef"
            class="mx-auto max-w-full"
            @update:model-value="(newValue) => (simpleSelectProps.modelValue = newValue)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'SimpleSelectPageLiveDemo',
};
</script>

<script setup lang="ts">
import { ref } from 'vue';
import { Size } from '@libs/components/enums';
import { BaseInput } from '@libs/components/inputs';
import { AppCheckbox } from '@libs/components/inputs';
import { MultiSelect } from '@libs/components/selects';
import InputSizeSelect from '@/views/inputs/input-prop-changer/InputSizeSelect.vue';
import ErrorListChanger from '@/views/inputs/input-prop-changer/ErrorListChanger.vue';
import ISelectItemsChanger from '@/views/inputs/input-prop-changer/ISelectItemsChanger.vue';
import { SimpleSelect } from '@libs/components/selects';
import { simpleSelectPropsNames } from './utils/models';
import { isBoolean, isISelectItem, isISelectItemArray, isNumber, isSize, isString, isStringArray } from './utils';
import ISelectItemSelect from '@/views/inputs/input-prop-changer/ISelectItemSelect.vue';
import type { ISimpleSelectProps } from '@libs/components/inputs-types';
import { InputType } from '@libs/components/inputs-enums';

const multiSelectRef = ref<InstanceType<typeof MultiSelect>>();

const simpleSelectProps = ref<ISimpleSelectProps<string>>({
  modelValue: { title: 'Title1', value: 'value1' },
  options: [
    { title: 'Title1', value: 'value1' },
    { title: 'Title2', value: 'value2' },
    { title: 'Title3', value: 'value3' },
  ],
});
</script>
