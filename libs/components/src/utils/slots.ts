import type { SetupContext } from 'vue';

export const hasSlot = (name: string, slots: SetupContext['slots']) => !!slots[name];
