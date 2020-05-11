import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
// import { getToken, removeToken } from '@/utils/myAuth'
import qs from 'qs'
import hostSetting from '@/api/host-setting'
import router from '@/router/index'
// create an axios instance
const service = axios.create({
  baseURL: hostSetting.host, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// 请求撤销
service.interceptors.request.use(
  config => {
    // 在发送请求之前做一些事情

    // if (store.getters.token) {
    //   // let each request carry token
    //   // ['X-Token'] is a custom headers key
    //   // please modify it according to the actual situation
    //   config.headers['X-Token'] = getToken()
    // }
    // console.log('get', getToken())

    // if (window.localStorage.getItem('BF-ADMIN-TOKEN')) {
    //   config.headers['bufan-token'] = getToken()
    // }
    return config
  },
  error => {
    // 做一些请求错误
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * 您还可以通过HTTP状态代码来判断状态
   */
  response => {
    const res = response.data
    console.log('错误编码', res.tokenCode)

    // 如果自定义代码不是20000，则将其判断为错误。.
    // if (res.tokenCode == 5000 || res.tokenCode == 5001) {
    //   console.log('触发了')

    //   Message({
    //     message: '登陆超时,请重新登陆!',
    //     type: 'error',
    //     duration: 5 * 1000
    //   })
    //   removeToken()
    //   router.push('/')
    // } else {
    return res
    // }

    //   // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
    //   if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
    //     // to re-login
    //     MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
    //       confirmButtonText: 'Re-Login',
    //       cancelButtonText: 'Cancel',
    //       type: 'warning'
    //     }).then(() => {
    //       store.dispatch('user/resetToken').then(() => {
    //         location.reload()
    //       })
    //     })
    //   }
    //   return Promise.reject(new Error(res.message || 'Error'))
    // } else {
    //   return res
    // }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)
function http(config) {
  // 动手脚
  if (config.method.toLowerCase() == 'post') {
    // qs系列化
    // https://www.npmjs.com/package/qs
    //  arrayFormat: 'repeat' 作用:  { a: ['b', 'c'] }  ==> 'a=b&a=c'
    //  allowDots: true  作用: { a: { b: { c: 'd', e: 'f' } } }  ==>  'a.b.c=d&a.b.e=f'
    config.data = qs.stringify(config.params, { arrayFormat: 'repeat', allowDots: true })
  } else {
    config.params = config.params
  }
  return service(config)
}

export default http
