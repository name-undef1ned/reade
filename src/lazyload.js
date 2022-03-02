import Vue from 'vue'
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload)
Vue.use(VueLazyload, {
    // 懒加载元素何时加载：距离页面底部110%时加载
  preLoad: 1.3,
  error: require('@/assets/images/error.png'),
  // error:'../static/error.png',
  loading: require('@/assets/images/loading.gif'),
  // loading:'../static/loading.gif',
//   加载失败重试次数
  attempt: 1
})