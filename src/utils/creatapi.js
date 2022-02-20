import Vue from 'vue'
import CreateAPI from 'vue-create-api'
import toast from '../components/globalNotice/toast.vue'


// 插件注册
Vue.use(CreateAPI)
// 组件api转化
Vue.createAPI(toast,true)
// 全局mixin封装
Vue.mixin({
    methods:{
        toast(toast_setting){
            return this.$createToast({$props:toast_setting})
        }
    }
})
// 调用
// showtoast(){
//     this.toast({text:'hello vuecreateapi'}).show()
//     }