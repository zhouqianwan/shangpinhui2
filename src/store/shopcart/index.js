import { reqShopCartInfo, deleteGoods, reqUpdataChecked } from '@/api'

const state = {
  shopcartInfo: [],
}

const mutations = {
  // 获取购物车中的数据
  GETSHOPCARTINFO(state, value) {
    state.shopcartInfo = value
  }
}

const actions = {
  // 获取购物车中的商品信息
  async getShopcartInfo({ commit }) {
    let res = await reqShopCartInfo()
    if (res.code == 200) {
      commit('GETSHOPCARTINFO', res.data)
    }
  },
  // 点击删除，删除该商品
  async deleteGoods({ commit }, skuId) {
    let res = await deleteGoods(skuId)
    if (res.code == 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }

  },
  // 切换商品选中状态
  async updataChecked({ commit }, { skuid, isChecked }) {
    let res = await reqUpdataChecked({ skuID: skuid, isChecked })
    if (res.code == 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
  },
  // 删除全部已选中的商品
  deleteAllChecked(context) {
    let proAll = []
    context.getters.cartInfo.cartInfoList.forEach(element => {
      let pro = element.isChecked == 1 ? context.dispatch('deleteGoods', element.skuId) : ''
      proAll.push(pro)
    });
    Promise.all(proAll)

  },
  // 全选按钮的处理
  selectAll(context, isChecked) {
    let proAll = []
    context.getters.cartInfo.cartInfoList.forEach((item) => {
      let pro = context.dispatch('updataChecked', { skuid: item.skuId, isChecked })
      proAll.push(pro)
    })
    return Promise.all(proAll)
  }
}

const getters = {
  // 简化购物车中的数据  设计假报错，简化不了
  // cartInfoList(state) {
  //   return state.shopcartInfo[0].cartInfoList || []
  // }
  cartInfo(state) {
    return state.shopcartInfo[0] || {}
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}