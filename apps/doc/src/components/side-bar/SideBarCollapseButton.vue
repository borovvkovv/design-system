<template>
  <AppLink
    class="group relative flex items-center gap-x-4 px-3 py-3"
    @click="() => emit('click:collapse')"
  >
    <AppIcon
      :icon="isCollapsed ? IconName.IconArrowRight : IconName.IconArrowLeft"
      :size="16"
      class="group-hover:text-blueGrey-4 absolute shrink-0 text-white"
    />
    <span
      ref="collapseButtonText"
      :class="['text-size-6 group-hover:text-blueGrey-4 text-left text-white', isInitiallyCollapsed ? 'ml-10' : 'ml-8']"
    >
      {{ $t('sideBar.collapseButton') }}
    </span>
  </AppLink>
</template>

<script setup lang="ts">
import { ref, useCssModule } from 'vue';
import { AppIcon } from '@libs/components';
import { changeCollapse } from '@/components/side-bar/utils';
import { SIDE_BAR_ANIMATION_DURATION_MS } from '@/components/side-bar/utils/models';
import { IconName } from '@libs/components/icons-enums';
import { AppLink } from '@libs/components/app-link';

const props = defineProps<{
  isInitiallyCollapsed: boolean;
  isCollapsed: boolean;
}>();

const emit = defineEmits<{
  (eventName: 'click:collapse'): void;
}>();

const collapseButtonText = ref<HTMLElement | undefined>();
const styles = useCssModule();

defineExpose({
  collapse: () =>
    changeCollapse(collapseButtonText.value, 'collapse', props.isInitiallyCollapsed, props.isCollapsed, styles),
});
</script>

<style module lang="scss">
.collapse {
  transition: all v-bind('`${SIDE_BAR_ANIMATION_DURATION_MS}ms`');
  @apply ml-10;
}

.collapse_back {
  transition: all v-bind('`${SIDE_BAR_ANIMATION_DURATION_MS}ms`');
  @apply ml-8;
}
</style>
