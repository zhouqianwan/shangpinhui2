import { reqDetailInfo, reqAddShopcar } from '@/api'
import { getuuid } from '@/utils/uuid_token'
const state = {
  goodInfo: {},
  uuid: getuuid()
}

const mutations = {
  GETGOODINFO(state, value) {
    state.goodInfo = value
  }
}

const actions = {
  async getGoodInfo({ commit }, skuid) {
    let res = await reqDetailInfo(skuid)
    if (res.code == 200) {
      commit('GETGOODINFO', res.data)
    }
  },
  // 添加到购物车
  async addToShopcart({ commit }, { skuId, skuNum }) {
    let res = await reqAddShopcar(skuId, skuNum)
    if (res.code == 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
  }
}

const getters = {
  categoryView(state) {
    return state.goodInfo.categoryView || {}
  },
  skuInfo(state) {
    return state.goodInfo.skuInfo || {}
  },
  spuSaleAttrList(state) {
    return state.goodInfo.spuSaleAttrList
  },
  skuInfo(state) {
    return state.goodInfo.skuInfo || {}
  }
}

export default {
  getters,
  actions,
  mutations,
  state
}