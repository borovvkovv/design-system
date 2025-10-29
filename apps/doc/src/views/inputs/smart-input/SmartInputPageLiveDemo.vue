<template>
  <div>
    <div class="grid grid-cols-2 gap-5">
      <div>
        <h3 class="mb-6">Пропсы</h3>
        <div class="flex flex-col gap-y-5">
          <template
            v-for="propName in Object.values(smartInputPropsNames)"
            :key="propName"
          >
            <InputSizeSelect
              v-if="isSize(propName)"
              :model-value="smartInputRef?.$props[propName]"
              @update:model-value="(newValue) => (smartInputProps[propName] = newValue)"
            />
            <IconSelect
              v-else-if="isIconName(propName)"
              :model-value="smartInputRef?.$props[propName]"
              :label="propName"
              @update:model-value="(newValue) => (smartInputProps[propName] = newValue)"
            />
            <ISelectItemSelect
              v-else-if="isISelectItem(propName)"
              v-model="smartInputProps[propName]"
              :options="smartInputProps.options"
              :label="propName"
            />
            <ISelectItemsChanger
              v-else-if="isISelectItemArray(propName)"
              v-model="smartInputProps[propName]"
              :label="propName"
            />
            <ErrorListChanger
              v-else-if="isStringArray(propName)"
              v-model="smartInputProps[propName]"
              :label="propName"
            />
            <BaseInput
              v-else-if="isString(propName)"
              :model-value="smartInputRef?.$props[propName]?.toString() ?? ''"
              :label="propName"
              :size="Size.XS"
              @update:model-value="(newValue) => (smartInputProps[propName] = newValue)"
            />
            <BaseInput
              v-else-if="isNumber(propName)"
              :model-value="smartInputRef?.$props[propName]?.toString() ?? ''"
              :label="propName"
              :size="Size.XS"
              :type="InputType.Number"
              @update:model-value="(newValue) => (smartInputProps[propName] = Number(newValue))"
            />
            <AppCheckbox
              v-else-if="isBoolean(propName)"
              :model-value="smartInputRef?.$props[propName] ?? null"
              :label="propName"
              @update:model-value="(newValue) => (smartInputProps[propName] = newValue)"
            />
          </template>
        </div>
      </div>
      <div>
        <p class="text-size-5 text-grey-1 mb-2.5 block">Инпут</p>
        <div
          class="border-blueGrey-4 min-h-25 flex max-h-screen items-center justify-center rounded-md border px-4 py-1"
        >
          <SmartInput
            v-bind="smartInputProps"
            ref="smartInputRef"
            class="mx-auto max-w-full"
            @update:model-value="(newValue) => (smartInputProps.modelValue = newValue)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'SmartInputPageLiveDemo',
};
</script>

<script setup lang="ts">
import { ref } from 'vue';
import { Size } from '@libs/components/enums';
import { BaseInput, AppCheckbox } from '@libs/components/inputs';
import IconSelect from '../input-prop-changer/IconSelect.vue';
import InputSizeSelect from '../input-prop-changer/InputSizeSelect.vue';
import type { ISmartInputProps } from '@libs/components/inputs-types';
import { InputType } from '@libs/components/inputs-enums';
import ErrorListChanger from '../input-prop-changer/ErrorListChanger.vue';
import {
  isBoolean,
  isIconName,
  isISelectItem,
  isISelectItemArray,
  isNumber,
  isSize,
  isString,
  isStringArray,
} from './utils';
import { SmartInput } from '@libs/components/inputs';
import { smartInputPropsNames } from './utils/models';
import ISelectItemSelect from '../input-prop-changer/ISelectItemSelect.vue';
import ISelectItemsChanger from '../input-prop-changer/ISelectItemsChanger.vue';

const smartInputRef = ref();

const smartInputProps = ref<ISmartInputProps<string>>({
  options: [
    { title: 'title1', value: 'value1' },
    { title: 'title2', value: 'value2' },
    { title: 'title3', value: 'value3' },
  ],
  modelValue: { title: 'title1', value: 'value1' },
});
</script>
