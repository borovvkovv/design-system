<template>
  <SimpleSelect
    :model-value="sizeMode"
    :options="inactiveRuleOptions"
    :size="Size.XS"
    :label="isInactiveRulePropName"
    @update:model-value="
      (newValue) => {
        sizeMode = newValue;
      }
    "
  />
</template>

<script lang="ts">
export default {
  name: 'IsInactiveRuleSelect',
};
</script>

<script setup lang="ts">
import { computed } from 'vue';
import { Size } from '@libs/components/enums';
import type { ISelectItem } from '@libs/components/selects-types';
import { SimpleSelect } from '@libs/components/selects';
import type { ICalendarSelectProps } from '@libs/components/inputs-types';
import { InactiveRule, inactiveRuleErrorTexts } from '../utils/models';

const inactiveRuleKey = defineModel<InactiveRule>();

const isInactiveRulePropName: keyof Pick<ICalendarSelectProps, 'isInactiveRule'> = 'isInactiveRule';

const inactiveRuleOptions: ISelectItem<InactiveRule>[] = Object.values(InactiveRule).map((inactiveRule) => ({
  title: inactiveRuleErrorTexts[inactiveRule],
  value: inactiveRule,
}));

const sizeMode = computed<ISelectItem<InactiveRule> | undefined>({
  get() {
    return inactiveRuleKey.value
      ? {
          title: inactiveRuleErrorTexts[inactiveRuleKey.value],
          value: inactiveRuleKey.value,
        }
      : undefined;
  },
  set(newValue) {
    inactiveRuleKey.value = newValue?.value;
  },
});
</script>
