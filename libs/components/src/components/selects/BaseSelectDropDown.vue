<template>
  <BaseDropDown
    ref="baseDropDown"
    @on:open="(isVisible) => emit('on:open', isVisible)"
    @before:visible="() => emit('before:visible')"
  >
    <template #input="{ toggleDropDown }">
      <slot
        name="input"
        :toggle-drop-down="toggleDropDown"
        :set-drop-down-visibility="setDropDownVisibility"
        :is-drop-down-visible="isDropDownOpened"
      />
    </template>
    <template #dropDown="{ registerCallSection, unregisterCallSection }">
      <div
        v-if="isDropDownOpened"
        ref="dropdown"
        :class="[
          isDropDownFixed ? 'fixed' : 'absolute',
          'z-20 mt-1 h-fit',
          isDropDownVisible ? 'visible' : 'invisible',
          isFullWidthDropDown && 'w-full',
        ]"
      >
        <slot
          name="dropDown"
          :register-call-section="() => onRegisterCallSectionHandler(registerCallSection)"
          :unregister-call-section="() => onUnregisterCallSectionHandler(unregisterCallSection)"
          :set-drop-down-visibility="setDropDownVisibility"
        />
      </div>
    </template>
  </BaseDropDown>
</template>

<script setup lang="ts">
import { computed, ref, unref } from 'vue';
import { getScrollElementToProvider } from '@comp/utils/scroll';
import BaseDropDown from '@comp/components/dropdown-menu/BaseDropDown.vue';

const props = defineProps<{
  isFullWidthDropDown?: boolean;
  isDropDownFixed?: boolean;
}>();

const emit = defineEmits<{
  (e: 'on:open', isVisible: boolean): void;
  (e: 'before:visible'): void;
}>();

const baseDropDown = ref<InstanceType<typeof BaseDropDown>>();
const dropdown = ref<HTMLElement | undefined>();
const scrollElement = getScrollElementToProvider();
const setDropDownVisibility = (isVisible: boolean) => baseDropDown.value?.setDropDownVisibility(isVisible);
const isDropDownOpened = computed(() => baseDropDown.value?.isDropDownOpened);
const isDropDownVisible = computed(() => baseDropDown.value?.isDropDownVisible);
const closeDropDown = () => setDropDownVisibility(false);

const onRegisterCallSectionHandler = (registerCallSection: () => void) => {
  registerCallSection();

  if (props.isDropDownFixed) {
    window.addEventListener('resize', closeDropDown);
    unref(scrollElement)?.addEventListener('scroll', closeDropDown);
  }
};

const onUnregisterCallSectionHandler = (unregisterCallSection: () => void) => {
  unregisterCallSection();

  if (props.isDropDownFixed) {
    window.removeEventListener('resize', closeDropDown);
    unref(scrollElement)?.removeEventListener('scroll', closeDropDown);
  }
};

defineExpose({
  isDropDownShown: isDropDownOpened,
  setDropDownVisibility,
  dropdown,
});
</script>
