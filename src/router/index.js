import Vue from 'vue'
import router from 'vue-router'
Vue.use(router)

// 组件引入区

export default new router({
    routes:[
        {
            // 一旦进入项目根目录就重定向至项目入口组件ebook的index.vue
            path:'/',
            redirect:'/ebook',
        },
        {
            path:'/ebook',
            // 改为函数返回值式引入 条件引入语句 动态引入
            component:()=>import ('../pages/ebook/index.vue'),
            children:[
                {
                    path:':filename',
                    // 坑：写成了compontent 结果没有正确注册路由-无法执行props，展示是因为该组件也是父子关系
                    component:()=>import ('../components/ebook/Bookreader.vue'),
                    // 即是父子组件又是路由组件 路由组件的props字段失效
                    // props:route => {
                    //     console.log(123);
                    //     return{
                    //         prop:"aa"
                    //     }
                    // },
                },
            ]

        }
    ]
})