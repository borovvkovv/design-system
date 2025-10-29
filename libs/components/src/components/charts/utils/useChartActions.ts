import { unref, type MaybeRef } from 'vue';
import type { ActiveDataPoint, Chart } from 'chart.js';

export const useChartActions = (chartRef: MaybeRef) => {
  const getChart = (): Chart => unref(chartRef).getChart() as Chart;

  const activatePoint = (pointIndex: number) => {
    const chart = getChart();
    const points = chart.data?.datasets.reduce(
      (acc, _, datasetIndex) => [
        ...acc,
        {
          index: pointIndex,
          datasetIndex: datasetIndex,
        },
      ],
      [] as Array<ActiveDataPoint>,
    );
    chart.tooltip?.setActiveElements(points, { x: 0, y: 0 });
    chart.update();
  };

  const activateNextPoint = () => {
    const chart = getChart();
    const activePoint = chart.tooltip?.getActiveElements()[0];
    if (!activePoint || activePoint.index + 1 === (chart.data.datasets[0]?.data.length ?? 0)) {
      return;
    }
    activatePoint(activePoint.index + 1);
  };

  const activatePrevPoint = () => {
    const chart = getChart();
    const activePoint = chart.tooltip?.getActiveElements()[0];
    if (!activePoint || activePoint.index === 0) {
      return;
    }
    activatePoint(activePoint.index - 1);
  };

  const resetActiveElements = () => {
    const chart = getChart();
    chart.tooltip?.setActiveElements([], { x: 0, y: 0 });
    chart.update();
  };

  return { activatePoint, resetActiveElements, activateNextPoint, activatePrevPoint };
};
