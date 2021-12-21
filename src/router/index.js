import Vue from 'vue'
import router from 'vue-router'
Vue.use(router)

// 组件引入区
import HelloWord from '../components/HelloWorld.vue'
export default new router({
    routes:[
        {
            name:'helloword',
            path:'/helloword',
            component:HelloWord
        }
    ]
})