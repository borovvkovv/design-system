type State = {
  observers: MockedResizeObserver[];
};

const state: State = {
  observers: [],
};

class MockedResizeObserver implements ResizeObserver {
  callback: ResizeObserverCallback;
  observationTargets = new Set<HTMLElement>();

  constructor(callback: ResizeObserverCallback) {
    this.callback = callback;
    state.observers.push(this);
  }

  observe = (node: HTMLElement) => this.observationTargets.add(node);
  unobserve = (node: HTMLElement) => this.observationTargets.delete(node);
  disconnect = () => {};
}

const elementToResizeObserverEntry = (element: HTMLElement): ResizeObserverEntry | null => ({
  borderBoxSize: [
    {
      blockSize: 0,
      inlineSize: 0,
    },
  ],
  contentBoxSize: [
    {
      blockSize: 0,
      inlineSize: 0,
    },
  ],
  contentRect: element.getBoundingClientRect(),
  devicePixelContentBoxSize: [
    {
      blockSize: 0,
      inlineSize: 0,
    },
  ],
  target: element,
});

export function mockResizeObserver() {
  Object.defineProperty(window, 'ResizeObserver', {
    writable: true,
    configurable: true,
    value: MockedResizeObserver,
  });

  return {
    resize: (element: HTMLElement) => {
      for (const observer of state.observers)
        if (observer.observationTargets.has(element)) {
          const entry = elementToResizeObserverEntry(element);
          if (entry) {
            observer.callback([entry], observer);
          }
        }
    },
  };
}
