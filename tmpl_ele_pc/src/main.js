import Vue from 'vue'
import Router from 'vue-router'
// import ElementUI from 'element-ui'
//按需加载
import './config/element-ui.config'

import routes from '@/router/router'
import store from '@/store/index'

// import 'element-ui/lib/theme-chalk/index.css'

import '@/common/style/_mixin.scss'
import '@/common/style/mintReset.scss'
import './config/rem'
import App from './App'

Vue.config.productionTip = false

Vue.use(Router)


const router = new Router({
 	routes,
   'linkActiveClass':'active'
})

new Vue({
  router,
  store,
  created:function(){
  	
  },
}).$mount('#app')

