<script setup>
import Toolbar from './components/Toolbar.vue';
import PageView from './components/PageView.vue';

import { store } from './services/store.js';

import { ref, watch } from 'vue';
</script>

<template>
  <Toolbar />
  <PageView />
</template>

<style scoped></style>
