<template>
  <div>
    <div class="grid grid-cols-2 gap-5">
      <div>
        <h3 class="mb-6">Пропсы</h3>
        <div class="flex flex-col gap-y-5">
          <template
            v-for="propName in Object.values(basePasswordInputPropsNames)"
            :key="propName"
          >
            <InputSizeSelect
              v-if="isSize(propName)"
              :model-value="basePasswordInputRef?.$props[propName]"
              :button-ref="basePasswordInputRef"
              @update:model-value="(newValue) => (basePasswordInputProps[propName] = newValue)"
            />
            <ErrorListChanger
              v-else-if="isStringArray(propName)"
              v-model="basePasswordInputProps[propName]"
              :label="propName"
            />
            <BaseInput
              v-else-if="isString(propName)"
              :model-value="basePasswordInputRef?.$props[propName]?.toString() ?? ''"
              :label="propName"
              :size="Size.XS"
              @update:model-value="(newValue) => (basePasswordInputProps[propName] = newValue)"
            />
            <BaseInput
              v-else-if="isNumber(propName)"
              :model-value="basePasswordInputRef?.$props[propName]?.toString() ?? ''"
              :label="propName"
              :size="Size.XS"
              :type="InputType.Number"
              @update:model-value="(newValue) => (basePasswordInputProps[propName] = Number(newValue))"
            />
            <AppCheckbox
              v-else-if="isBoolean(propName)"
              :model-value="basePasswordInputRef?.$props[propName] ?? null"
              :label="propName"
              @update:model-value="(newValue) => (basePasswordInputProps[propName] = newValue)"
            />
          </template>
        </div>
      </div>
      <div>
        <p class="text-size-5 text-grey-1 mb-2.5 block">Инпут</p>
        <div
          class="border-blueGrey-4 min-h-25 flex max-h-screen items-center justify-center rounded-md border px-4 py-1"
        >
          <BasePasswordInput
            v-bind="basePasswordInputProps"
            ref="basePasswordInputRef"
            class="mx-auto max-w-full"
            @update:model-value="(newValue) => (basePasswordInputProps.modelValue = newValue)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'BasePasswordInputPageLiveDemo',
};
</script>

<script setup lang="ts">
import { ref } from 'vue';
import { Size } from '@libs/components/enums';
import { BaseInput, AppCheckbox } from '@libs/components/inputs';
import InputSizeSelect from '../input-prop-changer/InputSizeSelect.vue';
import type { IPasswordInputProps } from '@libs/components/inputs-types';
import { InputType } from '@libs/components/inputs-enums';
import ErrorListChanger from '../input-prop-changer/ErrorListChanger.vue';
import { basePasswordInputPropsNames } from './utils/models';
import { isSize, isStringArray, isString, isNumber, isBoolean } from './utils';
import { BasePasswordInput } from '@libs/components/inputs';

const basePasswordInputRef = ref<InstanceType<typeof BasePasswordInput>>();

const basePasswordInputProps = ref<IPasswordInputProps>({
  modelValue: '',
});
</script>
