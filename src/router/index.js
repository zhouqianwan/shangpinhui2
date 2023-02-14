// 配置路由的地方
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
// 引入路由组件
import Home from '@/pages/Home'
import Search from '@/pages/Search'
import Login from '@/pages/Login'
import Register from '@/pages/Register'

// 先把VueRouter原型对象的push，先保存一份
let originPush = VueRouter.prototype.push
let originReplace = VueRouter.prototype.replace

// 重写push和replace方法
// 里面有单个参数：location,往哪里跳转
VueRouter.prototype.push = function (location, resolve, reject) {
  // 如果有成功和失败的回调函数，就用之前的push方法
  if (resolve && reject) {
    // call方法：可以调用函数一次，能篡改函数的上下文
    originPush.call(this, location, resolve, reject)
  } else {
    // 这里就是没有成功或失败的回调函数，就给他手动加成功和失败的回调函数
    originPush.call(this, location, () => { }, () => { })
  }
}
VueRouter.prototype.replcae = function (location, resolve, reject) {
  // 如果有成功和失败的回调函数，就用之前的push方法
  if (resolve && reject) {
    // call方法：可以调用函数一次，能篡改函数的上下文
    originReplace.call(this, location, resolve, reject)
  } else {
    // 这里就是没有成功或失败的回调函数，就给他手动加成功和失败的回调函数
    originReplace.call(this, location, () => { }, () => { })
  }
}


export default new VueRouter(
  {
    routes: [
      {
        path: '/home',
        component: Home,
        name: 'home',
        // 路由元信息，this.$route.meta中可以获取到
        meta: {
          show: true
        }
      },
      {
        // 加？表示，可能会传空值
        path: '/search/:keyword?',
        component: Search,
        name: 'search',
        meta: {
          show: true
        }
      },
      {
        path: '/login',
        component: Login,
        name: 'login',
        // 通过路由元信息，判断是否需要footer
        meta: {
          show: false
        }
      },
      {
        path: '/register',
        component: Register,
        name: 'register',
        // 通过路由元信息，判断是否需要footer
        meta: {
          show: false
        }
      },
      // 路由重定向
      {
        path: '/',
        redirect: '/home'
      }
    ]
  }
)