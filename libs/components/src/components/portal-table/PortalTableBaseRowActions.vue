<template>
  <div class="bg-white">
    <div
      :class="[
        'flex h-full w-full flex-nowrap gap-x-2',
        actionsSection.modifier?.border ?? 'border-l',
        actionsSection.modifier?.padding ?? 'p-3',
        actionsSection.modifier?.other,
      ]"
    >
      <PortalTableBaseRowAction
        v-for="(action, actionIndex) in actionsSection.actions"
        :key="actionIndex"
        :row-action="action"
      />
    </div>
  </div>
</template>

<script setup lang="ts" generic="T">
import type { TRowActionsSection } from '@comp/components/portal-table/utils/models';
import PortalTableBaseRowAction from '@comp/components/portal-table/PortalTableBaseRowAction.vue';

defineProps<{
  actionsSection: TRowActionsSection<T>;
}>();
</script>
