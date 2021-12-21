import Vue from 'vue'
// 引入生成好的store实例
import store from './store/index'
// 引入vuex辅助函数
import { mapActions,mapGetters,mapMutations,mapState } from 'vuex'

// 引入router
import router from './router/index'

// 引入iconmoon的图标样式文件
import './assets/styles/ico.css'
// 引入公共样式文件
import './assets/styles/global.scss'
// 引入字体样式文件 
import './assets/styles/fonts-OoohBaby.css'


// 组件引入区
import App from './App.vue'

// 禁用生产提示
Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App),
  mounted(){
    // 检测是否使用vuex成功
    console.log(this.$store);
    // 检测router是否使用成功
    console.log(this.$router);
  }
}).$mount('#app')
