<template>
  <div>
    <div class="grid grid-cols-2 gap-5">
      <div>
        <h3 class="mb-6">Пропсы</h3>
        <div class="flex flex-col gap-y-5">
          <template
            v-for="propName in Object.values(multipleSelectPropsNames)"
            :key="`${propName}-${multiSelectProps[propName]}`"
          >
            <ISelectItemsChanger
              v-if="isISelectItemArray(propName)"
              v-model="multiSelectProps[propName]"
              :label="propName"
            />
            <InputSizeSelect
              v-else-if="isSize(propName)"
              :model-value="multiSelectRef?.$props[propName]"
              @update:model-value="(newValue) => (multiSelectProps[propName] = newValue)"
            />
            <ErrorListChanger
              v-else-if="isStringArray(propName)"
              v-model="multiSelectProps[propName]"
              :label="propName"
            />
            <BaseInput
              v-else-if="isString(propName)"
              :model-value="multiSelectRef?.$props[propName]?.toString() ?? ''"
              :label="propName"
              :size="Size.XS"
              @update:model-value="(newValue) => (multiSelectProps[propName] = newValue)"
            />
            <BaseInput
              v-else-if="isNumber(propName)"
              :model-value="multiSelectRef?.$props[propName]?.toString() ?? ''"
              :label="propName"
              :size="Size.XS"
              :type="InputType.Number"
              @update:model-value="(newValue) => (multiSelectProps[propName] = Number(newValue))"
            />
            <AppCheckbox
              v-else-if="isBoolean(propName)"
              :model-value="multiSelectRef?.$props[propName] ?? null"
              :label="propName"
              @update:model-value="(newValue) => (multiSelectProps[propName] = newValue)"
            />
          </template>
        </div>
      </div>
      <div>
        <p class="text-size-5 text-grey-1 mb-2.5 block">Инпут</p>
        <div
          class="border-blueGrey-4 min-h-25 flex max-h-screen items-center justify-center rounded-md border px-4 py-1"
        >
          <MultiSelect
            v-bind="multiSelectProps"
            :key="`${multiSelectProps.selectedOptions}`"
            ref="multiSelectRef"
            class="mx-auto max-w-full"
            @update:selected-options="(newValue) => (multiSelectProps.selectedOptions = newValue)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'MultipleSelectPageLiveDemo',
};
</script>

<script setup lang="ts">
import { ref } from 'vue';
import { Size } from '@libs/components/enums';
import { BaseInput, AppCheckbox } from '@libs/components/inputs';
import type { IMultipleSelectProps } from '@libs/components/inputs-types';
import { InputType } from '@libs/components/inputs-enums';
import { multipleSelectPropsNames } from './utils/models';
import { isBoolean, isISelectItemArray, isNumber, isSize, isString, isStringArray } from './utils';
import { MultiSelect } from '@libs/components/selects';
import InputSizeSelect from '@/views/inputs/input-prop-changer/InputSizeSelect.vue';
import ErrorListChanger from '@/views/inputs/input-prop-changer/ErrorListChanger.vue';
import ISelectItemsChanger from '@/views/inputs/input-prop-changer/ISelectItemsChanger.vue';

const multiSelectRef = ref<InstanceType<typeof MultiSelect>>();

const multiSelectProps = ref<IMultipleSelectProps>({
  selectedOptions: [{ title: 'Title1', value: 'value1' }],
  options: [
    { title: 'Title1', value: 'value1' },
    { title: 'Title2', value: 'value2' },
    { title: 'Title3', value: 'value3' },
  ],
});
</script>
