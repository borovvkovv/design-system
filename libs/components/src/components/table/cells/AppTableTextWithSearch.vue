<template>
  <template v-if="isCellWithSearch">
    <span
      v-for="(result, resultIndex) in searchResult"
      :key="resultIndex"
      v-bind="attrs"
      :class="['whitespace-pre', getTextColor(result)]"
    >
      {{ result.text }}
    </span>
  </template>
  <template v-else>
    <span>{{ text }}</span>
  </template>
</template>

<script setup lang="ts">
import { computed, useAttrs } from 'vue';
import { getColoredSearchResult, getTextColor } from '@comp/components/selects/utils';
import { type IColorText, TextColorType } from '@comp/components/selects/utils/models';

const props = defineProps<{
  text: string;
  pattern?: string;
  splitToChars?: boolean;
}>();

const isCellWithSearch = computed(() => props.pattern !== undefined);
const attrs = useAttrs();

const searchResult = computed<IColorText[]>(() =>
  getColoredSearchResult(props.text, props.pattern ?? '', TextColorType.Text, props.splitToChars),
);
</script>
