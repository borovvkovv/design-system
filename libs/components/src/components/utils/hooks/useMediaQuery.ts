import { ref, type MaybeRef, watchEffect, unref, getCurrentScope, onScopeDispose } from 'vue';

export function useMediaQuery(query: MaybeRef<string>) {
  let mediaQuery: MediaQueryList | undefined;
  const matches = ref(false);

  const handler = (event: MediaQueryListEvent) => {
    matches.value = event.matches;
  };

  const cleanup = () => {
    if (!mediaQuery) return;
    mediaQuery.removeEventListener('change', handler);
  };

  const stopWatch = watchEffect(() => {
    cleanup();
    mediaQuery = window.matchMedia(unref(query));
    mediaQuery.addEventListener('change', handler);
    matches.value = mediaQuery.matches;
  });

  tryOnScopeDispose(() => {
    stopWatch();
    cleanup();
    mediaQuery = undefined;
  });

  return matches;
}

export function tryOnScopeDispose(fn: () => void) {
  if (getCurrentScope()) {
    onScopeDispose(fn);
    return true;
  }
  return false;
}
