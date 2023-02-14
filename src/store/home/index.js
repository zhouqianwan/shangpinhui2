import { reqCategoryList, reqFloorList } from '@/api'
const state = {
  categoryList: [],
  floorList: []
}

const actions = {
  // 获取三级列表的数据
  async getCategoryList({ commit }) {
    let res = await reqCategoryList()
    if (res.code == 200) {
      commit('GETCATEGORYLIST', res.data)
    }
  },
  // 获取floor里面的数据
  async getFloorList({ commit }) {
    let res = await reqFloorList()
    if (res.code == 200) {
      commit('GETFLOORLIST', res.data)
    }
  }
}

const mutations = {
  // 获取三级列表的数据
  GETCATEGORYLIST(state, value) {
    state.categoryList = value
  },
  // 获取floor的数据
  GETFLOORLIST(state, value) {
    state.floorList = value
  }
}

const getters = {}

export default {
  state,
  mutations,
  getters,
  actions
}