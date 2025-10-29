<template>
  <BaseDesignPage :route-name="RouteName.SwitcherButton"><RouterView /></BaseDesignPage>
</template>

<script lang="ts">
export default {
  name: 'BaseSwitcherButtonPage',
};
</script>

<script setup lang="ts">
import { RouteName } from '@/router/enum';
import BaseDesignPage from '@/views/BaseDesignPage.vue';
</script>
