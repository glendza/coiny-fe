<template>
<main class="container d-flex flex-grow-1 align-items-center justify-content-center">
  <div class="login-form card">
    <div class="card-header text-center user-select-none">
      Login
    </div>
    <div class="card-body d-flex flex-column" v-on:keyup.enter="login">
      <div class="mb-2">
        <label class="form-label user-select-none" for="email">Email:</label>
        <input
          type="text"
          id="email"
          name="email"
          class="form-control"
          v-model="email"
        />
      </div>
      <div class="mb-2">
        <label class="form-label user-select-none" for="password">Password:</label>
        <input
          type="password"
          id="pass"
          name="password"
          minlength="8"
          required
          class="form-control"
          v-model="password"
        />
      </div>
      <div v-if="loginFailed" class="mb-2 text-danger">Invalid credentials provided.</div>
      <a @click="login" class="btn btn-primary align-self-center mt-2" :disabled="loading">Login</a>
    </div>
  </div>
</main>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import useAuthStore from '@/store/auth';

const authStore = useAuthStore();

// Data
const email = ref<string>('');
const password = ref<string>('');
const { loading, loginFailed } = storeToRefs(authStore);

const login = async () => {
  await authStore.login(email.value, password.value);
};
</script>

<style lang="scss" scoped>
.login-form {
  width: 350px;
}
</style>
