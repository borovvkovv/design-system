<template>
  <div>
    <slot
      name="input"
      :toggle-drop-down="() => (isOpen = !isOpen)"
    />
    <div
      :data-parent="dataAttributeId"
      class="relative"
    >
      <slot
        name="dropDown"
        :register-call-section="registerCallSection"
        :unregister-call-section="unregisterCallSection"
        :is-drop-down-opened="isOpen"
        :set-drop-down-visibility="setDropDownVisibility"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, ref } from 'vue';
import { createGuid } from '@comp/utils/guid';

const emit = defineEmits<{
  (e: 'on:open', isVisible: boolean): void;
  (e: 'before:visible'): void;
}>();

const isOpenRef = ref(false);
const isVisibleRef = ref(false);
const dataAttributeId = ref(createGuid());

const isOpen = computed({
  get(): boolean {
    return isOpenRef.value;
  },
  set(isVisible: boolean): void {
    isOpenRef.value = isVisible;
    emit('on:open', isVisible);

    if (isVisible) {
      nextTick(() =>
        setTimeout(() => {
          emit('before:visible');
          nextTick(() => (isVisibleRef.value = true));
        }, 0),
      );
    } else isVisibleRef.value = false;
  },
});

const handleKeyDown = (evt: KeyboardEvent) => {
  if (evt.key === 'Escape') isOpen.value = false;
  evt.stopPropagation();
};

const handleClick = (evt: MouseEvent) => {
  const target = evt.target as HTMLElement;

  if (!target.closest(`div[data-parent="${dataAttributeId.value}"]`)) {
    isOpen.value = false;
    evt.stopPropagation();
  }
};

const registerCallSection = () => {
  window.addEventListener('click', handleClick, { capture: true });
  window.addEventListener('keydown', handleKeyDown, { capture: true });
};

const unregisterCallSection = () => {
  window.removeEventListener('click', handleClick, { capture: true });
  window.removeEventListener('keydown', handleKeyDown, { capture: true });
};

const setDropDownVisibility = (isVisible: boolean): void => {
  isOpen.value = isVisible;
};

defineExpose({
  isDropDownOpened: isOpen,
  setDropDownVisibility,
  isDropDownVisible: isVisibleRef,
});
</script>
