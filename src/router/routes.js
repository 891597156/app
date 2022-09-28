// 引入路由组件
import Home from '@/pages/Home'
import Search from '@/pages/Search'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
// 路由配置信息
export default [{
    path: '/',
    redirect: '/home',
  },
  {
    path: '/shopcart',
    name:'shopcart',
    component: ShopCart,
    meta: {
      show: true
    }
  },
  {
    path: '/addcartsuccess',
    name:'addcartsuccess',
    component: AddCartSuccess,
    meta: {
      show: true
    }
  },
  {
    path: '/detail/:skuid',
    component: Detail,
    meta: {
      show: true
    }
  },
  {
    path: '/home',
    component: Home,
    meta: {
      show: true
    }
  },
  {
    name: 'search',
    path: '/search/:keyword?',
    component: Search,
    meta: {
      show: false
    },
    // 路由组件能不能传递props数据？ 可以
    // 布尔值写法：params
    // props:true,
    // 对象写法：额外得给路由组件传递一些props
    // props:{a:11111,b:22222}
    // 函数写法：可以params参数，query参数，通过props传递给路由组件
    props: ($route) => {
      return {
        keyword: $route.params.keyword,
        k: $route.query.k
      }
    }
  },
  {
    path: '/login',
    component: Login,
    meta: {
      show: true
    }
  },
  {
    path: '/register',
    component: Register,
    meta: {
      show: true
    }
  },

]