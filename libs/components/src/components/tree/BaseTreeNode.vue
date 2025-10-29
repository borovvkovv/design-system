<template>
  <div class="flex flex-col">
    <div class="relative flex">
      <div
        v-if="isChildNode"
        class="absolute h-full w-10 shrink-0"
      >
        <div class="relative flex h-full flex-col items-center justify-stretch">
          <div :class="['border-blueGrey-4 absolute -left-7 border-l', isLastNode ? 'h-5' : 'h-full']" />
          <div class="border-blueGrey-4 absolute -left-7 top-5 w-7 border-b" />
        </div>
      </div>
      <div class="flex flex-col">
        <BaseNode
          v-bind="$props"
          :icon="icon"
          class="shrink-0"
          :state="state"
          @on-button-click="onNodeClickHandler"
        />
        <div
          v-if="hasSlot('childNodes', slots) && (isContentVisible || (isRelativeNodesConnected && !isLastNode))"
          class="border-blueGrey-4 ml-5 h-full min-h-5 border-l"
        />
        <div
          v-else
          class="h-5"
        />
      </div>
      <div :class="['ml-4 flex w-full flex-col overflow-clip', !hasSlot('content', slots) && 'pb-5']">
        <div
          class="flex min-h-10 cursor-pointer items-center"
          @click="onNodeClickHandler"
        >
          <slot name="title" />
        </div>
        <div v-if="isContentVisible && hasSlot('content', slots)">
          <slot name="content" />
        </div>
      </div>
    </div>
    <div
      v-if="hasSlot('childNodes', slots) && isContentVisible"
      class="relative pl-12"
    >
      <slot name="childNodes" />
      <div
        v-if="!isLastNode && isChildNode"
        :class="[
          'border-blueGrey-4 absolute -left-7 top-0 border-l',
          isLastNode && !isRelativeNodesConnected ? 'h-5' : 'h-full',
        ]"
      />
      <div
        v-if="!isLastNode && isRelativeNodesConnected"
        :class="['border-blueGrey-4  absolute left-5 top-0 h-full border-l']"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, useSlots } from 'vue';
import BaseNode from '@comp/components/tree/BaseNode.vue';
import { IconName } from '@comp/components/icons/utils/models';
import { AccountingNodeEquipStateCheck } from '@comp/components/tree/utils/models';
import { hasSlot } from '@comp/utils/slots';

const isContentVisible = ref(false);

withDefaults(
  defineProps<{
    state?: AccountingNodeEquipStateCheck;
    isLastNode?: boolean;
    isDisabled?: boolean;
    isChildNode?: boolean;
    icon?: IconName;
    isRelativeNodesConnected?: boolean;
  }>(),
  {
    state: AccountingNodeEquipStateCheck.None,
    isLastNode: false,
    isDisabled: false,
    isChildNode: false,
    icon: IconName.IconParentNode,
    isRelativeNodesConnected: false,
  },
);

const emit = defineEmits<{
  (eventName: 'click:node'): void;
}>();

const slots = useSlots();

const onNodeClickHandler = () => {
  isContentVisible.value = !isContentVisible.value;
  emit('click:node');
};
</script>
