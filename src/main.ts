import { createHead } from '@vueuse/head'
import vhCheck from 'vh-check'
import { createApp } from 'vue'

import App from './App.vue'
import router from './router/index'

import { store } from '@/store/index'

import 'virtual:windi-base.css'
// import 'virtual:windi-components.css'
import 'virtual:windi-utilities.css'
import './styles/main.scss'

const head = createHead()

const app = createApp(App)

vhCheck({
  cssVarName: 'vh-offset',
  force: false,
  bind: true,
  redefineVh: false,
  updateOnTouch: false,
})

app.use(store)
app.use(head)
app.use(router)

app.mount('#app')
