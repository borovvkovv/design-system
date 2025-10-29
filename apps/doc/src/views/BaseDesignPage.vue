<template>
  <div class="flex h-full flex-col">
    <div class="bg-grey-5 px-10 pt-8">
      <BaseHeader
        v-if="header"
        v-bind="header"
      />
    </div>
    <div class="pb-18 mx-10 mt-12 grow">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'BaseDesignPage',
};
</script>

<script setup lang="ts">
import type { RouteNameType } from '@/router/enum/RouteName';
import { useDesignSystemRoutes } from '@/router/hooks/useDesignSystemRoutes';
import BaseHeader from '@/components/base-header/BaseHeader.vue';

const props = defineProps<{
  routeName: RouteNameType;
}>();

const header = useDesignSystemRoutes(props.routeName);
</script>
