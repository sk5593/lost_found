import Vue from 'vue'
import App from './App'
import store from './store'
const Fly = require('flyio/dist/npm/wx')
const fly = new Fly()
fly.config.baseURL = process.env.API_BASE_URL
Vue.prototype.$fly = fly
fly.interceptors.request.use((request) => {
  if (request.url !== '/user/login' && request.url !== '/index/index') {
    request.headers['X-Tag'] = 'flyio'
    // 给所有请求添加自定义header
    try {
      let value = wx.getStorageSync('session_key')
      if (value) {
        // Do something with return value
        request.headers['session_key'] = value
      }
    } catch (e) {
      // Do something when catch error
    }
  }
})
Vue.prototype.$login = (success = () => {}) => {
  wx.checkSession({
    success () {
      console.log('session未过期')
      success()
      try {
        let value = wx.getStorageSync('session_key')
        if (!value) {
          login()
        }
      } catch (e) {
        // Do something when catch error
      }
      // wx.getStorage({
      //   key: 'session_key',
      //   fail (res) {
      //     if (res.errMsg === 'getStorage:fail data not found') {
      //     //  如果退出登录了以后重新登录，session未失效但是缓存中不存在session_key，所以要重新获取session_key
      //       login()
      //     }
      //   }
      // })
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
          code: res.code,
          name: store.state.userInfo.userName,
          image: store.state.userInfo.userPhoto
        }).then((res) => {
          if (res.data.code === 200) {
            console.log(res.data.msg)
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
