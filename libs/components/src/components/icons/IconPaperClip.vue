<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12.0891 6.2842L7.07396 11.3865C6.51576 11.9545 6.50243 12.8608 7.04369 13.4449V13.4449C7.62543 14.0726 8.6151 14.0828 9.20961 13.4671L15.0367 7.43245C16.1382 6.29168 16.1567 4.48911 15.0788 3.32596V3.32596C13.9097 2.06435 11.9195 2.0478 10.7296 3.28978L4.93757 9.3352C3.28771 11.0572 3.26517 13.7666 4.88616 15.5158V15.5158C6.64117 17.4097 9.62545 17.4446 11.4243 15.5923L15.9326 10.9502"
      stroke="currentColor"
      stroke-linecap="round"
    />
  </svg>
</template>

<script setup lang="ts">
import { type IconBase } from '@comp/components/icons/utils/models';

withDefaults(defineProps<IconBase>(), { size: 20 });
</script>
