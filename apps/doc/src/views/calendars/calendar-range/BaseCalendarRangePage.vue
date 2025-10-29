<template>
  <BaseDesignPage :route-name="RouteName.CalendarRangeDropdown"><RouterView /></BaseDesignPage>
</template>

<script lang="ts">
export default {
  name: 'BaseCalendarRangePage',
};
</script>

<script setup lang="ts">
import { RouteName } from '@/router/enum';
import BaseDesignPage from '@/views/BaseDesignPage.vue';
</script>
