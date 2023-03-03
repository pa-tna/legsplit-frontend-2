<script setup>
import { getPdfs } from '../services/pdfChooser.js';
import { debouncedThrottle } from '../services/patience.js';

import { reactive } from 'vue';

const getPdfsThrottled = debouncedThrottle(getPdfs, 500);

const pdfList = reactive([]);

function searchPdfs(ev) {
  const search = ev.target.value;
  if (search.replace(/\s+/g, '')) {
    getPdfsThrottled.run(search)
      .then(resp => resp.json())
      .then(json => {
        pdfList.length = 0;
        pdfList.push(...json);
      });
  } else {
    pdfList = [];
  }
}
</script>

<template>
  <input type="text" placeholder="Find a PDF&hellip;" @input="searchPdfs" />
</template>

<style scoped>
input { width: 30em }
</style>
