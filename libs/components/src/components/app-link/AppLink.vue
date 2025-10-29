<template>
  <button
    v-if="!to"
    v-bind="attrs"
    :class="classes"
    type="button"
  >
    <slot />
  </button>
  <a
    v-else-if="isExternalLink"
    v-bind="attrs"
    :class="classes"
    :href="href"
    target="_blank"
    :download="downloadFileName"
  >
    <slot />
  </a>
  <RouterLink
    v-else
    v-slot="slotProps"
    v-bind="props"
    :to="props.to ?? ''"
    :active-exact-class="isActiveByRoute ? `link_${linkStyle}__active` : ''"
    :class="classes"
  >
    <slot v-bind="{ isActive: (slotProps.isExactActive && isActiveByRoute) || isActive }" />
  </RouterLink>
</template>

<script setup lang="ts">
import { computed, useAttrs } from 'vue';
import type { ILinkProps } from '@comp/components/app-link/utils/models';
import { LinksStyles } from '@comp/components/app-link/utils/models';
import { RouterLink } from 'vue-router';

const props = withDefaults(defineProps<ILinkProps>(), {
  isDisabled: false,
  linkStyle: LinksStyles.Style1,
});
const attrs = useAttrs();
const isExternalLink = computed(
  () =>
    typeof props.to === 'string' &&
    (props.to.startsWith('http') ||
      props.downloadFileName ||
      props.isDownloadFile ||
      props.to.startsWith('mailto:') ||
      props.to.startsWith('tel:')),
);
const href = computed(() => {
  if (
    typeof props.to === 'string' &&
    (props.to.startsWith('http') ||
      props.downloadFileName ||
      props.isDownloadFile ||
      props.to.startsWith('mailto:') ||
      props.to.startsWith('tel:'))
  ) {
    return props.to;
  }

  return undefined;
});

const classes = computed(() => [
  `link_${props.linkStyle}`,
  props.isActive ? `link_${props.linkStyle}__active` : '',
  props.isDisabled ? `link_${props.linkStyle}__disabled` : '',
]);
</script>
