<template>
  <span
    v-for="(span, i) in cell.spans"
    :key="i"
    :class="[
      span.modifier?.text,
      span.modifier?.textColor,
      span.modifier?.textAlign,
      span.modifier?.other,
      span.modifier?.padding,
    ]"
  >
    <template v-if="span.type === 'text'">
      {{ span.text }}
    </template>
    <template v-if="span.type === 'link'">
      <AppLink
        :to="span.href"
        :link-style="LinksStyles.Style7"
        @click="span.click"
      >
        <span :class="span.modifier?.text">{{ span.title }}</span>
      </AppLink>
    </template>
  </span>
</template>

<script setup lang="ts">
import type { TCellTexts } from '@comp/components/table/utils/models';
import { LinksStyles } from '@comp/components/app-link/utils/models';
import AppLink from '@comp/components/app-link/AppLink.vue';

defineProps<{
  cell: TCellTexts;
}>();
</script>
