import { beforeAll, describe, expect, test, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import DragAndDrop from '@comp/components/drag-and-drop/DragAndDrop.vue';

const swipeField: HTMLElement = Object.assign(document.createElement('div'), {
  id: 'container',
  getBoundingClientRect: () => ({
    x: 0,
    y: 0,
    top: 0,
    bottom: 1000,
    left: 0,
    right: 1000,
    width: 1000,
    height: 1000,
    toJSON: () => {},
  }),
});

const getDragAndDrop = () =>
  mount(DragAndDrop, {
    props: {
      swipeField: swipeField,
    },
    slots: {
      default: '<div id=content />',
      stub: '<div id=stub />',
    },
    attachTo: document.body,
  });

const getTouchEvent = (clientX: number, clientY: number): Touch => ({
  clientX,
  clientY,
  force: 0,
  pageX: 0,
  pageY: 0,
  identifier: 0,
  radiusX: 0,
  radiusY: 0,
  rotationAngle: 0,
  screenX: 0,
  screenY: 0,
  target: new EventTarget(),
});

const getSwipeStartFieldClientRect = (x: number, y: number): DOMRect => ({
  x,
  y,
  top: y,
  bottom: y + 100,
  left: x,
  right: x + 100,
  width: 100,
  height: 100,
  toJSON: () => {},
});

describe('Компонент DragAndDrop', () => {
  beforeAll(() => {
    document.body.appendChild(swipeField);
  });

  test('Компонент отрисовывает элемент для перемещения', async () => {
    vi.useFakeTimers();
    const wrapper = getDragAndDrop();

    await vi.runAllTicks();

    expect(wrapper.find('#content').exists()).toBeTruthy();
  });

  test('Компонент отрисовывает заглушку при перемещении элемента', async () => {
    vi.useFakeTimers();
    const wrapper = getDragAndDrop();

    await vi.runAllTicks();

    const swipeStartField = wrapper.vm.$refs.contentRef as HTMLDivElement;
    swipeStartField.dispatchEvent(new MouseEvent('mousedown', { clientX: 15, clientY: 15 }));
    swipeField.dispatchEvent(new MouseEvent('mousemove', { clientX: 25, clientY: 35 }));

    await vi.runAllTicks();

    expect(wrapper.find('#stub').exists()).toBeTruthy();
  });

  test('При перемещении элемента курсором вызывается эмит swiping', async () => {
    vi.useFakeTimers();
    const wrapper = getDragAndDrop();

    await vi.runAllTicks();

    const swipeStartField = wrapper.vm.$refs.contentRef as HTMLDivElement;
    vi.spyOn(swipeStartField, 'getBoundingClientRect').mockImplementationOnce(() =>
      getSwipeStartFieldClientRect(10, 10),
    );

    swipeStartField.dispatchEvent(new MouseEvent('mousedown', { clientX: 15, clientY: 15 }));
    swipeField.dispatchEvent(new MouseEvent('mousemove', { clientX: 25, clientY: 35 }));
    await vi.runAllTicks();

    const swipingEvent = wrapper.emitted('swiping');
    expect(swipingEvent).toHaveLength(1);
    expect(swipingEvent?.[0]).toStrictEqual([
      { x: 20, y: 30 },
      { x: 120, y: 130 },
    ]);
  });

  test('В конце перемещения элемента курсором вызывается эмит swiped:end', async () => {
    vi.useFakeTimers();
    const wrapper = getDragAndDrop();

    await vi.runAllTicks();

    const swipeStartField = wrapper.vm.$refs.contentRef as HTMLDivElement;

    swipeStartField.dispatchEvent(new MouseEvent('mousedown', { clientX: 15, clientY: 15 }));
    swipeField.dispatchEvent(new MouseEvent('mousemove', { clientX: 25, clientY: 35 }));
    swipeField.dispatchEvent(new MouseEvent('mouseup'));

    await vi.runAllTicks();

    expect(wrapper.emitted('swiped:end')).toHaveLength(1);
  });

  test('При выходе курсора с перемещаемым элементом за пределы контейнера вызывается эмит swiped:end', async () => {
    vi.useFakeTimers();
    const wrapper = getDragAndDrop();

    await vi.runAllTicks();

    const swipeStartField = wrapper.vm.$refs.contentRef as HTMLDivElement;

    swipeStartField.dispatchEvent(new MouseEvent('mousedown', { clientX: 15, clientY: 15 }));
    swipeField.dispatchEvent(new MouseEvent('mousemove', { clientX: 25, clientY: 35 }));
    swipeField.dispatchEvent(new MouseEvent('mouseleave'));

    await vi.runAllTicks();

    expect(wrapper.emitted('swiped:end')).toHaveLength(1);
  });

  test('При перемещении элемента через сенсорный экран вызывается эмит swiping', async () => {
    vi.useFakeTimers();
    const wrapper = getDragAndDrop();

    await vi.runAllTicks();

    const swipeStartField = wrapper.vm.$refs.contentRef as HTMLDivElement;
    vi.spyOn(swipeStartField, 'getBoundingClientRect').mockImplementationOnce(() =>
      getSwipeStartFieldClientRect(10, 10),
    );

    swipeStartField.dispatchEvent(
      new TouchEvent('touchstart', {
        touches: [getTouchEvent(15, 15)],
      }),
    );
    swipeField.dispatchEvent(
      new TouchEvent('touchmove', {
        touches: [getTouchEvent(25, 35)],
      }),
    );

    await vi.runAllTicks();

    const swipingEvent = wrapper.emitted('swiping');
    expect(swipingEvent).toHaveLength(1);
    expect(swipingEvent?.[0]).toStrictEqual([
      { x: 20, y: 30 },
      { x: 120, y: 130 },
    ]);
  });

  test('В конце перемещения элемента через сенсорный экран вызывается эмит swiped:end', async () => {
    vi.useFakeTimers();
    const wrapper = getDragAndDrop();

    await vi.runAllTicks();

    const swipeStartField = wrapper.vm.$refs.contentRef as HTMLDivElement;

    swipeStartField.dispatchEvent(
      new TouchEvent('touchstart', {
        touches: [getTouchEvent(15, 15)],
      }),
    );
    swipeField.dispatchEvent(
      new TouchEvent('touchmove', {
        touches: [getTouchEvent(25, 35)],
      }),
    );
    swipeField.dispatchEvent(new TouchEvent('touchend'));

    await vi.runAllTicks();

    const swipingEvent = wrapper.emitted('swiped:end');
    expect(swipingEvent).toHaveLength(1);
  });

  test('При перемещении элемента курсором, элемент меняет свое местоположение', async () => {
    vi.useFakeTimers();
    const wrapper = getDragAndDrop();

    await vi.runAllTicks();

    const swipeStartField = wrapper.vm.$refs.contentRef as HTMLDivElement;
    vi.spyOn(swipeStartField, 'getBoundingClientRect').mockImplementationOnce(() =>
      getSwipeStartFieldClientRect(10, 10),
    );

    swipeStartField.dispatchEvent(new MouseEvent('mousedown', { clientX: 15, clientY: 15 }));
    swipeField.dispatchEvent(new MouseEvent('mousemove', { clientX: 25, clientY: 35 }));

    expect(swipeStartField.style.left).toBe('20px');
    expect(swipeStartField.style.top).toBe('30px');
  });

  test('При перемещении элемента через сенсорный экран, элемент меняет свое местоположение', async () => {
    vi.useFakeTimers();
    const wrapper = getDragAndDrop();

    await vi.runAllTicks();

    const swipeStartField = wrapper.vm.$refs.contentRef as HTMLDivElement;
    vi.spyOn(swipeStartField, 'getBoundingClientRect').mockImplementationOnce(() =>
      getSwipeStartFieldClientRect(10, 10),
    );

    swipeStartField.dispatchEvent(new TouchEvent('touchstart', { touches: [getTouchEvent(15, 15)] }));
    swipeField.dispatchEvent(new TouchEvent('touchmove', { touches: [getTouchEvent(25, 35)] }));

    expect(swipeStartField.style.left).toBe('20px');
    expect(swipeStartField.style.top).toBe('30px');
  });
});
