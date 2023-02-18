import { reqAddress, reqAddres, reqOrderInfo, reqCommitOrder } from '@/api'

const state = {
  addres: [],
  orderInfo: {},
  orderId: ''
}

const mutations = {
  GETADDRES(state, value) {
    state.addres = value
  },
  GETORDERINFO(state, value) {
    state.orderInfo = value
  },
  // 提交订单
  COMMITORDER(state, value) {
    state.orderId = value
  }
}

const getters = {}

const actions = {
  async getAddress({ commit }) {
    let res = await reqAddress()
  },
  // 获取mock数据的addres
  async getAddres({ commit }) {
    let res = await reqAddres()
    if (res.code == 200) {
      commit('GETADDRES', res.data)
    }
  },
  // 获取用户订单信息
  async getOrderInfo({ commit }) {
    let res = await reqOrderInfo()
    if (res.code == 200) {
      commit('GETORDERINFO', res.data)
      return 'ok'
    } else {
      return Promise.reject(new Error('获取用户订单失败，请刷新重试！'))
    }
  },
  // 点击提交按钮，提交商品信息
  async commitOrder({ commit }, { tradeNo, data }) {
    let res = await reqCommitOrder(tradeNo, data)
    if (res.code == 200) {
      commit('COMMITORDER', res.data)
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}