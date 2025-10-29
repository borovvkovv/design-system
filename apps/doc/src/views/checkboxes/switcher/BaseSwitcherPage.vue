<template>
  <BaseDesignPage :route-name="RouteName.Switcher"><RouterView /></BaseDesignPage>
</template>

<script lang="ts">
export default {
  name: 'BaseSwitcherPage',
};
</script>

<script setup lang="ts">
import { RouteName } from '@/router/enum';
import BaseDesignPage from '@/views/BaseDesignPage.vue';
</script>
