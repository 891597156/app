import Vue from 'vue'
import App from './App.vue'
// 引入路由
import router from '@/router'
// 三级联动组件--全局组件
import TypeNav from '@/components/TypeNav'
import Carsousel from "@/components/Carousel"
import Pagination from "@/components/Pagination"
// 第一个参数：全局组件的名字 第二个参数：哪一个组件
Vue.component(TypeNav.name,TypeNav)
Vue.component(Carsousel.name,Carsousel)
Vue.component(Pagination.name,Pagination)
// 引入仓库
import store from '@/store'

// 引入MockServer.js 
import './mock/mockServe'

// 引入swiper样式
import 'swiper/css/swiper.css'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  // 注册路由：底部的写法kv一致可简写
  router,
  // 注册仓库：组件实例的身上会多一个属性$store属性
  store,
  beforeCreate(){
    // 全局事件总线
    Vue.prototype.$bus = this;
  }
}).$mount('#app')
