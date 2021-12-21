import Vue from 'vue'
import Vuex from 'vuex'

// 初始化store之前就必须注册，因为import提升的原因无法灵活控制执行顺序，所以将注册逻辑写在store文件中
Vue.use(Vuex)

// 使用vuex构造函数的Store函数生成store实例
 const store =new Vuex.Store({

    mutations:{

    },
    actions:{

    },
    getters:{

    },
    state:{

    }
 })
export default store

//  下载 生成项目目录 注册和生成store 之后去main.js根实例注入该store对象