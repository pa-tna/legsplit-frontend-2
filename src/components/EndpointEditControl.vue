<script setup>
import { store } from '../services/store.js';

const emit = defineEmits(['editEndpoint']);

function changeEndpoint(ev) {
  const endpoint = document.getElementById('itEndpoint').value;
  store.endpoint = endpoint;
  emit('editEndpoint', false);
}
</script>

<template>
  <form @submit.prevent="changeEndpoint">
    <input
      type="text"
      id="itEndpoint"
      placeholder="https://0.0.0.0:8000"
      :value="store.endpoint"
      required
      pattern="https?://(((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)\.?\b){4}|((?!-)[A-Za-z0-9-]{1,63}(?<!-)\.)+[A-Za-z]+)(:80|:[1-9][0-9]{0,4})?"
      title="The value must be a valid host, beginning with http(s):// and optionally ending with a port"
    />
    <button type="submit">Confirm</button>
    <button @click="() => emit('editEndpoint', false)">Cancel</button>
  </form>
</template>
