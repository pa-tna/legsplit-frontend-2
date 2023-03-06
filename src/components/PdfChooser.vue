<script setup>
import { getPdfs } from '../services/pdfChooser.js';
import { debouncedThrottle } from '../services/patience.js';

import { reactive, ref } from 'vue';

const getPdfsThrottled = debouncedThrottle(getPdfs, 500);
const dropdownIsOpen = ref(false);

const pdfs = reactive([]);

function searchPdfs(ev) {
  const search = ev.target.value;
  console.log("SEARCHstripped '" + search.replace(/\s+/g, '') + "'")
  if (search.replace(/\s+/g, '')) {
    getPdfsThrottled
      .run(search)
      .then((resp) => resp.json())
      .then((json) => {
        pdfs.length = 0;
        pdfs.push(...json);
        dropdownIsOpen.value = true;
      });
  } else {
    getPdfsThrottled.cancel();
    pdfs.length = 0;
    dropdownIsOpen.value = false;
  }
}
</script>

<template>
  <VDropdown
    distance="1"
    placement="bottom-start"
    theme="dropdown"
    :delay="{ show: 0, hide: 0 }"
    :triggers="[]"
    :popperTriggers="[]"
    :shown="dropdownIsOpen"
    :autoHide="false"
  >
    <input type="text" placeholder="Find a PDF&hellip;" @input="searchPdfs" />
    <template #popper>
      <div id="pdfResults">
        <template v-if="pdfs.length > 0">
          <ul>
            <li v-for="pdf in pdfs">{{ pdf.filename }}</li>
          </ul>
        </template>
        <span v-else>No results</span>
      </div>
    </template>
  </VDropdown>
</template>

<style scoped>
input {
  width: 400px;
  display: inline-block;
}
#pdfResults {
  border: 1px solid black;
  width: 400px;
  padding: 1px 2px;
}
</style>
