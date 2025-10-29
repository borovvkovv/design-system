<template>
  <div>
    <div class="grid grid-cols-2 gap-5">
      <div>
        <h3 class="mb-6">Пропсы</h3>
        <div class="flex flex-col gap-y-5">
          <template
            v-for="propName in Object.values(baseInputPropsNames)"
            :key="propName"
          >
            <InputSizeSelect
              v-if="isSize(propName)"
              :model-value="baseInputRef?.$props[propName]"
              :button-ref="baseInputRef"
              @update:model-value="(newValue) => (baseInputProps[propName] = newValue)"
            />
            <IconSelect
              v-else-if="isIconName(propName)"
              :model-value="baseInputRef?.$props[propName]"
              :label="propName"
              @update:model-value="(newValue) => (baseInputProps[propName] = newValue)"
            />
            <IconSelect
              v-else-if="isIClickableIcon(propName)"
              :model-value="baseInputRef?.$props[propName]?.iconName"
              :label="propName"
              @update:model-value="
                (newValue) =>
                  newValue
                    ? (baseInputProps[propName] = { iconName: newValue })
                    : (baseInputProps[propName] = undefined)
              "
            />
            <IconRightShowModeSelect
              v-else-if="isIconShowMode(propName)"
              :model-value="baseInputRef?.$props[propName]"
              @update:model-value="(newValue) => (baseInputProps[propName] = newValue)"
            />
            <InputTypeSelect
              v-else-if="isInputType(propName)"
              :model-value="baseInputRef?.$props[propName]"
              :label="propName"
              @update:model-value="(newValue) => (baseInputProps[propName] = newValue)"
            />
            <ErrorListChanger
              v-else-if="isStringArray(propName)"
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
          <BaseInput
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
  name: 'BaseInputPageLiveDemo',
};
</script>

<script setup lang="ts">
import { ref } from 'vue';
import { Size } from '@libs/components/enums';
import { BaseInput, AppCheckbox } from '@libs/components/inputs';
import IconSelect from '../input-prop-changer/IconSelect.vue';
import InputSizeSelect from '../input-prop-changer/InputSizeSelect.vue';
import InputTypeSelect from '../input-prop-changer/InputTypeSelect.vue';
import type { IBaseInputProps } from '@libs/components/inputs-types';
import { InputType } from '@libs/components/inputs-enums';
import ErrorListChanger from '../input-prop-changer/ErrorListChanger.vue';
import { baseInputPropsNames } from './utils/models';
import IconRightShowModeSelect from '../input-prop-changer/IconRightShowModeSelect.vue';
import {
  isBoolean,
  isIClickableIcon,
  isIconName,
  isIconShowMode,
  isInputType,
  isNumber,
  isSize,
  isString,
  isStringArray,
} from './utils';

const baseInputRef = ref<InstanceType<typeof BaseInput>>();

const baseInputProps = ref<IBaseInputProps>({
  modelValue: '',
});
</script>
