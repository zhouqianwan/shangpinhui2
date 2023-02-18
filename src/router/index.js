// 配置路由的地方
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
// 引入路由组件
import routes from './route'
import Store from '@/store'

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


let router = new VueRouter(
  {
    routes,
    scrollBehavior(to, from, savedPosition) {
      return { y: 0 }
    }
  }
)

router.beforeEach(async (to, from, next) => {
  // 如果有token的值，说明已经登录了
  if (Store.state.user.token) {
    // 登录之后，就不能再去login页面了
    if (to.path == '/login') {
      next('/home')
    } else {
      // 登录没去login页面  
      /* 如果有loginName说明有登录信息 */
      if (Store.state.user.loginName) {
        next()
      } else {
        /* 登录了，没用户信息，发请求重新获取用户信息  */
        try {
          await Store.dispatch('getUsersInfo')
          next()
        } catch (error) {
          // 如果获取不到用户信息（token失效）  发退出登录的请求，清除各个数据
          Store.dispatch('getLogOut')
          next('/login')
        }
      }
      next()
    }
  } else {
    // 说明没登录
    next()
  }
})


export default router