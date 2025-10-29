<template>
  <div class="flex w-fit flex-col gap-y-12">
    <div>
      <h4 class="mb-6">{{ propStates.title }}</h4>
      <div class="mb-13 flex gap-3">
        <div
          v-for="(propState, propStateIndex) in propStates.states"
          :key="propStateIndex"
        >
          <p class="text-desktop-5">{{ propState.stateName }}</p>
          <component
            :is="component"
            v-bind="propState.stateValue"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'PropExampleState',
};
</script>

<script setup lang="ts" generic="T">
import type { ComponentPropStates } from '@/views/utils/models';
import type { Component } from 'vue';

defineProps<{
  propStates: ComponentPropStates<T>;
  component: Component;
}>();
</script>
