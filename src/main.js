import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { init, bind } from './utils/custom-life-cycle'

Vue.config.productionTip = false

init()


;(function() {
  // eruda初始化
  var src = '//cdn.jsdeliver.net/npm/eruda';
  if (!/erauda=true/.test(window.location) && localStorage.getItem('active-eruda') != 'true') return;
  document.write('<scr' + 'ipt src="' + src + '"></scr' + 'ipt>');
  document.write('<scr' + 'ipt>eruda.init();</scr' + 'ipt>');
})


const vm = new Vue({
  router,
  render: h => h(App)
}).$mount('#app')


bind(vm)
