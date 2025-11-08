<template>
  <div class="bg-blue-2 relative">
    <div
      ref="logoCollapsed"
      :class="['bg-darkBlue-2 absolute inset-0', isInitiallyCollapsed ? 'opacity-100' : 'opacity-0']"
    >
      <IconGazpromSmall class="absolute left-3.5 top-6" />
    </div>
    <IconGazprom class="w-32.5 h-30 mx-auto" />
    <!-- <img
      src="./logo.svg"
      class="w-32.5 mx-auto"
    /> -->
    <IconNone />
  </div>
</template>

<script setup lang="ts">
import { ref, useCssModule } from 'vue';
import { IconNone } from '@libs/components/icons';
import { changeCollapse } from '@/components/side-bar/utils';
import { SIDE_BAR_ANIMATION_DURATION_MS } from '@/components/side-bar/utils/models';
import IconGazpromSmall from '../icons/IconGazpromSmall.vue';
import IconGazprom from '../icons/IconGazprom.vue';

const props = defineProps<{
  isInitiallyCollapsed: boolean;
  isCollapsed: boolean;
}>();

const logoCollapsed = ref<HTMLElement | undefined>();
const styles = useCssModule();

defineExpose({
  collapse: () =>
    changeCollapse(logoCollapsed.value, 'collapse', props.isInitiallyCollapsed, props.isCollapsed, styles),
});
</script>

<style module lang="scss">
.collapse {
  transition: all v-bind('`${SIDE_BAR_ANIMATION_DURATION_MS}ms`');
  @apply opacity-100;
}

.collapse_back {
  transition: all v-bind('`${SIDE_BAR_ANIMATION_DURATION_MS}ms`');
  @apply opacity-0;
}
</style>
