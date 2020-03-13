import axios from 'axios'
import cjhUi from 'cjh-ui-vue'
import qs from 'qs'
import { get } from 'lodash-es'

const $service = axios.create({
  baseURL: process.env.VUE_APP_CJH_BASE_URL,
  timeout: 60000
})
// 请求超时时间
// $axios.defaults.timeout = 60000

// post请求头
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
// $service.defaults.headers['Content-Type'] = 'multipart/form-data;charset=UTF-8'

// 请求拦截器
$service.interceptors.request.use(
  config => {
    if (config.data.hideLoading !== true) {
      try {
        cjhUi.Loading.hide()
      } catch (e) {
        console.log(e)
      }
      cjhUi.Loading({
        mask: true
      })
    }
    if (config.data) {
      config.data = qs.stringify(config.data)
    }
    return config
  },
  error => {
    cjhUi.Loading.hide()
    return Promise.reject(error)
  })

// 请求响应
$service.interceptors.response.use(
  response => {
    cjhUi.Loading.hide()
    let code = get(response.data, 'code')
    if (code === '0000') {
      return response
    } else if (code === '1000' || code === '2001') {
      cjhUi.Message({
        message: '未登录或登录失效，请重新登录~',
        duration: 1200
      }).then(() => {
        if (window.NativeLoging !== true) { // 防止重复跳转原生app登录页面
          window.NativeLoging = true
          if (window.activityTimer) {
            window.clearInterval(window.activityTimer)
            window.activityTimer = null
          }
          cjhUi.Native.jsCallAppWebview('jsCallApp2Login')
        }
      })
      return Promise.reject(response)
    } else if (code === '2003') {
      console.log(response)
      return response
    } else {
      let errorMessage = get(response.data, 'msg')
      cjhUi.Message({
        message: `${errorMessage}`,
        duration: 2000
      })
      return Promise.reject(response)
    }
  },
  error => {
    cjhUi.Loading.hide()
    if (error.response.status === 500) {
      cjhUi.Message({
        message: `服务器开小差啦，稍等一下哦～`
      })
    } else {
      cjhUi.Message({
        message: `${error.message}`,
        duration: 2000
      })
    }
    console.log(error)
    return Promise.reject(error.response)
  }
)

export default $service
