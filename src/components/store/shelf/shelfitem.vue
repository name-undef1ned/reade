<template>
  <div class="shelfitem-wraper" @click="showwitch(data.type)">
      <!-- 动态组件 根据父组件传的数据动态引入组件 -->
      <component :is="whtchcomponent" :data="data" class="boxshdow"></component>
      <span class="iconfont icon-check1" :class="{'isselcted':isselcted}" v-if="data.type==1&&iseditmode"></span>
  </div>
</template>

<script>
import shelfitemimage from './shelflitemchilden/shelfitemimage.vue'
import shelfitemcategory from './shelflitemchilden/shelfitemcategory.vue'
import {getCategoryEnglishName} from '../../../utils/book'
import {storeshelfmixin} from '../../../utils/mixin'
export default {
name:'shelfitem',
mixins:[storeshelfmixin],
data() {
    return {
        shelfitemimage,
        shelfitemcategory,
        // isselcted:false
    }
},
methods:{
    showwitch(type){
        if(this.iseditmode==false){
            if(type==1){
                // 跳转detail逻辑
                 this.$router.push({
                    path:'/store/detail',
                    query:{
                        fileName:this.data.fileName,
                        category:getCategoryEnglishName(this.data.category)
                    }
                })
            }else{
               // 跳转分类逻辑
               this.$router.push({
                   path:'/store/storeshelfcategory',
                   query:{
                        title:this.data.title,
                        
                   }
               })
            }

        }else{
            // 图书选择逻辑
          this.bookselcted()
        }
    },
    bookselcted(){
        if(this.data.type==1){
        this.isselcted==false?this.ADDSHELFSELECTED(this.data.title):this.DELSHELFSELECTED(this.data.title)
        }
    }
},
computed:{
    whtchcomponent(){
        return this.data.type==1?shelfitemimage:(this.data.type==2?shelfitemcategory:shelfitemadd)
    },
     isselcted:{
        immediate:true,
        get(){
        if(this.shelfselected.indexOf(this.data.title)>=0){return true}else{return false}
        }
    }
},
props:{
    data:{
        type:Object,
        required:true
    }
}
}
</script>

<style lang="scss" scoped>
@import '../../../assets/styles/global.scss';
.shelfitem-wraper{
    width: 100%;
    height: 100%;
    .boxshdow{
        box-shadow: px2rem(2) px2rem(2) px2rem(6) px2rem(2) rgba(200,200,200,.4);
    }
  
position: relative;
    span{
        display:block;
        position: absolute;
        bottom: px2rem(2);
        right: px2rem(2);
        color: rgba($color: #7e6e6e, $alpha: 0.6);
        font-size: px2rem(28);
        &.isselcted{
        color: rgba($color: #2abbe7, $alpha: 1);
        }
    }
}

</style>