<template>
<nav class="navbar navbar-expand-sm navbar-dark bg-dark p-2">
  <router-link to="/" class="navbar-brand">Coiny</router-link>
  <button
    class="navbar-toggler"
    type="button"
    aria-controls="navbarSupportedContent"
    aria-expanded="false"
    aria-label="Toggle navigation"
    @click="toggleMenu"
  >
    <span class="navbar-toggler-icon"></span>
  </button>
  <div :class="{'collapse': !isExpanded}" class="navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li
        class="nav-item"
        v-for="item in menuItems"
        :key="item.label"
      >
        <router-link
          class="nav-link"
          :class="{'active': $route.matched.some(({ path }) => path === item.route)}"
          :to="item.route"
        >
          {{ item.label }}
        </router-link>
      </li>
    </ul>
  </div>
</nav>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';

// Data
const $route = useRoute();
const isExpanded = ref<boolean>(false);
const menuItems: { label: string; route: string; }[] = [
  {
    label: 'Home',
    route: '/'
  },
  {
    label: 'Strategy',
    route: '/strategy'
  }
];

// Methods
const toggleMenu = (): void => {
  isExpanded.value = !isExpanded.value;
};
</script>
