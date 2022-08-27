// 配置路由的地方
import Vue from 'vue'
import VueRouter from 'vue-router'
// 使用插件
Vue.use(VueRouter)
// 引入路由组件
import Home from '@/pages/Home'
import Search from '@/pages/Search'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
// 先把VueRouter原型对象得push，先保存一份
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;
// 重写push|replace
// 第一个参数：告诉原阿里得push方法，你往哪里跳转
// 第二个参数：成功得回调
// 迪桑而参数：失败得回调
VueRouter.prototype.push = function(localtion,resolve,reject){
  if(resolve && reject){
    // call||apply区别
    // 相同点：都可以调用函数一次，都可以篡改函数得上下文
    // 不同点：call与apply传递参数：call传递参数用逗号隔开，apply方法执行，传递数组
    originPush.call(this,localtion,resolve,reject)
  }else{
    originPush.call(this,localtion,()=>{},()=>{})
  }
}
VueRouter.prototype.replace = function(lacaltion,reslove,reject){
  if(resolve && reject){
    originReplace.call(this,location,resolve,reject)
  }else{
    originReplace.call(this,location,()=>{},()=>{})
  }
}
// 配置路由
export default new VueRouter({
  // 配置路由
  routes: [{
      path: '/',
      redirect: '/home',
    },
    {
      path: '/home',
      component: Home,
      meta:{
        show:true
      }
    },
    { 
      name:'search',
      path: '/search/:keyword?',
      component: Search,
      meta:{
        show:false
      },
      // 路由组件能不能传递props数据？ 可以
      // 布尔值写法：params
      // props:true,
      // 对象写法：额外得给路由组件传递一些props
      // props:{a:11111,b:22222}
      // 函数写法：可以params参数，query参数，通过props传递给路由组件
      props:($route)=>{
        return {keyword:$route.params.keyword,k:$route.query.k}
      }
    },
    {
      path: '/login',
      component: Login,
      meta:{
        show:true
      }
    },
    {
      path: '/register',
      component: Register,
      meta:{
        show:true
      }
    },
    
  ]
})