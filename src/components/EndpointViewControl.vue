<script setup>
import { store } from '../services/store.js';

const emit = defineEmits(['editEndpoint']);
</script>

<template>
  <span>{{ store.endpoint || '[no endpoint set]' }}</span>
  <button @click="() => emit('editEndpoint', true)">Change</button>
</template>
