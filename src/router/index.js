// 配置路由的地方
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
// 使用插件
Vue.use(VueRouter)

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
  routes,
  scrollBehavior (to, from, savedPosition) {
    // return 期望滚动到哪个的位置
    return {top:0}
  }
})