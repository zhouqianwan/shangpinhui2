import { reqRegister, reqGetCode, reqLogin, reqUsersInfo, reqLogOut } from '@/api'
import { removeToken } from '@/utils/token.js'

const state = {
  code: '',
  token: localStorage.getItem('TOKEN'),
  loginName: ''
}

const mutations = {
  // 获取验证码
  GETCODE(state, value) {
    state.code = value
  },
  // 登录
  GOLOGIN(state, value) {
    state.token = value
  },
  // 获取用户登录信息
  GETUSERSINFO(state, value) {
    state.loginName = value
  },
  // 退出登录
  GETLOGOUT() {
    state.token = ''
    state.loginName = ''
    removeToken()
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
      // 持久存储到localStorage中
      localStorage.setItem('TOKEN', res.data.token)
    } else {
      return Promise.reject(new Error('faile'))
    }

  },
  // 获取用户信息
  async getUsersInfo({ commit }) {
    let res = await reqUsersInfo()
    if (res.code == 200) {
      commit('GETUSERSINFO', res.data.loginName)
    } else {
      return Promise.reject(new Error('faile'))
    }
  },
  // 退出登录
  async getLogOut({ commit }) {
    let res = await reqLogOut()
    if (res.code == 200) {
      commit('GETLOGOUT')
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
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