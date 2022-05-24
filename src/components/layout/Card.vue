<template>
<div class="card mb-2">
  <div class="card-header user-select-none">
    <slot name="header" />
  </div>
  <div class="card-body d-flex flex-column" v-on:keyup.enter="login">
    <p class="card-text">
      <slot />
    </p>
  </div>
</div>
</template>
