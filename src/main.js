import Vue from 'vue'
import App from './App.vue'
// 引入TypeNav,因为多次使用，把他注册为全局组件
import TypeNav from '@/components/TypeNav'
// 注册
Vue.component('TypeNav', TypeNav)

Vue.config.productionTip = false

// 引入路由
import router from '@/router'
// 引入仓库
import store from '@/store'
// 引入mock的数据
import mock from '@/mock/serveMock'
// 引入swiper的样式
import 'swiper/swiper.min.css'
import 'swiper/swiper-bundle.min.css'
// 引入carousel,将轮播图封装成一个独立的组件
import Carousel from '@/components/Carousel'
Vue.component('Carousel', Carousel)
// 把分页器注册为全局组件
import Pagination from '@/components/Pagination'
Vue.component('Pagination', Pagination)


new Vue({
  render: h => h(App),
  router,
  store,
  mock
}).$mount('#app')
