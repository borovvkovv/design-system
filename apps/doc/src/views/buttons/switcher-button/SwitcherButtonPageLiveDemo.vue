<template>
  <div>
    <div class="grid grid-cols-2 gap-5">
      <div>
        <h3 class="mb-6">Пропсы</h3>
        <div class="flex flex-col gap-y-5">
          <BaseInput
            v-model="leftText"
            :label="`${switcherButtonSwitcherPropName}.${switcherButtonSwitcherLeftPropName}.${switcherButtonSwitcherTextPropName}`"
            :size="Size.XS"
          />
          <BaseInput
            v-model="leftValue"
            :label="`${switcherButtonSwitcherPropName}.${switcherButtonSwitcherLeftPropName}.${switcherButtonSwitcherValuePropName}`"
            :size="Size.XS"
          />
          <BaseInput
            v-model="rightText"
            :label="`${switcherButtonSwitcherPropName}.${switcherButtonSwitcherRightPropName}.${switcherButtonSwitcherTextPropName}`"
            :size="Size.XS"
          />
          <BaseInput
            v-model="rightValue"
            :label="`${switcherButtonSwitcherPropName}.${switcherButtonSwitcherRightPropName}.${switcherButtonSwitcherValuePropName}`"
            :size="Size.XS"
          />
        </div>
      </div>
      <div>
        <p class="text-size-5 text-grey-1 block">Кнопка</p>
        <p class="text-size-5 text-grey-1 mb-2.5 block">{{ selectedValue }}</p>
        <div
          class="border-blueGrey-4 min-h-25 relative flex max-h-screen items-center justify-center rounded-md border px-4 py-1"
        >
          <SwitcherButton
            ref="iconTextButtonRef"
            v-bind="iconSwitcherButtonProps"
            v-model="iconSwitcherButtonProps.modelValue"
            class="mx-auto max-w-full"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'SwitcherButtonPageLiveDemo',
};
</script>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { Size } from '@libs/components/enums';
import { BaseInput } from '@libs/components/inputs';
import { SwitcherButton } from '@libs/components/buttons';
import type { ISwitcherButtonProps } from '@libs/components/buttons-types';

const iconTextButtonRef = ref();
const iconSwitcherButtonProps = ref<ISwitcherButtonProps<string>>({
  modelValue: 'value1',
  switcher: { left: { text: 'text1', value: 'value1' }, right: { text: 'text2', value: 'value2' } },
});
const selectedValue = computed(() => `Selected value: ${iconSwitcherButtonProps.value.modelValue}`);

const switcherButtonSwitcherPropName: keyof Pick<ISwitcherButtonProps<string>, 'switcher'> = 'switcher';
const switcherButtonSwitcherLeftPropName: keyof Pick<ISwitcherButtonProps<string>['switcher'], 'left'> = 'left';
const switcherButtonSwitcherRightPropName: keyof Pick<ISwitcherButtonProps<string>['switcher'], 'right'> = 'right';
const switcherButtonSwitcherTextPropName: keyof Pick<ISwitcherButtonProps<string>['switcher']['left'], 'text'> = 'text';
const switcherButtonSwitcherValuePropName: keyof Pick<ISwitcherButtonProps<string>['switcher']['left'], 'value'> =
  'value';

const leftText = computed<string>({
  get() {
    return (
      iconTextButtonRef.value?.$props[switcherButtonSwitcherPropName][switcherButtonSwitcherLeftPropName][
        switcherButtonSwitcherTextPropName
      ] ?? ''
    );
  },
  set(newValue) {
    iconSwitcherButtonProps.value.switcher.left.text = newValue;
  },
});

const leftValue = computed<string>({
  get() {
    return (
      iconTextButtonRef.value?.$props[switcherButtonSwitcherPropName][switcherButtonSwitcherLeftPropName][
        switcherButtonSwitcherValuePropName
      ] ?? ''
    );
  },
  set(newValue) {
    iconSwitcherButtonProps.value.switcher.left.value = newValue;
  },
});

const rightText = computed<string>({
  get() {
    return (
      iconTextButtonRef.value?.$props[switcherButtonSwitcherPropName][switcherButtonSwitcherRightPropName][
        switcherButtonSwitcherTextPropName
      ] ?? ''
    );
  },
  set(newValue) {
    iconSwitcherButtonProps.value.switcher.right.text = newValue;
  },
});

const rightValue = computed<string>({
  get() {
    return (
      iconTextButtonRef.value?.$props[switcherButtonSwitcherPropName][switcherButtonSwitcherRightPropName][
        switcherButtonSwitcherValuePropName
      ] ?? ''
    );
  },
  set(newValue) {
    iconSwitcherButtonProps.value.switcher.right.value = newValue;
  },
});
</script>
