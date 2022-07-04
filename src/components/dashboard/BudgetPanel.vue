<template>
<dashboard-panel title="Budget" class="col-12 col-md-6 col-xl-4" v-if="balance">
  <div class="h3">
    <span>Fiat balance: </span>
    <span>${{ balance.fiat_balance }}</span>
  </div>
  <div class="h3 border-bottom">
    <span>Crypto balance: </span>
    <span>~${{ balance.crypto_balance }}</span>
  </div>
  <div class="h3">
    <span>Total balance: </span>
    <span>~${{ balance.fiat_balance + balance.crypto_balance }}</span>
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
import useUserStore from '@/store/user';
import { storeToRefs } from 'pinia';

const userStore = useUserStore();

const { balance } = storeToRefs(userStore);

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
      text: 'Balance in the last 7 days'
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
      label: 'Balance',
      data: maximums,
      fill: true
    }]
  },
  options: chartOptions
});
</script>
