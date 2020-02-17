import Vue from 'vue'
import App from './index'
// add this to handle exception
Vue.config.errorHandler = function (err) {
  if (console && console.error) {
    console.error(err)
  }
}
// 创建index的实例并加载
const app = new Vue(App)
app.$mount()
