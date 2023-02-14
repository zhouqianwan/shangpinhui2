import { reqBannerList } from '@/api'
const state = {
  bannerList: []
}

const mutations = {
  GETBANNERLIST(state, value) {
    state.bannerList = value
  }
}

const actions = {
  async getBannerList({ commit }) {
    let res = await reqBannerList()
    if (res.code == 200) {
      commit('GETBANNERLIST', res.data)
    }
  }
}

const getters = {}

export default {
  state,
  mutations,
  getters,
  actions
}