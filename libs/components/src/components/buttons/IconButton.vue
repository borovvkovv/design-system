<template>
  <BaseButton
    v-bind="attrs"
    :size="props.size"
    :color="color"
    :is-disabled="isDisabled"
    :type="type"
    :class="buttonPaddingX"
    @button-click="emit('buttonClick')"
    @mouseenter="showPopup"
    @mouseleave="() => popupInsideContainer?.closePopup?.()"
  >
    <span :class="style.container">
      <span :class="iconStyles">
        <AppIcon
          :icon="icon"
          :size="iconSize"
        />
      </span>
    </span>
  </BaseButton>

  <PopupInsideContainer
    v-if="popupText"
    ref="popupInsideContainer"
    :to-top-from-pointer-px="12"
    :translate-x-percent="-50"
    class="max-w-106 shadow-4 fixed rounded-md bg-white px-3 py-2 text-left"
  >
    <span class="text-size-6 text-black-1 whitespace-nowrap">{{ popupText }}</span>
  </PopupInsideContainer>
</template>

<script setup lang="ts">
import { computed, ref, useAttrs, useCssModule } from 'vue';
import type { IIconButtonProps } from '@comp/components/buttons/utils/models';
import BaseButton from '@comp/components/buttons/BaseButton.vue';
import AppIcon from '@comp/components/AppIcon.vue';
import getButtonIconStyles from '@comp/components/buttons/utils/getButtonIconStyles';
import { Size } from '@comp/enums';
import { IconName } from '@comp/components/icons/utils/models';
import PopupInsideContainer from '@comp/components/popup/PopupInsideContainer.vue';

const props = withDefaults(defineProps<IIconButtonProps>(), {
  isLoading: false,
});
const emit = defineEmits<{
  (e: 'buttonClick'): void;
}>();

const attrs = useAttrs();
const style = useCssModule();
const iconStyles = computed(() => getButtonIconStyles(style, props.size));
const iconSize = computed(() => (props.size === Size.XS ? 16 : 20));
const icon = computed(() => (props.isLoading ? IconName.IconLoading : props.iconName));
const buttonPaddingX = computed(() => {
  switch (props.size) {
    case Size.M:
      return 'px-3.5';
    case Size.S:
      return 'px-2.5';
    case Size.XS:
      return 'px-1.5';
    default:
      return 'px-3.5';
  }
});
const popupInsideContainer = ref<InstanceType<typeof PopupInsideContainer>>();

const showPopup = (evt: MouseEvent) => {
  popupInsideContainer.value?.showPopupElementEventHandler?.(evt, 'top');
};
</script>

<style module lang="scss">
@use 'styles/button-icon' as *;
@use 'styles/button-container' as *;
</style>
