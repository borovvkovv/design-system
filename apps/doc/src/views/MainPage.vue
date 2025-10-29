<template>
  <div class="flex h-full flex-col">
    <div class="bg-grey-5 px-10 pt-8">
      <BaseHeader
        v-if="header"
        v-bind="header"
      />
    </div>
    <div class="pb-18 mx-10 mt-12 grow">
      <h1>{{ i18n.global.t('mainPage') }}</h1>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'MainPage',
};
</script>

<script setup lang="ts">
import i18n from '@/translations';
import { RouteName } from '@/router/enum';
import BaseHeader from '@/components/base-header/BaseHeader.vue';
import { useDesignSystemRoutes } from '@/router/hooks/useDesignSystemRoutes';

const header = useDesignSystemRoutes(RouteName.Main);
</script>
