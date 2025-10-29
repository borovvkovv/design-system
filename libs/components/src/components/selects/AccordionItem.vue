<template>
  <div>
    <BaseSimpleDropDown :is-disabled="isDisabled">
      <template #title="{ isDropDownShown, setDropDownVisibility }">
        <div
          class="flex items-start justify-between gap-x-10 py-4"
          data-test="baseSimpleDropDownTitleSlot"
          @mouseenter="() => (isTitleHover = true)"
          @mouseleave="() => (isTitleHover = false)"
        >
          <div class="mx-4">
            <slot
              name="title"
              :is-item-hover="isTitleHover"
            />
          </div>
          <div class="mx-4 flex gap-x-3">
            <template
              v-for="(action, actionIndex) in actions"
              :key="actionIndex"
            >
              <AccordionItemAction
                :action
                :is-item-hover="isTitleHover"
              />
            </template>
            <div class="w-4">
              <AccordionItemAction
                :action="{
                  icon: isDropDownShown ? IconName.IconArrowUpTriangle : IconName.IconArrowDownTriangle,
                  onIconClick: () => setDropDownVisibility(!isDropDownShown),
                  isActive: activeArrowOnTitleHover ? isTitleHover : false,
                  isAlwaysVisible: true,
                  title: isDropDownShown ? 'Свернуть' : 'Развернуть',
                }"
                :is-item-hover="isTitleHover"
              />
            </div>
          </div>
        </div>
      </template>
      <template #dropDown>
        <slot name="dropDown" />
      </template>
    </BaseSimpleDropDown>
  </div>
</template>

<script setup lang="ts" generic="T">
import { ref } from 'vue';
import { IconName } from '@comp/components/icons/utils/models';
import BaseSimpleDropDown from '@comp/components/selects/BaseSimpleDropDown.vue';
import type { IAccordionProps } from '@comp/components/selects/utils/models';
import AccordionItemAction from './AccordionItemAction.vue';

withDefaults(defineProps<IAccordionProps<T>>(), {
  isDisabled: false,
  activeArrowOnTitleHover: true,
});

const isTitleHover = ref<boolean>(false);
</script>
