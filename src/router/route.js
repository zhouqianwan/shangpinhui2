import Home from '@/pages/Home'
import Search from '@/pages/Search'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'

export default
  [
    {
      path: '/shopcart',
      component: ShopCart,
      name: 'shopcart'
    },
    {
      path: '/addcartsuccess',
      component: AddCartSuccess,
      name: 'addcartsuccess'
    },
    {
      path: '/detail/:skuid',
      component: Detail,
      name: 'detail',
      // 路由元信息，this.$route.meta中可以获取到
      meta: {
        show: true
      }
    },
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
