// search仓库
import { reqSearchInfo } from '@/api'

const state = {
  searchInfo: {}
}

const mutations = {
  // 获取search中的商品信息
  GETSEARCHINFO(state, value) {
    state.searchInfo = value
  }
}

const actions = {
  // 获取search中的商品信息
  async getSearchInfo({ commit }, params = {}) {
    let res = await reqSearchInfo(params)
    if (res.code == 200) {
      commit('GETSEARCHINFO', res.data)
    }
  }
}

const getters = {
  // 简化数据
  // 属性数据
  attrsList(state) {
    return state.searchInfo.attrsList
  },
  // 商品数据
  goodsList(state) {
    return state.searchInfo.goodsList
  },
  // tradeMark
  trademark(state) {
    return state.searchInfo.trademarkList
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}