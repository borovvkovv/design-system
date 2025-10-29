<template>
  <div class="flex justify-between">
    <div class="flex items-center gap-x-1">
      <AppLink
        v-if="maxPages > 1"
        :link-style="LinksStyles.Style9"
        :is-disabled="currentPage === FIRST_PAGE_NUMBER"
      >
        <AppIcon
          :icon="IconName.IconArrowLeft"
          :size="16"
          @click="() => updateRange(currentPage - 1)"
        />
      </AppLink>
      <Page
        v-if="isFirstPageVisible"
        :page-number="FIRST_PAGE_NUMBER"
        :current-page="currentPage"
        @click:page="updateRange"
      />
      <div
        v-if="isGapBetweenFirstAndCurrentPage"
        :class="['bg-white', 'h-8 min-w-8', 'flex shrink-0 grow-0 items-center justify-center']"
      >
        ...
      </div>
      <Page
        v-for="page in currentRange"
        :key="page"
        :page-number="page"
        :current-page="currentPage"
        @click:page="updateRange"
      />
      <div
        v-if="isGapBetweenLastAndCurrentPage"
        :class="['bg-white', 'h-8 min-w-8', 'flex shrink-0 grow-0 items-center justify-center']"
      >
        ...
      </div>
      <Page
        v-if="isLastPageVisible"
        :page-number="maxPages"
        :current-page="currentPage"
        @click:page="updateRange"
      />
      <AppLink
        v-if="maxPages > 1"
        :link-style="LinksStyles.Style9"
        :is-disabled="currentPage === maxPages"
      >
        <AppIcon
          :icon="IconName.IconArrowRight"
          :size="16"
          @click="() => updateRange(currentPage + 1)"
        />
      </AppLink>
    </div>
    <PageRowsCounter
      v-model:items-per-page="itemsPerPageLocal"
      :items-per-page-list="ITEMS_PER_PAGE_LIST"
      :total-items="totalItems"
      :current-page="currentPage"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import AppLink from '@comp/components/app-link/AppLink.vue';
import { LinksStyles } from '@comp/components/app-link/utils/models';
import AppIcon from '@comp/components/AppIcon.vue';
import { IconName } from '@comp/components/icons/utils/models';
import Page from './Page.vue';
import PageRowsCounter from './PageRowsCounter.vue';
import { getFirstRange, getRangeWithPage } from './utils';
import { FIRST_PAGE_NUMBER, ITEMS_PER_PAGE_LIST, PAGES_IN_RANGE } from './utils/models';

const props = defineProps<{
  maxPages: number;
  itemsPerPage: number;
  currentPage: number;
  totalItems: number;
}>();

const emit = defineEmits<{
  (eventName: 'update:currentPage', newPage: number): void;
  (eventName: 'update:itemsPerPage', newValue: number): void;
}>();

const minPagesInRange = computed(() => Math.min(PAGES_IN_RANGE, props.maxPages));
const currentRange = ref<number[]>(getFirstRange(minPagesInRange.value));
const isFirstPageVisible = computed(() => !currentRange.value.includes(FIRST_PAGE_NUMBER));
const isLastPageVisible = computed(() => !currentRange.value.includes(props.maxPages));
const isGapBetweenFirstAndCurrentPage = computed(
  () => !currentRange.value.includes(FIRST_PAGE_NUMBER + 1) && currentRange.value.length > 1,
);
const isGapBetweenLastAndCurrentPage = computed(
  () => !currentRange.value.includes(props.maxPages - 1) && currentRange.value.length > 1,
);

const currentPageLocal = computed<number>({
  get() {
    return props.currentPage;
  },
  set(newValue): void {
    emit('update:currentPage', newValue);
  },
});

const itemsPerPageLocal = computed<number>({
  get() {
    return props.itemsPerPage;
  },
  set(newValue): void {
    emit('update:itemsPerPage', newValue);
  },
});

const updateRange = (newPage: number) => {
  currentRange.value = getRangeWithPage(
    currentRange.value,
    newPage,
    FIRST_PAGE_NUMBER,
    props.maxPages,
    minPagesInRange.value,
  );
  currentPageLocal.value = newPage;
};

const resetPaginator = () => {
  currentPageLocal.value = FIRST_PAGE_NUMBER;
  currentRange.value = getFirstRange(minPagesInRange.value);
};

watch([itemsPerPageLocal, () => props.maxPages], () => resetPaginator());
</script>
