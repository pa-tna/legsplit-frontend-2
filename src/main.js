import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import { Dropdown } from 'floating-vue'

createApp(App)
  .component('VDropdown', Dropdown)
  .mount('#app')
