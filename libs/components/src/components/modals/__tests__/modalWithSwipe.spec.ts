import { beforeAll as beforeEach, describe, expect, test, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import ModalWithSwipe from '@comp/components/modals/ModalWithSwipe.vue';

const swipeField: HTMLElement = Object.assign(document.createElement('div'), {
  id: 'swipeField',
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

const swipeStartField: HTMLElement = Object.assign(document.createElement('div'), {
  id: 'swipeStartField',
  getBoundingClientRect: () => ({
    x: 0,
    y: 0,
    top: 0,
    bottom: 10,
    left: 0,
    right: 10,
    width: 10,
    height: 10,
    toJSON: () => {},
  }),
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

const getModalWithSwipe = () =>
  mount(ModalWithSwipe, {
    props: {
      swipeThresholdPx: 5,
      swipeTimeoutMs: 1000,
      swipeField,
      swipeStartField,
      isPreventDefault: false,
    },
    slots: {
      default: '<div />',
    },
    attachTo: document.body,
  });

describe('Компонент ModalWithSwipe', () => {
  beforeEach(() => {
    document.body.appendChild(swipeField);
    document.body.appendChild(swipeStartField);
  });

  test('При зажатии ЛКМ или касании сенсорного экрана на элементе (проп swipeStartField), вызывается эмит before-swipe с координатами курсора/пальца', async () => {
    vi.useFakeTimers();
    const wrapper = getModalWithSwipe();

    await vi.runAllTicks();

    swipeStartField.dispatchEvent(new MouseEvent('mousedown', { clientX: 10, clientY: 20 }));
    await vi.runAllTicks();

    const swipingEvent = wrapper.emitted('before-swipe');
    expect(swipingEvent).toHaveLength(1);
    expect(swipingEvent?.[0]).toStrictEqual([10, 20]);
  });

  test('При перемещении элемента курсором или движении пальцем вызывается эмит swiping с текущими координатами курсора/касания', async () => {
    vi.useFakeTimers();
    const wrapper = getModalWithSwipe();

    await vi.runAllTicks();

    swipeStartField.dispatchEvent(new MouseEvent('mousedown', { clientX: 0, clientY: 0 }));
    swipeField.dispatchEvent(new MouseEvent('mousemove', { clientX: 10, clientY: 20 }));
    await vi.runAllTicks();

    const swipingEvent = wrapper.emitted('swiping');
    expect(swipingEvent).toHaveLength(1);
    expect(swipingEvent?.[0]).toStrictEqual([10, 20]);

    swipeStartField.dispatchEvent(new MouseEvent('mousedown', { clientX: 0, clientY: 0 }));
    swipeField.dispatchEvent(new TouchEvent('touchmove', { touches: [getTouchEvent(10, 20)] }));
    await vi.runAllTicks();

    expect(swipingEvent).toHaveLength(2);
    expect(swipingEvent?.[1]).toStrictEqual([10, 20]);
  });

  test(`При перемещении элемента по горизонтали вызывается эмит swiping:x с разницей между
  координатами X курсора/пальца с начала перемещения до текущего местоположения`, async () => {
    vi.useFakeTimers();
    const wrapper = getModalWithSwipe();

    await vi.runAllTicks();

    swipeStartField.dispatchEvent(new MouseEvent('mousedown', { clientX: 0, clientY: 0 }));
    swipeField.dispatchEvent(new MouseEvent('mousemove', { clientX: 5, clientY: 0 }));
    await vi.runAllTicks();

    const swipingEvent = wrapper.emitted('swiping:x');
    expect(swipingEvent).toHaveLength(1);
    expect(swipingEvent?.[0]).toStrictEqual([-5]);

    swipeStartField.dispatchEvent(new MouseEvent('mousedown', { clientX: 5, clientY: 0 }));
    swipeField.dispatchEvent(new TouchEvent('touchmove', { touches: [getTouchEvent(0, 0)] }));
    await vi.runAllTicks();

    expect(swipingEvent).toHaveLength(2);
    expect(swipingEvent?.[1]).toStrictEqual([5]);
  });

  test(`При перемещении элемента влево вызывается эмит swiping:left с количеством пройденных
  пикселей по оси x между началом перемещения и текущим местоположением`, async () => {
    vi.useFakeTimers();
    const wrapper = getModalWithSwipe();

    await vi.runAllTicks();

    swipeStartField.dispatchEvent(new MouseEvent('mousedown', { clientX: 5, clientY: 0 }));
    swipeField.dispatchEvent(new MouseEvent('mousemove', { clientX: 0, clientY: 0 }));
    await vi.runAllTicks();

    const swipingEvent = wrapper.emitted('swiping:left');
    expect(swipingEvent).toHaveLength(1);
    expect(swipingEvent?.[0]).toStrictEqual([5]);

    swipeStartField.dispatchEvent(new MouseEvent('mousedown', { clientX: 5, clientY: 0 }));
    swipeField.dispatchEvent(new TouchEvent('touchmove', { touches: [getTouchEvent(0, 0)] }));
    await vi.runAllTicks();

    expect(swipingEvent).toHaveLength(2);
    expect(swipingEvent?.[1]).toStrictEqual([5]);
  });

  test(`При перемещении элемента вправо вызывается эмит swiping:right с количеством пройденных
  пикселей по оси x между началом перемещения и текущим местоположением`, async () => {
    vi.useFakeTimers();
    const wrapper = getModalWithSwipe();

    await vi.runAllTicks();

    swipeStartField.dispatchEvent(new MouseEvent('mousedown', { clientX: 0, clientY: 0 }));
    swipeField.dispatchEvent(new MouseEvent('mousemove', { clientX: 5, clientY: 0 }));
    await vi.runAllTicks();

    const swipingEvent = wrapper.emitted('swiping:right');
    expect(swipingEvent).toHaveLength(1);
    expect(swipingEvent?.[0]).toStrictEqual([5]);

    swipeStartField.dispatchEvent(new MouseEvent('mousedown', { clientX: 0, clientY: 0 }));
    swipeField.dispatchEvent(new TouchEvent('touchmove', { touches: [getTouchEvent(5, 0)] }));
    await vi.runAllTicks();

    expect(swipingEvent).toHaveLength(2);
    expect(swipingEvent?.[1]).toStrictEqual([5]);
  });

  test(`При перемещении элемента по вертикали вызывается эмит swiping:y с разницей между
  координатами Y курсора/пальца с начала перемещения до текущего местоположения`, async () => {
    vi.useFakeTimers();
    const wrapper = getModalWithSwipe();

    await vi.runAllTicks();

    swipeStartField.dispatchEvent(new MouseEvent('mousedown', { clientX: 0, clientY: 0 }));
    swipeField.dispatchEvent(new MouseEvent('mousemove', { clientX: 0, clientY: 5 }));
    await vi.runAllTicks();

    const swipingEvent = wrapper.emitted('swiping:y');
    expect(swipingEvent).toHaveLength(1);
    expect(swipingEvent?.[0]).toStrictEqual([-5]);

    swipeStartField.dispatchEvent(new MouseEvent('mousedown', { clientX: 0, clientY: 5 }));
    swipeField.dispatchEvent(new TouchEvent('touchmove', { touches: [getTouchEvent(0, 0)] }));
    await vi.runAllTicks();

    expect(swipingEvent).toHaveLength(2);
    expect(swipingEvent?.[1]).toStrictEqual([5]);
  });

  test(`При перемещении элемента вверх вызывается эмит swiping:up с количеством пройденных
  пикселей по оси x между началом перемещения и текущим местоположением`, async () => {
    vi.useFakeTimers();
    const wrapper = getModalWithSwipe();

    await vi.runAllTicks();

    swipeStartField.dispatchEvent(new MouseEvent('mousedown', { clientX: 0, clientY: 5 }));
    swipeField.dispatchEvent(new MouseEvent('mousemove', { clientX: 0, clientY: 0 }));
    await vi.runAllTicks();

    const swipingEvent = wrapper.emitted('swiping:up');
    expect(swipingEvent).toHaveLength(1);
    expect(swipingEvent?.[0]).toStrictEqual([5]);

    swipeStartField.dispatchEvent(new MouseEvent('mousedown', { clientX: 0, clientY: 5 }));
    swipeField.dispatchEvent(new TouchEvent('touchmove', { touches: [getTouchEvent(0, 0)] }));
    await vi.runAllTicks();

    expect(swipingEvent).toHaveLength(2);
    expect(swipingEvent?.[1]).toStrictEqual([5]);
  });

  test(`При перемещении элемента вниз вызывается эмит swiping:down с количеством пройденных
  пикселей по оси x между началом перемещения и текущим местоположением`, async () => {
    vi.useFakeTimers();
    const wrapper = getModalWithSwipe();

    await vi.runAllTicks();

    swipeStartField.dispatchEvent(new MouseEvent('mousedown', { clientX: 0, clientY: 0 }));
    swipeField.dispatchEvent(new MouseEvent('mousemove', { clientX: 0, clientY: 5 }));
    await vi.runAllTicks();

    const swipingEvent = wrapper.emitted('swiping:down');
    expect(swipingEvent).toHaveLength(1);
    expect(swipingEvent?.[0]).toStrictEqual([5]);

    swipeStartField.dispatchEvent(new MouseEvent('mousedown', { clientX: 0, clientY: 0 }));
    swipeField.dispatchEvent(new TouchEvent('touchmove', { touches: [getTouchEvent(0, 5)] }));
    await vi.runAllTicks();

    expect(swipingEvent).toHaveLength(2);
    expect(swipingEvent?.[1]).toStrictEqual([5]);
  });

  test('В конце перемещения элемента вызывается эмит swiped:end', async () => {
    vi.useFakeTimers();
    const wrapper = getModalWithSwipe();

    await vi.runAllTicks();

    swipeStartField.dispatchEvent(new MouseEvent('mousedown', { clientX: 0, clientY: 0 }));
    swipeField.dispatchEvent(new MouseEvent('mousemove', { clientX: 0, clientY: 5 }));
    swipeField.dispatchEvent(new MouseEvent('mouseup'));
    await vi.runAllTicks();

    const swipingEvent = wrapper.emitted('swiped:end');
    expect(swipingEvent).toHaveLength(1);

    swipeStartField.dispatchEvent(new MouseEvent('mousedown', { clientX: 0, clientY: 0 }));
    swipeField.dispatchEvent(new TouchEvent('touchmove', { touches: [getTouchEvent(0, 5)] }));
    swipeField.dispatchEvent(new TouchEvent('touchend'));
    await vi.runAllTicks();

    expect(swipingEvent).toHaveLength(2);
  });

  test('В конце перемещения элемента влево вызывается эмит swiped:left', async () => {
    vi.useFakeTimers();
    const wrapper = getModalWithSwipe();

    await vi.runAllTicks();

    swipeStartField.dispatchEvent(new MouseEvent('mousedown', { clientX: 10, clientY: 0 }));
    swipeField.dispatchEvent(new MouseEvent('mousemove', { clientX: 0, clientY: 0 }));
    swipeField.dispatchEvent(new MouseEvent('mouseup'));
    await vi.runAllTicks();

    const swipingEvent = wrapper.emitted('swiped:left');
    expect(swipingEvent).toHaveLength(1);

    swipeStartField.dispatchEvent(new MouseEvent('mousedown', { clientX: 10, clientY: 0 }));
    swipeField.dispatchEvent(new TouchEvent('touchmove', { touches: [getTouchEvent(0, 0)] }));
    swipeField.dispatchEvent(new TouchEvent('touchend'));
    await vi.runAllTicks();

    expect(swipingEvent).toHaveLength(2);
  });

  test('В конце перемещения элемента вправо вызывается эмит swiped:right', async () => {
    vi.useFakeTimers();
    const wrapper = getModalWithSwipe();

    await vi.runAllTicks();

    swipeStartField.dispatchEvent(new MouseEvent('mousedown', { clientX: 0, clientY: 0 }));
    swipeField.dispatchEvent(new MouseEvent('mousemove', { clientX: 10, clientY: 0 }));
    swipeField.dispatchEvent(new MouseEvent('mouseup'));
    await vi.runAllTicks();

    const swipingEvent = wrapper.emitted('swiped:right');
    expect(swipingEvent).toHaveLength(1);

    swipeStartField.dispatchEvent(new MouseEvent('mousedown', { clientX: 0, clientY: 0 }));
    swipeField.dispatchEvent(new TouchEvent('touchmove', { touches: [getTouchEvent(10, 0)] }));
    swipeField.dispatchEvent(new TouchEvent('touchend'));
    await vi.runAllTicks();

    expect(swipingEvent).toHaveLength(2);
  });

  test('В конце перемещения элемента вверх вызывается эмит swiped:up', async () => {
    vi.useFakeTimers();
    const wrapper = getModalWithSwipe();

    await vi.runAllTicks();

    swipeStartField.dispatchEvent(new MouseEvent('mousedown', { clientX: 0, clientY: 10 }));
    swipeField.dispatchEvent(new MouseEvent('mousemove', { clientX: 0, clientY: 0 }));
    swipeField.dispatchEvent(new MouseEvent('mouseup'));
    await vi.runAllTicks();

    const swipingEvent = wrapper.emitted('swiped:up');
    expect(swipingEvent).toHaveLength(1);

    swipeStartField.dispatchEvent(new MouseEvent('mousedown', { clientX: 0, clientY: 10 }));
    swipeField.dispatchEvent(new TouchEvent('touchmove', { touches: [getTouchEvent(0, 0)] }));
    swipeField.dispatchEvent(new TouchEvent('touchend'));
    await vi.runAllTicks();

    expect(swipingEvent).toHaveLength(2);
  });

  test('В конце перемещения элемента вниз вызывается эмит swiped:down', async () => {
    vi.useFakeTimers();
    const wrapper = getModalWithSwipe();

    await vi.runAllTicks();

    swipeStartField.dispatchEvent(new MouseEvent('mousedown', { clientX: 0, clientY: 0 }));
    swipeField.dispatchEvent(new MouseEvent('mousemove', { clientX: 0, clientY: 10 }));
    swipeField.dispatchEvent(new MouseEvent('mouseup'));
    await vi.runAllTicks();

    const swipingEvent = wrapper.emitted('swiped:down');
    expect(swipingEvent).toHaveLength(1);

    swipeStartField.dispatchEvent(new MouseEvent('mousedown', { clientX: 0, clientY: 0 }));
    swipeField.dispatchEvent(new TouchEvent('touchmove', { touches: [getTouchEvent(0, 10)] }));
    swipeField.dispatchEvent(new TouchEvent('touchend'));
    await vi.runAllTicks();

    expect(swipingEvent).toHaveLength(2);
  });

  test('Эмит swiped:left/right не вызывается, если пройденное расстояние курсора/пальца меньше значения пропа swipeThresholdPx', async () => {
    vi.useFakeTimers();
    const wrapper = getModalWithSwipe();

    await vi.runAllTicks();

    swipeStartField.dispatchEvent(new MouseEvent('mousedown', { clientX: 5, clientY: 0 }));
    swipeField.dispatchEvent(new MouseEvent('mousemove', { clientX: 0, clientY: 0 }));
    swipeField.dispatchEvent(new MouseEvent('mouseup'));
    await vi.runAllTicks();

    const swipingEventLeft = wrapper.emitted('swiped:left');
    expect(swipingEventLeft).toBeUndefined();

    swipeStartField.dispatchEvent(new MouseEvent('mousedown', { clientX: 5, clientY: 0 }));
    swipeField.dispatchEvent(new TouchEvent('touchmove', { touches: [getTouchEvent(0, 0)] }));
    swipeField.dispatchEvent(new TouchEvent('touchend'));
    await vi.runAllTicks();

    expect(swipingEventLeft).toBeUndefined();

    swipeStartField.dispatchEvent(new MouseEvent('mousedown', { clientX: 0, clientY: 0 }));
    swipeField.dispatchEvent(new MouseEvent('mousemove', { clientX: 5, clientY: 0 }));
    swipeField.dispatchEvent(new MouseEvent('mouseup'));
    await vi.runAllTicks();

    const swipingEventRight = wrapper.emitted('swiped:right');
    expect(swipingEventRight).toBeUndefined();

    swipeStartField.dispatchEvent(new MouseEvent('mousedown', { clientX: 0, clientY: 0 }));
    swipeField.dispatchEvent(new TouchEvent('touchmove', { touches: [getTouchEvent(5, 0)] }));
    swipeField.dispatchEvent(new TouchEvent('touchend'));
    await vi.runAllTicks();

    expect(swipingEventRight).toBeUndefined();
  });

  test('Эмит swiped:up/down не вызывается, если пройденное расстояние курсора/пальца меньше значения пропа swipeThresholdPx', async () => {
    vi.useFakeTimers();
    const wrapper = getModalWithSwipe();

    await vi.runAllTicks();

    swipeStartField.dispatchEvent(new MouseEvent('mousedown', { clientX: 0, clientY: 5 }));
    swipeField.dispatchEvent(new MouseEvent('mousemove', { clientX: 0, clientY: 0 }));
    swipeField.dispatchEvent(new MouseEvent('mouseup'));
    await vi.runAllTicks();

    const swipingEventUp = wrapper.emitted('swiped:up');
    expect(swipingEventUp).toBeUndefined();

    swipeStartField.dispatchEvent(new MouseEvent('mousedown', { clientX: 0, clientY: 5 }));
    swipeField.dispatchEvent(new TouchEvent('touchmove', { touches: [getTouchEvent(0, 0)] }));
    swipeField.dispatchEvent(new TouchEvent('touchend'));
    await vi.runAllTicks();

    expect(swipingEventUp).toBeUndefined();

    swipeStartField.dispatchEvent(new MouseEvent('mousedown', { clientX: 0, clientY: 0 }));
    swipeField.dispatchEvent(new MouseEvent('mousemove', { clientX: 5, clientY: 0 }));
    swipeField.dispatchEvent(new MouseEvent('mouseup'));
    await vi.runAllTicks();

    const swipingEventDown = wrapper.emitted('swiped:down');
    expect(swipingEventDown).toBeUndefined();

    swipeStartField.dispatchEvent(new MouseEvent('mousedown', { clientX: 0, clientY: 0 }));
    swipeField.dispatchEvent(new TouchEvent('touchmove', { touches: [getTouchEvent(5, 0)] }));
    swipeField.dispatchEvent(new TouchEvent('touchend'));
    await vi.runAllTicks();

    expect(swipingEventDown).toBeUndefined();
  });

  test('Эмит swiped:left/right/up/down не вызывается, если курсор/палец переносил элемент за время меньшее, чем значение пропа swipeTimeoutMs', async () => {
    vi.useFakeTimers();
    const wrapper = getModalWithSwipe();

    await vi.runAllTicks();

    swipeStartField.dispatchEvent(new MouseEvent('mousedown', { clientX: 10, clientY: 0 }));
    swipeField.dispatchEvent(new MouseEvent('mousemove', { clientX: 0, clientY: 0 }));
    await vi.advanceTimersByTime(1100);
    swipeField.dispatchEvent(new MouseEvent('mouseup'));
    await vi.runAllTicks();

    expect(wrapper.emitted('swiped:left')).toBeUndefined();

    swipeStartField.dispatchEvent(new MouseEvent('mousedown', { clientX: 10, clientY: 0 }));
    swipeField.dispatchEvent(new TouchEvent('touchmove', { touches: [getTouchEvent(0, 0)] }));
    await vi.advanceTimersByTime(1100);
    swipeField.dispatchEvent(new TouchEvent('touchend'));
    await vi.runAllTicks();

    expect(wrapper.emitted('swiped:left')).toBeUndefined();

    swipeStartField.dispatchEvent(new MouseEvent('mousedown', { clientX: 0, clientY: 0 }));
    swipeField.dispatchEvent(new MouseEvent('mousemove', { clientX: 10, clientY: 0 }));
    await vi.advanceTimersByTime(1100);
    swipeField.dispatchEvent(new MouseEvent('mouseup'));
    await vi.runAllTicks();

    expect(wrapper.emitted('swiped:right')).toBeUndefined();

    swipeStartField.dispatchEvent(new MouseEvent('mousedown', { clientX: 0, clientY: 0 }));
    swipeField.dispatchEvent(new TouchEvent('touchmove', { touches: [getTouchEvent(10, 0)] }));
    await vi.advanceTimersByTime(1100);
    swipeField.dispatchEvent(new TouchEvent('touchend'));
    await vi.runAllTicks();

    expect(wrapper.emitted('swiped:right')).toBeUndefined();

    swipeStartField.dispatchEvent(new MouseEvent('mousedown', { clientX: 0, clientY: 10 }));
    swipeField.dispatchEvent(new MouseEvent('mousemove', { clientX: 0, clientY: 0 }));
    await vi.advanceTimersByTime(1100);
    swipeField.dispatchEvent(new MouseEvent('mouseup'));
    await vi.runAllTicks();

    expect(wrapper.emitted('swiped:up')).toBeUndefined();

    swipeStartField.dispatchEvent(new MouseEvent('mousedown', { clientX: 0, clientY: 10 }));
    swipeField.dispatchEvent(new TouchEvent('touchmove', { touches: [getTouchEvent(0, 0)] }));
    await vi.advanceTimersByTime(1100);
    swipeField.dispatchEvent(new TouchEvent('touchend'));
    await vi.runAllTicks();

    expect(wrapper.emitted('swiped:up')).toBeUndefined();

    swipeStartField.dispatchEvent(new MouseEvent('mousedown', { clientX: 0, clientY: 0 }));
    swipeField.dispatchEvent(new MouseEvent('mousemove', { clientX: 0, clientY: 10 }));
    await vi.advanceTimersByTime(1100);
    swipeField.dispatchEvent(new MouseEvent('mouseup'));
    await vi.runAllTicks();

    expect(wrapper.emitted('swiped:down')).toBeUndefined();

    swipeStartField.dispatchEvent(new MouseEvent('mousedown', { clientX: 0, clientY: 0 }));
    swipeField.dispatchEvent(new TouchEvent('touchmove', { touches: [getTouchEvent(0, 10)] }));
    await vi.advanceTimersByTime(1100);
    swipeField.dispatchEvent(new TouchEvent('touchend'));
    await vi.runAllTicks();

    expect(wrapper.emitted('swiped:down')).toBeUndefined();
  });

  test('Эмит swiped:end вызывается при любых значениях пропсов swipeThresholdPx и swipeTimeoutMs', async () => {
    vi.useFakeTimers();
    const wrapper = getModalWithSwipe();

    await vi.runAllTicks();

    swipeStartField.dispatchEvent(new MouseEvent('mousedown', { clientX: 0, clientY: 0 }));
    swipeField.dispatchEvent(new MouseEvent('mousemove', { clientX: 0, clientY: 0 }));
    await vi.advanceTimersByTime(1100);
    swipeField.dispatchEvent(new MouseEvent('mouseup'));
    await vi.runAllTicks();

    const swipingEvent = wrapper.emitted('swiped:end');
    expect(swipingEvent).toHaveLength(1);
  });

  test('Если нажатие ЛКП или касание сенсорного экрана было выполнено за пределами элемента, а само перемещение выполнялось в поле для перемещения (swipeField), то эмиты swiping* не вызываются', async () => {
    vi.useFakeTimers();
    const wrapper = getModalWithSwipe();

    await vi.runAllTicks();

    swipeField.dispatchEvent(new MouseEvent('mousedown', { clientX: 0, clientY: 0 }));
    swipeField.dispatchEvent(new MouseEvent('mousemove', { clientX: 10, clientY: 10 }));
    swipeField.dispatchEvent(new MouseEvent('mouseup'));

    await vi.runAllTicks();

    expect(wrapper.emitted('swiping')).toBeUndefined();
    expect(wrapper.emitted('swiping:x')).toBeUndefined();
    expect(wrapper.emitted('swiping:left')).toBeUndefined();
    expect(wrapper.emitted('swiping:right')).toBeUndefined();
    expect(wrapper.emitted('swiping:y')).toBeUndefined();
    expect(wrapper.emitted('swiping:up')).toBeUndefined();
    expect(wrapper.emitted('swiping:down')).toBeUndefined();

    swipeField.dispatchEvent(new MouseEvent('mousedown', { clientX: 0, clientY: 0 }));
    swipeField.dispatchEvent(new TouchEvent('touchmove', { touches: [getTouchEvent(10, 10)] }));
    swipeField.dispatchEvent(new TouchEvent('touchend'));

    await vi.runAllTicks();

    expect(wrapper.emitted('swiping')).toBeUndefined();
    expect(wrapper.emitted('swiping:x')).toBeUndefined();
    expect(wrapper.emitted('swiping:left')).toBeUndefined();
    expect(wrapper.emitted('swiping:right')).toBeUndefined();
    expect(wrapper.emitted('swiping:y')).toBeUndefined();
    expect(wrapper.emitted('swiping:up')).toBeUndefined();
    expect(wrapper.emitted('swiping:down')).toBeUndefined();
  });

  test('Если при перемещении курсором элемента курсор вышел за пределы поля для перемещения, то эмиты swiped* будут вызваны', async () => {
    vi.useFakeTimers();
    const wrapper = getModalWithSwipe();

    await vi.runAllTicks();

    swipeStartField.dispatchEvent(new MouseEvent('mousedown', { clientX: 10, clientY: 0 }));
    swipeField.dispatchEvent(new MouseEvent('mousemove', { clientX: 0, clientY: 0 }));
    swipeField.dispatchEvent(new MouseEvent('mouseleave'));
    await vi.runAllTicks();

    expect(wrapper.emitted('swiped:end')).toHaveLength(1);
    expect(wrapper.emitted('swiped:left')).toHaveLength(1);

    swipeStartField.dispatchEvent(new MouseEvent('mousedown', { clientX: 0, clientY: 0 }));
    swipeField.dispatchEvent(new MouseEvent('mousemove', { clientX: 10, clientY: 0 }));
    swipeField.dispatchEvent(new MouseEvent('mouseleave'));
    await vi.runAllTicks();

    expect(wrapper.emitted('swiped:end')).toHaveLength(2);
    expect(wrapper.emitted('swiped:right')).toHaveLength(1);

    swipeStartField.dispatchEvent(new MouseEvent('mousedown', { clientX: 0, clientY: 10 }));
    swipeField.dispatchEvent(new MouseEvent('mousemove', { clientX: 0, clientY: 0 }));
    swipeField.dispatchEvent(new MouseEvent('mouseleave'));
    await vi.runAllTicks();

    expect(wrapper.emitted('swiped:end')).toHaveLength(3);
    expect(wrapper.emitted('swiped:up')).toHaveLength(1);

    swipeStartField.dispatchEvent(new MouseEvent('mousedown', { clientX: 0, clientY: 0 }));
    swipeField.dispatchEvent(new MouseEvent('mousemove', { clientX: 0, clientY: 10 }));
    swipeField.dispatchEvent(new MouseEvent('mouseleave'));
    await vi.runAllTicks();

    expect(wrapper.emitted('swiped:end')).toHaveLength(4);
    expect(wrapper.emitted('swiped:down')).toHaveLength(1);
  });

  test('В конце перемещения элемента вызываются эмиты swiped:* в зависимости от того, в какую в итоге точку пришел курсор/палец', async () => {
    vi.useFakeTimers();
    const wrapper = getModalWithSwipe();

    await vi.runAllTicks();

    swipeStartField.dispatchEvent(new MouseEvent('mousedown', { clientX: 10, clientY: 0 }));
    swipeField.dispatchEvent(new MouseEvent('mousemove', { clientX: 100, clientY: 0 }));
    swipeField.dispatchEvent(new MouseEvent('mousemove', { clientX: 0, clientY: 0 }));
    swipeField.dispatchEvent(new MouseEvent('mouseup'));
    await vi.runAllTicks();

    expect(wrapper.emitted('swiped:left')).toHaveLength(1);

    swipeStartField.dispatchEvent(new MouseEvent('mousedown', { clientX: 10, clientY: 0 }));
    swipeField.dispatchEvent(new TouchEvent('touchmove', { touches: [getTouchEvent(100, 0)] }));
    swipeField.dispatchEvent(new TouchEvent('touchmove', { touches: [getTouchEvent(0, 0)] }));
    swipeField.dispatchEvent(new TouchEvent('touchend'));
    await vi.runAllTicks();

    expect(wrapper.emitted('swiped:left')).toHaveLength(2);

    swipeStartField.dispatchEvent(new MouseEvent('mousedown', { clientX: 0, clientY: 0 }));
    swipeField.dispatchEvent(new MouseEvent('mousemove', { clientX: -100, clientY: 0 }));
    swipeField.dispatchEvent(new MouseEvent('mousemove', { clientX: 10, clientY: 0 }));
    swipeField.dispatchEvent(new MouseEvent('mouseup'));
    await vi.runAllTicks();

    expect(wrapper.emitted('swiped:right')).toHaveLength(1);

    swipeStartField.dispatchEvent(new MouseEvent('mousedown', { clientX: 0, clientY: 0 }));
    swipeField.dispatchEvent(new TouchEvent('touchmove', { touches: [getTouchEvent(-100, 0)] }));
    swipeField.dispatchEvent(new TouchEvent('touchmove', { touches: [getTouchEvent(10, 0)] }));
    swipeField.dispatchEvent(new TouchEvent('touchend'));
    await vi.runAllTicks();

    expect(wrapper.emitted('swiped:right')).toHaveLength(2);

    swipeStartField.dispatchEvent(new MouseEvent('mousedown', { clientX: 0, clientY: 10 }));
    swipeField.dispatchEvent(new MouseEvent('mousemove', { clientX: 0, clientY: 100 }));
    swipeField.dispatchEvent(new MouseEvent('mousemove', { clientX: 0, clientY: 0 }));
    swipeField.dispatchEvent(new MouseEvent('mouseup'));
    await vi.runAllTicks();

    expect(wrapper.emitted('swiped:up')).toHaveLength(1);

    swipeStartField.dispatchEvent(new MouseEvent('mousedown', { clientX: 0, clientY: 10 }));
    swipeField.dispatchEvent(new TouchEvent('touchmove', { touches: [getTouchEvent(0, 100)] }));
    swipeField.dispatchEvent(new TouchEvent('touchmove', { touches: [getTouchEvent(0, 0)] }));
    swipeField.dispatchEvent(new TouchEvent('touchend'));
    await vi.runAllTicks();

    expect(wrapper.emitted('swiped:up')).toHaveLength(2);

    swipeStartField.dispatchEvent(new MouseEvent('mousedown', { clientX: 0, clientY: 0 }));
    swipeField.dispatchEvent(new MouseEvent('mousemove', { clientX: 0, clientY: 100 }));
    swipeField.dispatchEvent(new MouseEvent('mousemove', { clientX: 0, clientY: 10 }));
    swipeField.dispatchEvent(new MouseEvent('mouseup'));
    await vi.runAllTicks();

    expect(wrapper.emitted('swiped:down')).toHaveLength(1);

    swipeStartField.dispatchEvent(new MouseEvent('mousedown', { clientX: 0, clientY: 0 }));
    swipeField.dispatchEvent(new TouchEvent('touchmove', { touches: [getTouchEvent(0, 100)] }));
    swipeField.dispatchEvent(new TouchEvent('touchmove', { touches: [getTouchEvent(0, 10)] }));
    swipeField.dispatchEvent(new TouchEvent('touchend'));
    await vi.runAllTicks();

    expect(wrapper.emitted('swiped:down')).toHaveLength(2);
  });

  test('Если элемент был перемещен одинаково по горизонтали и вертикали, то будет вызван эмит перемещения по вертикали', async () => {
    vi.useFakeTimers();
    const wrapper = getModalWithSwipe();

    await vi.runAllTicks();

    swipeStartField.dispatchEvent(new MouseEvent('mousedown', { clientX: 0, clientY: 0 }));
    swipeField.dispatchEvent(new MouseEvent('mousemove', { clientX: 10, clientY: 10 }));
    swipeField.dispatchEvent(new MouseEvent('mouseup'));
    await vi.runAllTicks();

    expect(wrapper.emitted('swiped:right')).toBeUndefined();
    expect(wrapper.emitted('swiped:down')).toHaveLength(1);

    swipeStartField.dispatchEvent(new MouseEvent('mousedown', { clientX: 0, clientY: 0 }));
    swipeField.dispatchEvent(new TouchEvent('touchmove', { touches: [getTouchEvent(10, 10)] }));
    swipeField.dispatchEvent(new TouchEvent('touchend'));
    await vi.runAllTicks();

    expect(wrapper.emitted('swiped:right')).toBeUndefined();
    expect(wrapper.emitted('swiped:down')).toHaveLength(2);

    swipeStartField.dispatchEvent(new MouseEvent('mousedown', { clientX: 10, clientY: 10 }));
    swipeField.dispatchEvent(new MouseEvent('mousemove', { clientX: 0, clientY: 0 }));
    swipeField.dispatchEvent(new MouseEvent('mouseup'));
    await vi.runAllTicks();

    expect(wrapper.emitted('swiped:left')).toBeUndefined();
    expect(wrapper.emitted('swiped:up')).toHaveLength(1);

    swipeStartField.dispatchEvent(new MouseEvent('mousedown', { clientX: 10, clientY: 10 }));
    swipeField.dispatchEvent(new TouchEvent('touchmove', { touches: [getTouchEvent(0, 0)] }));
    swipeField.dispatchEvent(new TouchEvent('touchend'));
    await vi.runAllTicks();

    expect(wrapper.emitted('swiped:left')).toBeUndefined();
    expect(wrapper.emitted('swiped:up')).toHaveLength(2);
  });
});
