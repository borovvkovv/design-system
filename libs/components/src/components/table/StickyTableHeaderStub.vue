<template>
  <div
    ref="stub"
    :class="['shadow-8 fixed left-0 top-0 z-10 bg-white', attrs.class]"
  >
    <div
      v-bind="attrs"
      class="h-full w-full"
    />
  </div>
</template>

<script setup lang="ts">
import { nextTick, onMounted, ref, useAttrs } from 'vue';

const props = defineProps<{
  container: HTMLElement | undefined;
}>();
const attrs = useAttrs();
const stub = ref<HTMLElement | undefined>();
const resizeObserver = new ResizeObserver(() => changeWidthTopContentLayoutContainer());

const changeWidthTopContentLayoutContainer = () => {
  if (props.container && stub.value) {
    stub.value.style.width = `${Math.round(props.container.getBoundingClientRect().right)}px`;
  }
};

onMounted(() => {
  nextTick(() => {
    setTimeout(() => {
      changeWidthTopContentLayoutContainer();
      if (props.container) {
        resizeObserver.observe(props.container);
      }
    }, 0);
  });
});

defineExpose({
  stub,
});
</script>
