<template>
<dashboard-panel title="Budget" class="col-12 col-md-6 col-xl-4" v-if="balance">
  <table class="table table-bordered">
    <tbody>
      <tr class="h4 text-light">
        <td>Fiat balance:</td>
        <td>${{ balance.fiat_balance }}</td>
      </tr>
      <tr class="h4 text-light">
        <td>Crypto balance:</td>
        <td>${{ balance.crypto_balance }}</td>
      </tr>
      <tr class="h4 text-light">
        <td>Total balance:</td>
        <td>${{ balance.fiat_balance + balance.crypto_balance }}</td>
      </tr>
    </tbody>
  </table>
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
import { dateUtils } from '@/utils';

const userStore = useUserStore();

const { balance } = storeToRefs(userStore);

// Chart
const chartOptions = computed<ChartOptions<'line'>>(() => ({
  scales: {
    yRight: {
      type: 'linear',
      position: 'right'
    },
    xAxis: {
      display: false,
      position: 'bottom'
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

const chartData = computed(() => {
  return {
    labels: balance.value ? balance.value.balance_snapshots.map((bs) => dateUtils.toLocale(bs.created_at)) : [],
    datasets: [{
      label: 'Balance',
      data: balance.value ? balance.value.balance_snapshots.map((bs) => bs.crypto_balance + bs.fiat_balance) : [],
      fill: true
    }]
  };
});

const { lineChartProps } = useLineChart({ chartData, options: chartOptions });
</script>
