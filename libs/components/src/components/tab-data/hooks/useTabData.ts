import type { TTabBase } from '@comp/components/tab-data/utils/models';
import type { ComputedRef } from 'vue';
import { computed, ref } from 'vue';

export const useTabData = <T>(tabs: ComputedRef<TTabBase<T>[] | null>) => {
  const activeTitle = ref<string | null>();
  const activeTab = computed<TTabBase<T> | undefined>(() => {
    const existTabActiveTab = tabs.value?.find((tab) => tab.title === activeTitle.value);
    if (!activeTitle.value || !existTabActiveTab) {
      activeTitle.value = tabs.value?.[0]?.title;
    }

    return tabs.value?.find((tab) => tab.title === activeTitle.value);
  });
  const tabTitles = computed(() => tabs.value?.map((tab) => tab.title));
  const changeTab = (newTabTitle: string) => {
    activeTitle.value = newTabTitle;
  };

  return {
    activeTab,
    changeTab,
    tabTitles,
  };
};
