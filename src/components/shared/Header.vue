<template>
  <header class="header">
    <div class="header__logo">
      <img :src="logo" alt="Логотип">
    </div>
    <h1 class="header__title">{{ title }}</h1>
  </header>
  </template>
  
  <script setup lang="ts">

interface Props {
  title?: string;
  logo?: string;
}

withDefaults(defineProps<Props>(), {
  title: undefined,
  logo: undefined,
});
  
  </script>
  
  <style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
}

.header__logo img {
  max-height: 50px;
}

.header__title {
  text-align: center;
  flex-grow: 1;
}
  </style>