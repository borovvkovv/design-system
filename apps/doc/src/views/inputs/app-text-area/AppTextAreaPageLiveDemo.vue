<template>
  <div>
    <div class="grid grid-cols-2 gap-5">
      <div>
        <h3 class="mb-6">Пропсы</h3>
        <div class="flex flex-col gap-y-5">
          <template
            v-for="propName in Object.values(appTextAreaPropsNames)"
            :key="propName"
          >
            <ErrorListChanger
              v-if="isStringArray(propName)"
              v-model="baseInputProps[propName]"
              :label="propName"
            />
            <BaseInput
              v-else-if="isString(propName)"
              :model-value="baseInputRef?.$props[propName]?.toString() ?? ''"
              :label="propName"
              :size="Size.XS"
              @update:model-value="(newValue) => (baseInputProps[propName] = newValue)"
            />
            <BaseInput
              v-else-if="isNumber(propName)"
              :model-value="baseInputRef?.$props[propName]?.toString() ?? ''"
              :label="propName"
              :size="Size.XS"
              :type="InputType.Number"
              @update:model-value="(newValue) => (baseInputProps[propName] = Number(newValue))"
            />
            <AppCheckbox
              v-else-if="isBoolean(propName)"
              :model-value="baseInputRef?.$props[propName] ?? null"
              :label="propName"
              @update:model-value="(newValue) => (baseInputProps[propName] = newValue)"
            />
          </template>
        </div>
      </div>
      <div>
        <p class="text-size-5 text-grey-1 mb-2.5 block">Инпут</p>
        <div
          class="border-blueGrey-4 min-h-25 flex max-h-screen items-center justify-center rounded-md border px-4 py-1"
        >
          <AppTextArea
            v-bind="baseInputProps"
            ref="baseInputRef"
            class="mx-auto max-w-full"
            @update:model-value="(newValue) => (baseInputProps.modelValue = newValue)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'AppTextAreaPageLiveDemo',
};
</script>

<script setup lang="ts">
import { ref } from 'vue';
import { Size } from '@libs/components/enums';
import { BaseInput, AppCheckbox, AppTextArea } from '@libs/components/inputs';
import type { IAppTextAreaProps } from '@libs/components/inputs-types';
import { InputType } from '@libs/components/inputs-enums';
import ErrorListChanger from '../input-prop-changer/ErrorListChanger.vue';
import { appTextAreaPropsNames } from './utils/models';
import { isBoolean, isNumber, isString, isStringArray } from './utils';

const baseInputRef = ref<InstanceType<typeof AppTextArea>>();

const baseInputProps = ref<IAppTextAreaProps>({
  modelValue: '',
});
</script>
