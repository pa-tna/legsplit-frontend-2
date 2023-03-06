<script setup>
import EndpointViewControl from './EndpointViewControl.vue'
import EndpointEditControl from './EndpointEditControl.vue'

import { store } from '../services/store.js'

import { ref } from 'vue'

const currentControl = ref('EndpointViewControl')
const controls = {
  EndpointViewControl,
  EndpointEditControl
}

function editEndpoint(state) {
  currentControl.value = state
    ? 'EndpointEditControl'
    : 'EndpointViewControl'
}
</script>

<template>
  <component
    :is="controls[currentControl]"
    @editEndpoint="editEndpoint"
  ></component>
</template>

<style scoped>
</style>
