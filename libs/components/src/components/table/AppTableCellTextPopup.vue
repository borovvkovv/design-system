<template>
  <AppTableBaseTextPopup
    ref="popupRef"
    :text
    class="z-20"
  />
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import AppTableBaseTextPopup from '@comp/components/table/AppTableBaseTextPopup.vue';

defineProps<{
  text: string;
}>();

const popupRef = ref<InstanceType<typeof AppTableBaseTextPopup>>();

const showPopup = (evt: MouseEvent) => {
  popupRef.value?.showPopupElementEventHandler?.(evt);
};

const closePopup = () => popupRef.value?.closePopup?.();
const startCheckIfPointerReachPopup = computed(() => popupRef.value?.startCheckIfPointerReachPopup);

defineExpose({
  showPopup,
  closePopup,
  startCheckIfPointerReachPopup,
});
</script>
