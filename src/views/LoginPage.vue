<template>
<main class="container d-flex flex-grow-1 align-items-center justify-content-center">
  <div class="login-form card">
    <div class="card-header text-center user-select-none">
      Login
    </div>
    <div class="card-body d-flex flex-column">
      <div class="mb-2">
        <label class="form-label user-select-none" for="username">Username:</label>
        <input type="text" id="username" name="username" class="form-control">
      </div>
      <div class="mb-2">
        <label class="form-label user-select-none" for="password">Password:</label>
        <input type="password" id="pass" name="password" minlength="8" required class="form-control">
      </div>
      <a @click="login" class="btn btn-primary align-self-center mt-2">Login</a>
    </div>
  </div>
</main>
</template>

<script setup lang="ts">
const login = () => {
  console.log('Login!');
};
</script>

<style lang="scss" scoped>
.login-form {
  width: 350px;
}
</style>
