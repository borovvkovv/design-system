<template>
  <div>
    <div class="grid grid-cols-2 gap-5">
      <div>
        <h3 class="mb-6">Пропсы</h3>
        <div class="flex flex-col gap-y-5">
          <BaseInput
            v-model="text"
            :label="iconTextButtonTextPropName"
            :size="Size.XS"
          />
          <SimpleSelect
            v-model="selectedIconOption"
            :options="iconOptions"
            :size="Size.XS"
            :label="iconTextButtonIconNamePropName"
          />
          <SimpleSelect
            v-model="selectedIconPosition"
            :options="iconPositionOptions"
            :size="Size.XS"
            :label="iconTextButtonIconPositionPropName"
          />
          <ButtonSizeSelect
            v-model="iconTextButtonProps"
            :button-ref="iconTextButtonRef"
          />
          <ButtonColorSelect
            v-model="iconTextButtonProps"
            :button-ref="iconTextButtonRef"
          />
          <ButtonTypeSelect
            v-model="iconTextButtonProps"
            :button-ref="iconTextButtonRef"
          />
          <BaseInput
            v-model="forProp"
            :label="iconTextButtonForPropName"
            :size="Size.XS"
          />
          <ButtonDisabledCheckbox
            v-model="iconTextButtonProps"
            :button-ref="iconTextButtonRef"
          />
          <ButtonLoadingCheckbox
            v-model="iconTextButtonProps"
            :button-ref="iconTextButtonRef"
          />
        </div>
      </div>
      <div>
        <p class="text-size-5 text-grey-1 mb-2.5 block">Кнопка</p>
        <div
          class="border-blueGrey-4 min-h-25 relative flex max-h-screen items-center justify-center rounded-md border px-4 py-1"
        >
          <IconTextButton
            v-bind="iconTextButtonProps"
            ref="iconTextButtonRef"
            class="mx-auto max-w-full"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'IconTextButtonPageLiveDemo',
};
</script>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { Size } from '@libs/components/enums';
import { BaseInput } from '@libs/components/inputs';
import type { IIconTextButtonProps } from '@libs/components/buttons-types';
import { IconPosition } from '@libs/components/buttons-enums';
import ButtonSizeSelect from '../button-prop-changer/ButtonSizeSelect.vue';
import ButtonColorSelect from '../button-prop-changer/ButtonColorSelect.vue';
import ButtonTypeSelect from '../button-prop-changer/ButtonTypeSelect.vue';
import ButtonDisabledCheckbox from '../button-prop-changer/ButtonDisabledCheckbox.vue';
import ButtonLoadingCheckbox from '../button-prop-changer/ButtonLoadingCheckbox.vue';
import { IconName } from '@libs/components/icons-enums';
import { IconComponents } from '@/views/icons/utils/models';
import { SimpleSelect } from '@libs/components/selects';
import type { ISelectItem } from '@libs/components/selects-types';
import { IconTextButton } from '@libs/components/buttons';

const iconTextButtonRef = ref();
const iconTextButtonProps = ref<IIconTextButtonProps>({ iconName: IconName.IconNone, text: '' });

const iconTextButtonIconNamePropName: keyof Pick<IIconTextButtonProps, 'iconName'> = 'iconName';
const iconTextButtonTextPropName: keyof Pick<IIconTextButtonProps, 'text'> = 'text';
const iconTextButtonIconPositionPropName: keyof Pick<IIconTextButtonProps, 'iconPosition'> = 'iconPosition';
const iconTextButtonForPropName: keyof Pick<IIconTextButtonProps, 'for'> = 'for';

type IconPositionProp = Exclude<IIconTextButtonProps['iconPosition'], undefined>;
const iconPositions: { [P in IconPositionProp]: P } = {
  [IconPosition.Left]: IconPosition.Left,
  [IconPosition.Right]: IconPosition.Right,
};

const text = computed<string>({
  get() {
    return iconTextButtonRef.value?.$props[iconTextButtonTextPropName] ?? '';
  },
  set(newValue) {
    iconTextButtonProps.value.text = newValue;
  },
});

const forProp = computed<string>({
  get() {
    return iconTextButtonRef.value?.$props[iconTextButtonForPropName] ?? '';
  },
  set(newValue) {
    iconTextButtonProps.value.for = newValue;
  },
});

const selectedIconOption = computed<ISelectItem<IconName> | undefined>({
  get() {
    return {
      title: iconTextButtonRef.value?.$props[iconTextButtonIconNamePropName] ?? '',
      value: (iconTextButtonRef.value?.$props[iconTextButtonIconNamePropName] ?? '') as IconName,
    };
  },
  set(newValue) {
    if (newValue) iconTextButtonProps.value.iconName = newValue.value;
  },
});

const selectedIconPosition = computed<ISelectItem<IconPosition> | undefined>({
  get() {
    if (iconTextButtonRef.value)
      return {
        title: IconPosition[iconTextButtonRef.value?.$props[iconTextButtonIconPositionPropName]],
        value: iconTextButtonRef.value?.$props[iconTextButtonIconPositionPropName],
      };

    return undefined;
  },
  set(newValue) {
    if (newValue) iconTextButtonProps.value.iconPosition = newValue.value;
  },
});

const iconOptions: ISelectItem<IconName>[] = Object.keys(IconComponents)
  .sort()
  .map((iconName) => ({
    title: iconName,
    value: iconName as IconName,
  }));

const iconPositionOptions: ISelectItem<IconPosition>[] = Object.values(iconPositions)
  .sort()
  .map((iconPosition) => ({
    title: IconPosition[iconPosition],
    value: iconPosition,
  }));
</script>
