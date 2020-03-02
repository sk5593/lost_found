import Vue from 'vue'
import App from './App'
const Fly = require('flyio/dist/npm/wx')
const fly = new Fly()
fly.config.baseURL = process.env.API_BASE_URL
Vue.prototype.$fly = fly
fly.interceptors.request.use((request) => {
  if (request.url !== '/user/login' || request.url !== '/index/index') {
    // 给所有请求添加自定义header
    wx.getStorage({
      key: 'session_key',
      fail (res) {
        if (res.errMsg === 'getStorage:fail data not found') {
          // 跳转到登陆界面
        }
      },
      success (res) {
        request.headers['session_key'] = res.data
      }
    })
  }
})
Vue.prototype.$login = (success = () => {}) => {
  wx.checkSession({
    success () {
      console.log('session未过期')
      success()
      wx.getStorage({
        key: 'session_key',
        fail (res) {
          if (res.errMsg === 'getStorage:fail data not found') {
          //  如果退出登录了以后重新登录，session未失效但是缓存中不存在session_key，所以要重新获取session_key
            login()
          }
        }
      })
    },
    fail: () => {
      console.log('session已经过期')
      // session 已经失效，需要重新执行登录流程
      login()
    }
  })
}
const login = () => {
  wx.login({
    success: res => {
      if (res.code) {
        fly.get('/user/login', {
          code: res.code
        }).then((res) => {
          if (res.data.code === 200) {
            wx.setStorage({
              key: 'session_key',
              data: res.data.msg
            })
          } else {
          }
        }).catch(err => {
          console.log(err)
        })
      } else {
        console.log('登录失败！' + res.errMsg)
      }
    }
  })
}
Vue.config.productionTip = false
App.mpType = 'app'
// 创建vue实例并加载
const app = new Vue(App)
app.$mount()
