import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

// 引入小仓库
import home from './home'
import ListContainer from './listContainer'
import search from './search'
import details from './detail'
import shopcart from './shopcart'
import user from './user'
import trade from './trade'

export default new Vuex.Store({
  modules: {
    home,
    ListContainer,
    search,
    details,
    shopcart,
    user,
    trade
  }
})