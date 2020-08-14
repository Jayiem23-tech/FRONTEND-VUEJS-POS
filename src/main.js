import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import Admin from './admin.vue'
import Mainform from './Mainform.vue' 
import numeral from 'numeral' 
 

Vue.use(VueRouter)
Vue.config.productionTip = false
Vue.use(VueResource); 

const router = new VueRouter({
  mode:'history',
  routes:[ 
    {path:'/',component:Mainform},
    {path:'/admin',component:Admin}
  ]
}) 
export const bus = new Vue(); 
export const Format = (number) =>{
  var newFormat = numeral(number).format('0,0.00');
  return newFormat;
}

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
