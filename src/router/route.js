// import Home from '@/pages/Home'
// 路由懒加载
const Home = () => import('@/pages/Home')
// import Search from '@/pages/Search'
const Search = () => import('@/pages/Search')
// import Login from '@/pages/Login'
const Login = () => import('@/pages/Login')
// import Register from '@/pages/Register'
const Register = () => import('@/pages/Register')
// import Detail from '@/pages/Detail'
const Detail = () => import('@/pages/Detail')
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
import Center from '@/pages/Center'
import CenterOne from '@/pages/Center/rightOne.vue'
import CenterTwo from '@/pages/Center/centerTwo.vue'
import Test1 from '@/pages/test1/test1.vue'

export default
  [
    {
      path: '/test1',
      component: Test1,
      name: 'test1'
    },
    {
      path: '/center',
      component: Center,
      name: 'center',
      children: [
        {
          path: 'one',
          component: CenterOne
        },
        {
          path: 'two',
          component: CenterTwo
        },
        {
          path: '/',
          redirect: '/center/one'
        }
      ]
    },
    {
      path: '/paysuccess',
      component: () => import('@/pages/PaySuccess'),
      name: 'paysuccess',
    },
    {
      path: '/pay',
      component: Pay,
      name: 'pay',
      // 路由独享守卫   只有从trade来，才能后进入pay页面
      beforeEnter: (to, from, next) => {
        if (from.path == '/trade') {
          next()
        } else {
          next(false)
        }
      }
    },
    {
      path: '/trade',
      component: Trade,
      name: 'trade',
      // 路由独享守卫   只有从购物车来，才能后进入交易页面
      beforeEnter: (to, from, next) => {
        if (from.path == '/shopcart') {
          next()
        } else {
          next(false)
        }
      }
    },
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
