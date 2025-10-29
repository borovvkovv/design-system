<template>
  <div>
    <div class="mb-5">
      <h3 class="mb-2.5">Компоненты</h3>
      <div
        class="border-blueGrey-4 min-h-25 flex max-h-screen items-center justify-center gap-5 rounded-md border px-4 py-1"
      >
        <div
          v-for="(radiobuttonGroup, radiobuttonGroupIndex) in radiobuttonGroups"
          :key="radiobuttonGroupIndex"
          class="border-blueGrey-4 flex gap-5 border p-5"
        >
          <AppRadiobutton
            v-for="(radiobutton, radiobuttonIndex) in radiobuttonGroup.radiobuttons"
            :key="radiobuttonIndex"
            v-bind="{
              ...radiobutton,
              modelValue: radiobuttonGroup.modelValue,
              groupName: radiobuttonGroup.groupName,
            }"
            @update:model-value="(newValue) => (radiobuttonGroup.modelValue = newValue)"
          />
        </div>
      </div>
    </div>
    <h3 class="mb-6">Пропсы</h3>
    <div class="flex flex-col gap-5">
      <div
        v-for="(radiobuttonGroup, radiobuttonGroupIndex) in radiobuttonGroups"
        :key="radiobuttonGroupIndex"
      >
        <div class="flex justify-between">
          <p class="text-size-5 mb-2.5 block">Группа</p>
          <AppLink
            @click="
              () => {
                radiobuttonGroups = [
                  ...radiobuttonGroups.slice(0, radiobuttonGroupIndex),
                  ...radiobuttonGroups.slice(radiobuttonGroupIndex + 1),
                ];
              }
            "
          >
            <AppIcon :icon="IconName.IconWasteBin" />
          </AppLink>
        </div>
        <div class="border-blueGrey-4 flex flex-col gap-5 rounded-md border p-5">
          <BaseInput
            :model-value="radiobuttonGroup.modelValue"
            :label="appRadiobuttonModelValuePropName"
            :size="Size.XS"
            @update:model-value="(newValue) => (radiobuttonGroup.modelValue = newValue)"
          />
          <BaseInput
            :model-value="radiobuttonGroup.groupName"
            :label="appRadiobuttonGroupNamePropName"
            :size="Size.XS"
            @update:model-value="(newValue) => (radiobuttonGroup.groupName = newValue)"
          />
          <div
            v-for="(radiobutton, radiobuttonIndex) in radiobuttonGroup.radiobuttons"
            :key="radiobuttonIndex"
            class="border-blueGrey-4 relative grid grid-cols-3 gap-5 rounded-md border p-5"
          >
            <AppLink
              class="absolute right-1 top-1"
              @click="
                () => {
                  radiobuttonGroup.radiobuttons = [
                    ...radiobuttonGroup.radiobuttons.slice(0, radiobuttonIndex),
                    ...radiobuttonGroup.radiobuttons.slice(radiobuttonIndex + 1),
                  ];
                }
              "
            >
              <AppIcon :icon="IconName.IconWasteBin" />
            </AppLink>
            <BaseInput
              :model-value="radiobutton.value"
              :label="appRadiobuttonValuePropName"
              :size="Size.XS"
              @update:model-value="(newValue) => (radiobuttonGroup.radiobuttons[radiobuttonIndex].value = newValue)"
            />
            <BaseInput
              :model-value="radiobutton.label ?? ''"
              :label="appRadiobuttonLabelPropName"
              :size="Size.XS"
              @update:model-value="(newValue) => (radiobuttonGroup.radiobuttons[radiobuttonIndex].label = newValue)"
            />
            <BaseInput
              :model-value="radiobutton.fieldId ?? ''"
              :label="appRadiobuttonFieldIdPropName"
              :size="Size.XS"
              @update:model-value="(newValue) => (radiobuttonGroup.radiobuttons[radiobuttonIndex].fieldId = newValue)"
            />
            <AppCheckbox
              :model-value="radiobutton.isDisabled ?? false"
              :label="appRadiobuttonIsDisabledPropName"
              @update:model-value="
                (newValue) => (radiobuttonGroup.radiobuttons[radiobuttonIndex].isDisabled = newValue)
              "
            />
            <AppCheckbox
              :model-value="radiobutton.isError ?? false"
              :label="appRadiobuttonIsErrorPropName"
              @update:model-value="(newValue) => (radiobuttonGroup.radiobuttons[radiobuttonIndex].isError = newValue)"
            />
          </div>
          <div class="border-blueGrey-4 flex items-center justify-center gap-5 rounded-md border p-5">
            <AppLink
              @click="
                () => {
                  radiobuttonGroup.radiobuttons.push({
                    value: `value${radiobuttonGroup.radiobuttons.length + 1}`,
                  });
                }
              "
            >
              <AppIcon :icon="IconName.IconPlus" />
            </AppLink>
          </div>
        </div>
      </div>
      <div class="border-blueGrey-4 flex items-center justify-center gap-5 rounded-md border p-5">
        <AppLink
          @click="
            () => {
              radiobuttonGroups.push({
                radiobuttons: [],
                groupName: `group${radiobuttonGroups.length + 1}`,
                modelValue: '',
              });
            }
          "
        >
          <AppIcon :icon="IconName.IconPlus" />
        </AppLink>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'RadioButtonPageLiveDemo',
};
</script>

<script setup lang="ts">
import { ref } from 'vue';
import { Size } from '@libs/components/enums';
import { AppCheckbox } from '@libs/components/inputs';
import type { IAppRadiobuttonProps } from '@libs/components/inputs-types';
import { BaseInput } from '@libs/components/inputs';
import { AppRadiobutton } from '@libs/components/inputs';
import { AppIcon } from '@libs/components';
import { IconName } from '@libs/components/icons-enums';
import { AppLink } from '@libs/components/app-link';

const appRadiobuttonModelValuePropName: keyof Pick<IAppRadiobuttonProps, 'modelValue'> = 'modelValue';
const appRadiobuttonValuePropName: keyof Pick<IAppRadiobuttonProps, 'value'> = 'value';
const appRadiobuttonGroupNamePropName: keyof Pick<IAppRadiobuttonProps, 'groupName'> = 'groupName';
const appRadiobuttonLabelPropName: keyof Pick<IAppRadiobuttonProps, 'label'> = 'label';
const appRadiobuttonIsDisabledPropName: keyof Pick<IAppRadiobuttonProps, 'isDisabled'> = 'isDisabled';
const appRadiobuttonIsErrorPropName: keyof Pick<IAppRadiobuttonProps, 'isError'> = 'isError';
const appRadiobuttonFieldIdPropName: keyof Pick<IAppRadiobuttonProps, 'fieldId'> = 'fieldId';

type RadiobuttonUniqueProps = {
  value: string;
  label?: string;
  isDisabled?: boolean;
  isError?: boolean;
  fieldId?: string;
};

type RadiobuttonGroupUniqueProps = {
  modelValue: string;
  groupName: string;
  radiobuttons: Array<RadiobuttonUniqueProps>;
};

type RadiobuttonGroups = Array<RadiobuttonGroupUniqueProps>;

const radiobuttonGroups = ref<RadiobuttonGroups>([
  {
    modelValue: 'value1',
    groupName: 'group1',
    radiobuttons: [{ value: 'value1' }, { value: 'value2' }],
  },
]);
</script>
