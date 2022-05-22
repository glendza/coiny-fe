<template>
<dashboard-panel title="Action Log">
  <div class="card mb-2" v-for="action in actions" :key="action.id">
    <div class="card-header user-select-none d-flex justify-content-between">
      <span>
        {{ action.title || 'Action' }}
      </span>
    </div>
    <div class="card-body d-flex flex-column" v-on:keyup.enter="login">
      <p class="card-text">{{ action.content }}</p>
    </div>
  </div>
  <shruggie v-if="!actions.length">
    No actions yet
  </shruggie>
</dashboard-panel>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import useUserStore from '@/store/user';
import DashboardPanel from '@/components/DashboardPanel.vue';

const userStore = useUserStore();

const { actions } = storeToRefs(userStore);
</script>
