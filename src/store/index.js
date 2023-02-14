import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

// 引入小仓库
import home from './home'
import ListContainer from './listContainer'
import search from './search'

export default new Vuex.Store({
  modules: {
    home,
    ListContainer,
    search
  }
})