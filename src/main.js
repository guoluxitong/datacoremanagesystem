import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import store from './store'
import Element from 'element-ui'
import 'normalize.css/normalize.css'
import './styles/index.scss'
import router from './routes'
import contextMenu from './components/contextMenu'
import contextMenuItem from './components/contextMenu/contextMenuItem'


Vue.config.productionTip = false
//axios.defaults.withCredentials = true
Vue.use(VueAxios, axios)
Vue.use(contextMenu)
Vue.use(contextMenuItem)
Vue.component('menu-context', contextMenu)
Vue.component('menu-context-item', contextMenuItem)
Vue.use(Element)


//const store = new Vuex.Store(storeSetting)
//store.commit('test')
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')