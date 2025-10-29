<template>
  <IconProfile20
    v-if="size <= 20"
    :size="size"
  />
  <IconProfile24
    v-else
    :size="size"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import type { IconBase } from './utils/models';

defineComponent({
  name: 'IconProfile',
});
</script>

<script setup lang="ts">
import IconProfile20 from '@comp/components/icons/IconProfile20.vue';
import IconProfile24 from '@comp/components/icons/IconProfile24.vue';

withDefaults(defineProps<IconBase>(), { size: 20 });
</script>
