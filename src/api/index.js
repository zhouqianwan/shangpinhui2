// 对API进行统一管理
import requests from './requests.js'
// 引入mock请求
import mockRequests from './mockRequests'

// 获取三级列表的数据  url:/api/product/getBaseCategoryList   method:'get
export const reqCategoryList = () => requests({ url: '/product/getBaseCategoryList', method: 'get' })

// 使用mock获取banner的数据
export const reqBannerList = () => mockRequests({ url: '/banner', method: 'get' })
// 使用mock获取floor类里面的数据
export const reqFloorList = () => mockRequests({ url: '/floor', method: 'get' })

// 获取search里面商品详情   url:/api/list   method:'get'
export const reqSearchInfo = (params) => requests({ url: '/list', method: 'post', data: params })

// 获取商品详情   url:/api/item/{ skuId }  method:get
export const reqDetailInfo = (skuId) => requests({ url: `/item/${skuId}`, method: 'get' })

// 添加到购物车中   url:/api/cart/addToCart/{ skuId }/{ skuNum }   method:'post'
export const reqAddShopcar = (skuId, skuNum) => requests({ url: `/cart/addToCart/${skuId}/${skuNum}`, method: 'post' })

// 获取购物车列表  url:/api/cart/cartList   method:get
export const reqShopCartInfo = () => requests({ url: '/cart/cartList', method: 'get' })

// 删除商品信息   url:/api/cart/deleteCart/{skuId}  method:delete
export const deleteGoods = (skuId) => requests({ url: `/cart/deleteCart/${skuId}`, method: 'delete' })

// 切换输入框的选中状态   url:/api/cart/checkCart/{skuID}/{isChecked}   method:get
export const reqUpdataChecked = ({ skuID, isChecked }) => requests({ url: `/cart/checkCart/${skuID}/${isChecked}`, method: 'get' })

// 用户注册   url:/api/user/passport/register  method:post
export const reqRegister = (data) => requests({ url: `/user/passport/register`, method: 'post', data })

// 获取验证码  url:/api/user/passport/sendCode/{phone}   method:get
export const reqGetCode = (phone) => requests({ url: `/user/passport/sendCode/${phone}`, methos: 'get' })

// 用户登录  url:/api/user/passport/login
export const reqLogin = (data) => requests({ url: '/user/passport/login', method: 'post', data })

