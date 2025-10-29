import type { ChartOptions } from 'chart.js';

export const lineChartBaseOptions: ChartOptions<'line'> = {
  events: ['mousemove', 'click'],
  responsive: true,
  maintainAspectRatio: false,
  elements: {
    line: {
      borderWidth: 1,
      cubicInterpolationMode: 'monotone',
    },
  },
  datasets: {
    line: {
      pointBorderWidth: 1,
      pointRadius: 3.5,
      pointHitRadius: 5,
      pointBorderColor: 'white',
      pointHoverRadius: 5,
      pointHoverBorderWidth: 2,
      pointHoverBorderColor: 'white',
    },
  },
  scales: {
    y: {
      title: {
        display: true,
        padding: 16,
        color: '#8C979E',
      },
      grid: {
        display: false,
      },
      ticks: {
        autoSkip: true,
        maxTicksLimit: 6,
        padding: 8,
        color: '#8C979E',
      },
      min: 0,
    },
    x: {
      title: {
        display: true,
        padding: 16,
        color: '#8C979E',
      },
      grid: {
        display: true,
        tickLength: 0,
      },
      ticks: {
        autoSkip: true,
        color: '#8C979E',
        padding: 8,
      },
      border: {
        display: false,
      },
    },
  },
  plugins: {
    legend: {
      align: 'end',
      labels: {
        boxHeight: 4,
        padding: 20,
        color: '#8C979E',
      },
    },
    title: {
      display: false,
    },
  },
};
