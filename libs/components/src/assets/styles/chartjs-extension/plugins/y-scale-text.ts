import type { Chart, Plugin, ChartTypeRegistry, ScaleOptionsByType } from 'chart.js';

export const yScaleText: Plugin = {
  id: 'yScaleText',
  beforeLayout(chart: Chart<'line'>, args: { cancelable: true }, options) {
    const {
      scales: { y },
    } = chart;
    const yOptionsTyped = y.options as ScaleOptionsByType<ChartTypeRegistry['line']['scales']>;
    if (yOptionsTyped.title?.display) {
      yOptionsTyped.title.display = false;
      options.showTitle = true;
    }
  },
  beforeDraw: (chart: Chart, args, options) => {
    const {
      ctx,
      chartArea: { top },
      scales: { y },
    } = chart;
    if (options.showTitle) {
      const yOptionsTyped = y.options as ScaleOptionsByType<ChartTypeRegistry['line']['scales']>;
      ctx.save();
      ctx.fillStyle = yOptionsTyped.title.color;
      ctx.fillText(yOptionsTyped.title.text.toString(), 3, top - 35);
      ctx.restore();
    }
  },
};
