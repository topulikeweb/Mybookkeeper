import Vue from 'vue'
import App from './App'
// 引入下拉框
import dropdown from 'components/dt-dropdown/dt-dropdown'
import store from 'store/store'

Vue.component('dropdown', dropdown)

Vue.prototype.$store = store
App.mpType = 'app'
Vue.config.productionTip = false
// 自定义弹窗
uni.$showMsg = function (title = '数据加载失败', duration = 2000) {
  uni.showToast({
    title: title,
    duration: duration,
    icon: 'none'
  })
}

const app = new Vue({
  ...App,
  store
})
app.$mount()


