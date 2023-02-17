import { reqRegister, reqGetCode, reqLogin } from '@/api'

const state = {
  code: '',
  token: ''
}

const mutations = {
  // 获取验证码
  GETCODE(state, value) {
    state.code = value
  },
  // 登录
  GOLOGIN(state, value) {
    console.log(55555);
    state.token = value
  }
}

const actions = {
  // 注册
  async goRegister({ commit }, data) {
    console.log(data);
    let res = await reqRegister(data)
    if (res.code == 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error('手机号重复！'))
    }
  },
  // 获取验证码
  async getCode({ commit }, phone) {
    let res = await reqGetCode(phone)
    if (res.code == 200) {
      commit('GETCODE', res.data)
    } else {
      return Promise.reject(new Error('faile'))
    }
  },
  // 进行登录
  async goLogin({ commit }, data) {
    let res = await reqLogin(data)

    if (res.code == 200) {
      commit('GOLOGIN', res.data.token)
    }

  }
}

const getters = {}

export default {
  state,
  getters,
  mutations,
  actions
}