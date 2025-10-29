<template>
  <div>
    <div class="grid grid-cols-2 gap-5">
      <div>
        <h3 class="mb-6">Пропсы</h3>
        <div class="flex flex-col gap-y-5">
          <BaseInput
            v-model="text"
            :label="textButtonTextPropName"
            :size="Size.XS"
          />
          <ButtonSizeSelect
            v-model="textButtonProps"
            :button-ref="textButtonRef"
          />
          <ButtonColorSelect
            v-model="textButtonProps"
            :button-ref="textButtonRef"
          />
          <ButtonTypeSelect
            v-model="textButtonProps"
            :button-ref="textButtonRef"
          />
          <ButtonDisabledCheckbox
            v-model="textButtonProps"
            :button-ref="textButtonRef"
          />
          <ButtonLoadingCheckbox
            v-model="textButtonProps"
            :button-ref="textButtonRef"
          />
        </div>
      </div>
      <div>
        <p class="text-size-5 text-grey-1 mb-2.5 block">Кнопка</p>
        <div
          class="border-blueGrey-4 min-h-25 flex max-h-screen items-center justify-center rounded-md border px-4 py-1"
        >
          <TextButton
            v-bind="textButtonProps"
            ref="textButtonRef"
            class="mx-auto max-w-full"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'TextButtonPageLiveDemo',
};
</script>

<script setup lang="ts">
import { computed, ref } from 'vue';
import ButtonSizeSelect from '../button-prop-changer/ButtonSizeSelect.vue';
import ButtonColorSelect from '../button-prop-changer/ButtonColorSelect.vue';
import ButtonTypeSelect from '../button-prop-changer/ButtonTypeSelect.vue';
import ButtonDisabledCheckbox from '../button-prop-changer/ButtonDisabledCheckbox.vue';
import ButtonLoadingCheckbox from '../button-prop-changer/ButtonLoadingCheckbox.vue';
import { BaseInput } from '@libs/components/inputs';
import { TextButton } from '@libs/components/buttons';
import { Size } from '@libs/components/enums';
import type { ITextButtonProps } from '@libs/components/buttons-types';

const textButtonRef = ref();
const textButtonProps = ref<ITextButtonProps>({ text: '' });
const textButtonTextPropName: keyof Pick<ITextButtonProps, 'text'> = 'text';

const text = computed<string>({
  get() {
    return textButtonRef.value?.$props[textButtonTextPropName] ?? '';
  },
  set(newValue) {
    textButtonProps.value.text = newValue;
  },
});
</script>
