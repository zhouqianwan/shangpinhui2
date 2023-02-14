// 二次封装axios
import axios from 'axios'
import 'nprogress/nprogress.css'
import nprogress from 'nprogress'


// 利用axios的create方法，创建一个axios实例
const requests = axios.create({
  // 基础路径
  baseURL: '/mock',
  // 超时的时间是5秒
  timeout: 5000
})
// 请求拦截器
requests.interceptors.request.use((config) => {
  nprogress.start()
  return config
})

// 响应拦截器
requests.interceptors.response.use((res) => {
  nprogress.done()
  // 成功的回调函数
  return res.data
}, () => {
  // 失败的回调函数
  return Promise.reject(new Error('faile'))
})





export default requests;