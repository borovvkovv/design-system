<template>
  <div>
    <div class="grid grid-cols-2 gap-5">
      <div>
        <h3 class="mb-6">Пропсы</h3>
        <div class="flex flex-col gap-y-5">
          <AppCheckbox
            v-model="modelValue"
            :label="appSwitcherModelValuePropName"
          />
          <AppCheckbox
            v-model="isDisabled"
            :label="appSwitcherIsDisabledPropName"
          />
          <BaseInput
            v-model="tabindex"
            :label="appSwitcherTabIndexPropName"
            :size="Size.XS"
          />
        </div>
      </div>
      <div>
        <p class="text-size-5 text-grey-1 mb-2.5 block">Переключатель</p>
        <div
          class="border-blueGrey-4 min-h-25 flex max-h-screen items-center justify-center rounded-md border px-4 py-1"
        >
          <AppSwitcher
            v-bind="appSwitcherProps"
            ref="appSwitcherRef"
            class="mx-auto max-w-full"
            @update:model-value="(newValue) => (appSwitcherProps.modelValue = newValue)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'SwitcherPageLiveDemo',
};
</script>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { Size } from '@libs/components/enums';
import { BaseInput, AppCheckbox, AppSwitcher } from '@libs/components/inputs';
import type { IAppSwitcherProps } from '@libs/components/inputs-types';

const appSwitcherRef = ref();
const appSwitcherProps = ref<IAppSwitcherProps>({ modelValue: true });
const appSwitcherModelValuePropName: keyof Pick<IAppSwitcherProps, 'modelValue'> = 'modelValue';
const appSwitcherIsDisabledPropName: keyof Pick<IAppSwitcherProps, 'isDisabled'> = 'isDisabled';
const appSwitcherTabIndexPropName: keyof Pick<IAppSwitcherProps, 'tabIndex'> = 'tabIndex';

const modelValue = computed<boolean>({
  get() {
    return appSwitcherRef.value?.$props[appSwitcherModelValuePropName];
  },
  set(newValue) {
    appSwitcherProps.value.modelValue = newValue;
  },
});

const isDisabled = computed<boolean>({
  get() {
    return appSwitcherRef.value?.$props[appSwitcherIsDisabledPropName];
  },
  set(newValue) {
    appSwitcherProps.value.isDisabled = newValue;
  },
});

const tabindex = computed<string>({
  get() {
    return appSwitcherRef.value?.$props[appSwitcherTabIndexPropName] ?? '';
  },
  set(newValue) {
    appSwitcherProps.value.tabIndex = newValue;
  },
});
</script>
