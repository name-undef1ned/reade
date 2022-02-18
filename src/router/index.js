import Vue from 'vue'
import router from 'vue-router'
Vue.use(router)

// 组件引入区

export default new router({
    routes:[
        {
            // 一旦进入项目根目录就重定向至项目入口组件ebook的index.vue
            path:'/',
            redirect:'/store',
            // redirect:'/ebook/chinesebook|%E7%B1%B3%E6%A0%BC%E5%B0%94%E8%A1%97',
            // component:()=>import('../App.vue')
        },
        {
            path:'/ebook',
            // 改为函数返回值式引入 条件引入语句 动态引入
            component:()=>import ('../pages/ebook/index.vue'),
            children:[
                {
                    path:':filename',
                    // 坑：写成了compontent 结果没有正确注册路由-无法执行props，展示是因为该组件也是父子关系
                    component:()=>import (/*webpackChunkName:'router-Bookreader'*/'../components/ebook/Bookreader.vue'),
                    // 即是父子组件又是路由组件 路由组件的props字段失效
                    // props:route => {
                    //     console.log(123);
                    //     return{
                    //         prop:"aa"
                    //     }
                    // },
                },
            ]

        },
        {
            path:'/store',
            // 自动重定向到home组件
            redirect:'/store/home',
            // 箭头函数加动态引入
            component:()=>import('../pages/store/index.vue'),
            children:[
                {
                    path:'home',
                    component:()=>import(/*webpackChunkName:'router-home'*/'../pages/store/storehome.vue')
                },
                {
                    path:'list',
                    component:()=>import(/*webpackChunkName:'router-list'*/'../pages/store/storelist.vue')
                 },
                 {
                     path:'detail',
                     component:()=>import(/*webpackChunkName:'router-detail'*/'../pages/store/storedetail.vue')
                  }
            ]
        }
       
    ]
})