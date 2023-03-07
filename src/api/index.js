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

// 获取用户登录信息   url:/api/user/passport/auth/getUserInfo   method:get
export const reqUsersInfo = () => requests({ url: '/user/passport/auth/getUserInfo', method: 'get' })

// 退出登录   url:/api/user/passport/logout   method:get
export const reqLogOut = () => requests({ url: '/user/passport/logout', method: 'get' })

// 获取用户地址数据   url:/api/user/userAddress/auth/findUserAddressList   method:get
export const reqAddress = () => requests({ url: '/user/userAddress/auth/findUserAddressList', method: 'get' })

// 通过mock数据，获取过来的数据  url:/api/addres
export const reqAddres = () => mockRequests({ url: '/addres', method: 'get' })

// 获取订单交易页信息   url:/api/order/auth/trade  method:get
export const reqOrderInfo = () => requests({ url: '/order/auth/trade', method: 'get' })

// 提交订单  url:'/api/order/auth/submitOrder?tradeNo={tradeNo}   method:post
export const reqCommitOrder = (tradeNo, data) => requests({ url: `/order/auth/submitOrder?tradeNo=${tradeNo}`, method: 'post', data })

// 获取订单支付信息   url:/api/payment/weixin/createNative/{orderId}   method:get
export const reqGetPayInfo = (orderId) => requests({ url: `/payment/weixin/createNative/${orderId}`, method: 'get' })

// 获取订单支付状态   url:/api/payment/weixin/queryPayStatus/{orderId}   method:get
export const reqOrderState = (orderId) => requests({ url: `/payment/weixin/queryPayStatus/${orderId}`, method: 'get' })

// 获取我的订单列表   url:/api/order/auth/{page}/{limit}   method:get
export const reqOrderList = (page, limit) => requests({ url: `/order/auth/${page}/${limit}`, method: 'get' })
