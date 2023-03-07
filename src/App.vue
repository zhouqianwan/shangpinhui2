<template>
  <div id="app">
    <Header></Header>
    <router-view></router-view>
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
// 引入全局组件(非路由组件)
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
export default {
  name: 'App',
  components: {
    // 注册组件
    Footer,
    Header,
    Login,
    Register
  },
  mounted() {
    // 把三级列表数据的请求放在这，优化，提高效率
    this.$store.dispatch('getCategoryList')
  }
}
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0;
}
</style>
