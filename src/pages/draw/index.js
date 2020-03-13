import Vue from 'vue'
import App from './index.vue'
import 'lib-flexible/flexible.js'
import cjhUI from 'cjh-ui-vue'
import 'cjh-ui-vue/lib/cjh-ui-vue.css'
import '@/styles/common.less'

Vue.config.productionTip = false

Vue.use(cjhUI)

new Vue({
  render: h => h(App)
}).$mount('#app')
