import Vue from 'vue'
import CreateAPI from 'vue-create-api'
import toast from '../components/globalNotice/toast.vue'
import popup from '../components/globalNotice/popup.vue'
import shelfdialog from '../components/globalNotice/shelfdialog.vue'

// 插件注册
Vue.use(CreateAPI)


// 组件api转化
Vue.createAPI(toast,true)
Vue.createAPI(popup,true)
Vue.createAPI(shelfdialog,true)


// 全局mixin封装
Vue.mixin({
    methods:{
        toast(toast_setting){
            return this.$createToast({$props:toast_setting})
        },
        popup(popup_setting){
            return this.$createPopup({$props:popup_setting})
        },
        shelfdialog(shelfdialog_setting){
            return this.$createShelfdialog({$props:shelfdialog_setting})
        },

    }
})



// 调用
// showtoast(){
//     this.toast({text:'hello vuecreateapi'}).show()
//     }

