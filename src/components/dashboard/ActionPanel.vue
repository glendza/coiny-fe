<template>
<dashboard-panel title="Transactions" class="col-12 col-md-6 col-xl-4">
  <card v-for="transaction in transactions" :key="transaction.id">
    <template #header>
      <div class="d-flex justify-content-between">
        <span v-if="transaction.direction === TransactionType.CRYPTO_TO_FIAT">
          Crypto to fiat transfer
        </span>
        <span v-else>
          Fiat to crypto transfer
        </span>
        <span>
          {{ dateUtils.toLocale(transaction.created_at) }}
        </span>
      </div>
    </template>
    <template v-if="transaction.direction === TransactionType.CRYPTO_TO_FIAT">
      Bought {{ +transaction.crypto_amount }} {{ transaction.cryptocurrency }} for {{ +transaction.fiat_amount }} {{ transaction.fiat_currency }}
    </template>
    <template v-else>
      Bought {{ +transaction.fiat_amount }} {{ transaction.fiat_currency }} for {{ +transaction.crypto_amount }} {{ transaction.cryptocurrency }}
    </template>
  </card>
  <shruggie v-if="!transactions.length">
    No transactions yet
  </shruggie>
</dashboard-panel>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import useUserStore from '@/store/user';
import Card from '@/components/layout/Card.vue';
import DashboardPanel from '@/components/dashboard/DashboardPanel.vue';
import { TransactionType } from '@/types/user';
import { dateUtils } from '@/utils';

const userStore = useUserStore();

const { transactions } = storeToRefs(userStore);
</script>
