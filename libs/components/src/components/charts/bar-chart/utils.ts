import type { ChartOptions } from 'chart.js';

export const barChartBaseOptions: ChartOptions<'bar'> = {
  events: ['mousemove', 'click'],
  indexAxis: 'x',
  elements: {
    bar: {
      borderRadius: 3,
    },
  },
  datasets: {
    bar: {
      barPercentage: 0.75,
      categoryPercentage: 0.6,
    },
  },
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      ticks: {
        autoSkip: true,
        maxTicksLimit: 6,
        padding: 8,
        color: '#8C979E',
      },
      title: {
        display: true,
        padding: 16,
        color: '#8C979E',
      },
      grid: {
        display: true,
        tickLength: 0,
      },
      min: 0,
    },
    x: {
      ticks: {
        color: '#8C979E',
        padding: 8,
      },
      title: {
        display: true,
        padding: 16,
        color: '#8C979E',
      },
      grid: {
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

export const horizontalBarChartBaseOptions: ChartOptions<'bar'> = {
  indexAxis: 'y',
  scales: {
    y: {
      ticks: {
        color: '#8C979E',
        maxTicksLimit: 100,
        autoSkip: false,
      },
      grid: {
        display: false,
      },
    },
    x: {
      ticks: {
        maxTicksLimit: 6,
      },
      grid: {
        display: true,
        tickLength: 0,
      },
      border: {
        display: false,
      },
    },
  },
};
