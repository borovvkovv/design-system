<template>
  <component
    :is="onIconClick ? AppLink : 'span'"
    :class="['min-h-5 min-w-5', 'flex items-center justify-center', 'shrink-0', !onIconClick && 'text-grey-2']"
    :link-style="LinksStyles.Style6"
    :is-disabled="disabled"
    @click="
      (event: Event) => {
        if (onIconClick) {
          event.preventDefault();
          onIconClick();
        }
      }
    "
  >
    <AppIcon
      :icon="iconName"
      :size="size"
    />
  </component>
</template>

<script setup lang="ts">
import AppLink from '@comp/components/app-link/AppLink.vue';
import AppIcon from '@comp/components/AppIcon.vue';
import type { IBaseInputIconProps } from '@comp/components/inputs/utils/models';
import { LinksStyles } from '@comp/components/app-link/utils/models';

withDefaults(defineProps<IBaseInputIconProps>(), {
  size: 20,
});
</script>
