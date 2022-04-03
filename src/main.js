import Vue from 'vue'
import App from './App.vue'
import router from './router.js'
import vuetify from './plugins/vuetify'
import GmapVue from 'gmap-vue'

Vue.use(GmapVue, {
  load: {
    key: process.env.VUE_APP_GOOGLE_MAP_API,
    customCallback: false,
  },
})
Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
