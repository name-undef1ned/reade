import Vue from 'vue'
// 引入生成好的store实例
import store from './store/index'
// 引入vuex辅助函数
import { mapActions,mapGetters,mapMutations,mapState } from 'vuex'

// 引入router
import router from './router/index'

// 引入iconmoon的图标样式文件
import './assets/styles/icofont.css'
// 引入公共样式文件
import './assets/styles/global.scss'
// 引入字体样式文件 

// css样式还是需要全部引入
import 'element-ui/lib/theme-chalk/index.css'
import element from './element/index'
Vue.use(element)

// 组件引入区
import App from './App.vue'

// 不全局引入mock 资源下载类页面是用不了mock的数据
// import './mock/index';


// 禁用生产提示
Vue.config.productionTip = false

new Vue({
 
  store,
  router,
  render: h => h(App),
  beforeCreate(){
    Vue.prototype.$bus=this;
  },
  mounted(){
    // console.log(element);
  }
}).$mount('#app')
