<template>
  <BaseDesignPage :route-name="RouteName.CalendarDropdown"><RouterView /></BaseDesignPage>
</template>

<script lang="ts">
export default {
  name: 'BaseCalendarPage',
};
</script>

<script setup lang="ts">
import { RouteName } from '@/router/enum';
import BaseDesignPage from '@/views/BaseDesignPage.vue';
</script>
