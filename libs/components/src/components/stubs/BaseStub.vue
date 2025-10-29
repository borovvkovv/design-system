<template>
  <div :class="[styles.stub, 'relative w-full']">
    <div :class="['flex h-full w-full items-center justify-center']">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, useCssModule } from 'vue';

const props = defineProps<{
  height?: number;
}>();

const styles = useCssModule();
const stubHeight = computed(() => {
  if (props.height === undefined) {
    return '100%';
  }

  if (props.height === 0) {
    return 'min-content';
  }

  return `${props.height}px`;
});
</script>

<style module lang="scss">
.stub {
  height: v-bind(stubHeight);
}
</style>
