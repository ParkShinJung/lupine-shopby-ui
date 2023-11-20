import './assets/main.css'
// import '@progress/kendo-theme-default/dist/all.css'
import './assets/style.scss'
// import "@progress/kendo-theme-bootstrap/dist/all.scss";
// import "bootstrap/scss/bootstrap.scss";

import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import { createPinia } from 'pinia'

// import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'

// fontawesome import
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(fas)

const app = createApp(App)
const pinia = createPinia()

// createApp을 통해 생성한Application 인스턴스의 component API 활용
app.component('font-awesome-icon', FontAwesomeIcon)

// app.use(BootstrapVue)
// app.use(IconsPlugin)
app.use(router)
app.use(pinia)
app.mount('#app')

