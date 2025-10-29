<template>
  <div>
    <div class="grid grid-cols-2 gap-5">
      <div>
        <h3 class="mb-6">Пропсы</h3>
        <div class="flex flex-col gap-y-5">
          <SimpleSelect
            v-model="selectedIconOption"
            :options="iconOptions"
            :size="Size.XS"
            :label="iconButtonIconNamePropName"
          />
          <BaseInput
            v-model="popupText"
            :label="iconButtonPopupTextPropName"
            :size="Size.XS"
          />
          <ButtonSizeSelect
            v-model="iconButtonProps"
            :button-ref="iconButtonRef"
          />
          <ButtonColorSelect
            v-model="iconButtonProps"
            :button-ref="iconButtonRef"
          />
          <ButtonTypeSelect
            v-model="iconButtonProps"
            :button-ref="iconButtonRef"
          />
          <ButtonDisabledCheckbox
            v-model="iconButtonProps"
            :button-ref="iconButtonRef"
          />
          <ButtonLoadingCheckbox
            v-model="iconButtonProps"
            :button-ref="iconButtonRef"
          />
        </div>
      </div>
      <div>
        <p class="text-size-5 text-grey-1 mb-2.5 block">Кнопка</p>
        <div
          class="border-blueGrey-4 min-h-25 flex max-h-screen items-center justify-center rounded-md border px-4 py-1"
        >
          <IconButton
            v-bind="iconButtonProps"
            ref="iconButtonRef"
            class="mx-auto max-w-full"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'IconButtonPageLiveDemo',
};
</script>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { Size } from '@libs/components/enums';
import { BaseInput } from '@libs/components/inputs';
import type { IIconButtonProps } from '@libs/components/buttons-types';
import ButtonSizeSelect from '../button-prop-changer/ButtonSizeSelect.vue';
import ButtonColorSelect from '../button-prop-changer/ButtonColorSelect.vue';
import ButtonTypeSelect from '../button-prop-changer/ButtonTypeSelect.vue';
import ButtonDisabledCheckbox from '../button-prop-changer/ButtonDisabledCheckbox.vue';
import ButtonLoadingCheckbox from '../button-prop-changer/ButtonLoadingCheckbox.vue';
import { IconButton } from '@libs/components/buttons';
import { IconName } from '@libs/components/icons-enums';
import { SimpleSelect } from '@libs/components/selects';
import type { ISelectItem } from '@libs/components/selects-types';
import { IconComponents } from '@/views/icons/utils/models';

const iconButtonRef = ref();
const iconButtonProps = ref<IIconButtonProps>({ iconName: IconName.IconNone });
const iconButtonPopupTextPropName: keyof Pick<IIconButtonProps, 'popupText'> = 'popupText';
const iconButtonIconNamePropName: keyof Pick<IIconButtonProps, 'iconName'> = 'iconName';

const selectedIconOption = computed<ISelectItem<IconName> | undefined>({
  get() {
    return {
      title: iconButtonRef.value?.$props[iconButtonIconNamePropName] ?? '',
      value: (iconButtonRef.value?.$props[iconButtonIconNamePropName] ?? '') as IconName,
    };
  },
  set(newValue) {
    if (newValue) iconButtonProps.value.iconName = newValue.value;
  },
});

const iconOptions: ISelectItem<IconName>[] = Object.keys(IconComponents)
  .sort()
  .map((iconName) => ({
    title: iconName,
    value: iconName as IconName,
  }));

const popupText = computed<string>({
  get() {
    return iconButtonRef.value?.$props[iconButtonPopupTextPropName] ?? '';
  },
  set(newValue) {
    iconButtonProps.value.popupText = newValue;
  },
});
</script>
