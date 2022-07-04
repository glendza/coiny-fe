<template>
<dashboard-panel title="Budget" class="col-12 col-md-6 col-xl-4">
  <div class="h3">
    <span>Fiat budget: </span>
    <span>394$</span>
  </div>
  <div class="h3 border-bottom">
    <span>Crypto budget: </span>
    <span>~555$</span>
  </div>
  <div class="h3">
    <span>Total budget: </span>
    <span>~5454$</span>
  </div>
  <div class="bg-light">
    <LineChart v-bind="lineChartProps" />
  </div>
</dashboard-panel>
</template>

<script setup lang='ts'>
import { computed } from 'vue';
import DashboardPanel from '@/components/dashboard/DashboardPanel.vue';
import { LineChart, useLineChart } from 'vue-chart-3';
import { Chart, registerables, ChartOptions } from 'chart.js';

// Chart
const chartOptions = computed<ChartOptions<'line'>>(() => ({
  scales: {
    yRight: {
      type: 'linear',
      position: 'right'
    }
  },
  plugins: {
    legend: {
      display: false
    },
    title: {
      display: true,
      text: 'Budget in the last 7 days'
    }
  }
}));

Chart.register(...registerables);
const days = ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'];
const maximums = [32, 43, 20, 50, 33, 34, 95, 43, 9];
const { lineChartProps } = useLineChart({
  chartData: {
    labels: days,
    datasets: [{
      label: 'Budget',
      data: maximums,
      fill: true
    }]
  },
  options: chartOptions
});
</script>
