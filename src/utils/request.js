import { Message, MessageBox } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
import axios from 'axios'

// create an axios instance
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 5000, // request timeout,
  crossDomain: true,
  withCredentials: true,
  transformRequest: [function(data) {
    // console.log('transform')
    let ret = ''
    for (const it in data) {
      if (data[it] !== null && data[it] !== undefined) {
        if (data[it] instanceof Array) {
          ret += appendList(encodeURIComponent(it), data[it])
        } else {
          ret += appendData(encodeURIComponent(it), data[it])
        }
      }
    }
    return ret
  }]
})
function appendData(name, data) {
  return name + '=' + encodeURIComponent(data) + '&'
}
function appendList(name, data) {
  var prefix = name
  var params = ''
  data.forEach((item, index) => {
    var formPrefix = prefix + '[' + index + ']'
    if (Object.prototype.toString.call(item) === '[object Object]') {
      for (const it in item) {
        if (item[it] !== null && item[it] !== undefined) {
          if (item[it] instanceof Array) {
            params += appendList(formPrefix, item[it])
          } else {
            params += appendData(formPrefix + '.' + encodeURIComponent(it), item[it])
          }
        }
      }
    } else {
      params += formPrefix + '=' + encodeURIComponent(item) + '&'
    }
  })
  return params
}

service.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded'
service.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

// request interceptor
service.interceptors.request.use(config => {
  // Do something before request is sent
  if (store.getters.token) {
    // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
    config.headers['reqToken'] = getToken()
  }
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone interceptor
// TODO: 后续统一拦截处理respone
service.interceptors.response.use(
  /**
   * 下面的注释为通过在response里，自定义code来标示请求状态
   * 当code返回如下情况则说明权限有问题，登出并返回到登录页
   * 如想通过xmlhttprequest来状态码标识 逻辑可写在下面error中
   * 以下代码均为样例，请结合自生需求加以修改，若不需要，则可删除
   */
  response => {
    // console.log(response)
    const res = response.data
    if (res.code !== '200') {
      // Message({
      //   message: res.msg,
      //   type: 'error',
      //   duration: 5 * 1000
      // })
      // 4001:token检验失败
      if (res.code === '4001') {
        // 请自行在引入 MessageBox
        // import { Message, MessageBox } from 'element-ui'
        // MessageBox.confirm('你已被登出，请重新登录', '提示', {
        //   confirmButtonText: '重新登录',
        //   // cancelButtonText: '取消',
        //   type: 'warning'
        // }).then(() => {
        //   store.dispatch('LogOut').then(() => {
        //     location.reload() // 为了重新实例化vue-router对象 避免bug
        //   })
        // })

        MessageBox.confirm('你已被登出，请重新登录', '提示', {
          confirmButtonText: '重新登录',
          callback: action => {
            // this.$message({
            //   type: 'warning',
            //   message: ''
            // })
            store.dispatch('LogOut').then(() => {
              location.reload() // 为了重新实例化vue-router对象 避免bug
            })
          }
        })

        return Promise.reject()
      }

      if (res.code === '4002') {
        // 请自行在引入 MessageBox
        // import { Message, MessageBox } from 'element-ui'
        // MessageBox.confirm('该企业已被冻结，您已被登出', '提示', {
        //   confirmButtonText: '重新登录',
        //   // cancelButtonText: '取消',
        //   type: 'warning'
        // }).then(() => {
        //   store.dispatch('LogOut').then(() => {
        //     location.reload() // 为了重新实例化vue-router对象 避免bug
        //   })
        // })

        MessageBox.confirm('该企业已被冻结，您已被登出', '提示', {
          confirmButtonText: '重新登录',
          callback: action => {
            // this.$message({
            //   type: 'warning',
            //   message: ''
            // })
            store.dispatch('LogOut').then(() => {
              location.reload() // 为了重新实例化vue-router对象 避免bug
            })
          }
        })

        return Promise.reject()
      }
    }
    return response
  },
  error => {
    console.log('err' + error) // for debug
    // Message({
    //   // message: error.message,
    //   message: '弱网环境加载缓慢',
    //   type: 'error',
    //   duration: 5 * 1000
    // })
    return Promise.reject('系统繁忙，请稍后再试')
  })

export default service
