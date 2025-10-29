<template>
  <BaseDesignPage :route-name="RouteName.SmartInput"><RouterView /></BaseDesignPage>
</template>

<script lang="ts">
export default {
  name: 'BaseSmartInputPage',
};
</script>

<script setup lang="ts">
import { RouteName } from '@/router/enum';
import BaseDesignPage from '@/views/BaseDesignPage.vue';
</script>
