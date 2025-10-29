<template>
  <div>
    <div class="grid grid-cols-2 gap-5">
      <div>
        <h3 class="mb-6">Пропсы</h3>
        <div class="flex flex-col gap-y-5">
          <template
            v-for="propName in Object.values(baseSimpleInputPropsNames)"
            :key="propName"
          >
            <InputSizeSelect
              v-if="isSize(propName)"
              :model-value="baseSimpleInputRef?.$props[propName]"
              :button-ref="baseSimpleInputRef"
              @update:model-value="(newValue) => (baseSimpleInputProps[propName] = newValue)"
            />
            <IconSelect
              v-else-if="isIconName(propName)"
              :model-value="baseSimpleInputRef?.$props[propName]"
              :label="propName"
              @update:model-value="(newValue) => (baseSimpleInputProps[propName] = newValue)"
            />
            <InputTypeSelect
              v-else-if="isInputType(propName)"
              :model-value="baseSimpleInputRef?.$props[propName]"
              :label="propName"
              @update:model-value="(newValue) => (baseSimpleInputProps[propName] = newValue)"
            />
            <ErrorListChanger
              v-else-if="isStringArray(propName)"
              v-model="baseSimpleInputProps[propName]"
              :label="propName"
            />
            <BaseInput
              v-else-if="isString(propName)"
              :model-value="baseSimpleInputRef?.$props[propName]?.toString() ?? ''"
              :label="propName"
              :size="Size.XS"
              @update:model-value="(newValue) => (baseSimpleInputProps[propName] = newValue)"
            />
            <BaseInput
              v-else-if="isNumber(propName)"
              :model-value="baseSimpleInputRef?.$props[propName]?.toString() ?? ''"
              :label="propName"
              :size="Size.XS"
              :type="InputType.Number"
              @update:model-value="(newValue) => (baseSimpleInputProps[propName] = Number(newValue))"
            />
            <AppCheckbox
              v-else-if="isBoolean(propName)"
              :model-value="baseSimpleInputRef?.$props[propName] ?? null"
              :label="propName"
              @update:model-value="(newValue) => (baseSimpleInputProps[propName] = newValue)"
            />
          </template>
        </div>
      </div>
      <div>
        <p class="text-size-5 text-grey-1 mb-2.5 block">Инпут</p>
        <div
          class="border-blueGrey-4 min-h-25 flex max-h-screen items-center justify-center rounded-md border px-4 py-1"
        >
          <BaseSimpleInput
            v-bind="baseSimpleInputProps"
            ref="baseSimpleInputRef"
            class="mx-auto max-w-full"
            @update:model-value="(newValue) => (baseSimpleInputProps.modelValue = newValue)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'BaseSimpleInputPageLiveDemo',
};
</script>

<script setup lang="ts">
import { ref } from 'vue';
import { Size } from '@libs/components/enums';
import { BaseInput, AppCheckbox } from '@libs/components/inputs';
import IconSelect from '../input-prop-changer/IconSelect.vue';
import InputSizeSelect from '../input-prop-changer/InputSizeSelect.vue';
import InputTypeSelect from '../input-prop-changer/InputTypeSelect.vue';
import type { ISimpleInputProps } from '@libs/components/inputs-types';
import { InputType } from '@libs/components/inputs-enums';
import ErrorListChanger from '../input-prop-changer/ErrorListChanger.vue';
import { isBoolean, isIconName, isInputType, isNumber, isSize, isString, isStringArray } from './utils';
import { baseSimpleInputPropsNames } from './utils/models';
import { BaseSimpleInput } from '@libs/components/inputs';

const baseSimpleInputRef = ref<InstanceType<typeof BaseSimpleInput>>();

const baseSimpleInputProps = ref<ISimpleInputProps>({
  modelValue: '',
});
</script>
