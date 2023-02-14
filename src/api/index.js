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