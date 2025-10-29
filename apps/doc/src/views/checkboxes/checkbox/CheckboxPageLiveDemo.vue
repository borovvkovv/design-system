<template>
  <div>
    <div class="mb-5">
      <h3 class="mb-2.5">Компоненты</h3>
      <div
        class="border-blueGrey-4 min-h-25 flex max-h-screen items-center justify-center gap-5 rounded-md border px-4 py-1"
      >
        <AppCheckbox
          v-for="(checkbox, checkboxIndex) in checkboxes"
          :key="checkboxIndex"
          v-bind="checkbox"
          @update:model-value="(newValue) => (checkbox.modelValue = newValue)"
        />
      </div>
    </div>
    <h3 class="mb-6">Пропсы</h3>
    <div class="flex flex-col gap-5">
      <div
        v-for="(checkbox, checkboxIndex) in checkboxes"
        :key="checkboxIndex"
        class="border-blueGrey-4 relative grid grid-cols-3 gap-5 rounded-md border p-5"
      >
        <AppLink
          class="absolute right-1 top-1"
          @click="
            () => {
              checkboxes = [...checkboxes.slice(0, checkboxIndex), ...checkboxes.slice(checkboxIndex + 1)];
            }
          "
        >
          <AppIcon :icon="IconName.IconWasteBin" />
        </AppLink>
        <SimpleSelect
          :model-value="
            isCheckedOptions.find(
              (isCheckedOptions) => isCheckedOptions.value === (checkbox.modelValue?.toString() ?? 'null'),
            )
          "
          :options="isCheckedOptions"
          :size="Size.XS"
          :label="appCheckboxModelValuePropName"
          @update:model-value="
            (newValue) => {
              if (newValue) {
                if (newValue.value === 'null') checkbox.modelValue = null;
                if (newValue.value === 'true') checkbox.modelValue = true;
                if (newValue.value === 'false') checkbox.modelValue = false;
              }
            }
          "
        />
        <BaseInput
          :model-value="checkbox.label ?? ''"
          :label="appCheckboxLabelPropName"
          :size="Size.XS"
          @update:model-value="(newValue) => (checkbox.label = newValue)"
        />
        <BaseInput
          :model-value="checkbox.fieldId ?? ''"
          :label="appCheckboxFieldIdPropName"
          :size="Size.XS"
          @update:model-value="(newValue) => (checkbox.fieldId = newValue)"
        />
        <BaseInput
          :model-value="String(checkbox.tabindex)"
          :label="appCheckboxTabindexPropName"
          :size="Size.XS"
          @update:model-value="(newValue) => (checkbox.tabindex = newValue)"
        />
        <AppCheckbox
          :model-value="checkbox.isDisabled ?? null"
          :label="appCheckboxIsDisabledPropName"
          @update:model-value="(newValue) => (checkbox.isDisabled = newValue)"
        />
        <AppCheckbox
          :model-value="checkbox.isError ?? null"
          :label="appCheckboxIsErrorPropName"
          @update:model-value="(newValue) => (checkbox.isError = newValue)"
        />
        <AppCheckbox
          :model-value="checkbox.inverseColor ?? null"
          :label="appCheckboxInverseColorPropName"
          @update:model-value="(newValue) => (checkbox.inverseColor = newValue)"
        />
      </div>
      <div class="border-blueGrey-4 flex items-center justify-center gap-5 rounded-md border p-5">
        <AppLink @click="() => checkboxes.push({ modelValue: null })">
          <AppIcon :icon="IconName.IconPlus" />
        </AppLink>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'CheckboxPageLiveDemo',
};
</script>

<script setup lang="ts">
import { ref } from 'vue';
import { Size } from '@libs/components/enums';
import { AppIcon } from '@libs/components';
import { IconName } from '@libs/components/icons-enums';
import { AppLink } from '@libs/components/app-link';
import { BaseInput } from '@libs/components/inputs';
import { AppCheckbox } from '@libs/components/inputs';
import type { ISelectItem } from '@libs/components/selects-types';
import { SimpleSelect } from '@libs/components/selects';
import type { IAppCheckboxProps } from '@libs/components/inputs-types';

const appCheckboxModelValuePropName: keyof Pick<IAppCheckboxProps, 'modelValue'> = 'modelValue';
const appCheckboxLabelPropName: keyof Pick<IAppCheckboxProps, 'label'> = 'label';
const appCheckboxIsDisabledPropName: keyof Pick<IAppCheckboxProps, 'isDisabled'> = 'isDisabled';
const appCheckboxIsErrorPropName: keyof Pick<IAppCheckboxProps, 'isError'> = 'isError';
const appCheckboxFieldIdPropName: keyof Pick<IAppCheckboxProps, 'fieldId'> = 'fieldId';
const appCheckboxTabindexPropName: keyof Pick<IAppCheckboxProps, 'tabindex'> = 'tabindex';
const appCheckboxInverseColorPropName: keyof Pick<IAppCheckboxProps, 'inverseColor'> = 'inverseColor';

const isCheckedOptions: ISelectItem<string>[] = [
  { title: 'True', value: 'true' },
  { title: 'False', value: 'false' },
  { title: 'Null', value: 'null' },
];

const checkboxes = ref<Array<IAppCheckboxProps>>([{ modelValue: null }, { modelValue: null }]);
</script>
