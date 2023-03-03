<script setup>
import { getPdfs } from '../services/pdfChooser.js';
import { debouncedThrottle } from '../services/patience.js';

import { reactive, ref } from 'vue';

const getPdfsThrottled = debouncedThrottle(getPdfs, 500);
const dropdownIsOpen = ref(false);

const pdfList = reactive([]);

function searchPdfs(ev) {
  const search = ev.target.value;
  if (search.replace(/\s+/g, '')) {
    getPdfsThrottled
      .run(search)
      .then((resp) => resp.json())
      .then((json) => {
        pdfList.length = 0;
        pdfList.push(...json);
        console.log(pdfList);
        dropdownIsOpen.value = true;
      });
  } else {
    pdfList.length = 0;
    dropdownIsOpen.value = false;
  }
}
</script>

<template>
  <VDropdown
    :distance="1"
    :triggers="[]"
    :placement="bottom"
    :shown="dropdownIsOpen"
  >
    <input type="text" placeholder="Find a PDF&hellip;" @input="searchPdfs" />
    <template #popper>
      <div id="pdfResults">Woo yay test</div>
    </template>
  </VDropdown>
</template>

<style scoped>
input {
  width: 400px;
}
#pdfResults {
  border: 1px solid black;
  width: 400px;
  padding: 1px 2px;
}
</style>
