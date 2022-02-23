<template>
  <div class="shelflist-wraper" :class="{
  'whenshelfheightiseditmode':whatpage=='shelf'&&iseditmode,
  'whencategoryheightiseditmode':whatpage!=='shelf'&&iseditmode,
  'shelfheight':whatpage=='shelf',
  'categoryheight':whatpage!=='shelf'
  }">
      
      <transition-group name="shelflist" tag="div" id="tralist">

   <div class="item-wraper" :key="item.id"  v-for="(item) in list" v-show="item.isshow"  :class="{'editmode-category':item.type==2&&iseditmode}">
       <shelfitem :data="item"  :style="{height:relHeight}"></shelfitem>
       <div class="item-title-wraepr">
       <span>{{item.title}}</span>
       </div>
   </div>
   
   <div class="item-wraper" key="item-wraper">
       <shelfitemadd :style="{height:relHeight}"></shelfitemadd>
   </div>
      </transition-group>

   <shelflistpanel></shelflistpanel>
  </div>
</template>

<script>
import {storeshelfmixin} from '../../../utils/mixin'
import shelfitem from './shelfitem.vue'
import shelfitemadd from './shelflitemchilden/shelfitemadd.vue'

export default {
name:"shelflist",
mixins:[storeshelfmixin],
props:{
    list:{
        type:Array
    },
    // 判断是书架页面还是分类页面的渲染 有一些top之类的渲染差异
    whatpage:{
        type:String,
        default:'shelf'
    }
},
data() {
    return {
        windowwidth:0
    }
},
computed:{
    relHeight:{
        immediate:true,
        get(){
            let a=(this.windowwidth/100*27.33)*1.4;
            if(a<184){return `${a}px`}else{return '183px'}
           
        }
    },
    howheight:{
        immediate:true,
        get(){
        return this.whatpage=='category'?'calc(100% - px2rem(53))':'calc(100% -109)'   
        }
    }
},
methods: {
 relwindowwidth(){
    this.windowwidth=window.innerWidth;
}
},
components:{
    shelfitem,
    shelfitemadd,
    shelflistpanel:()=>import(/*webpackChunkName:'shelf-list-panel' */'./shelflistpanel.vue')
},
// 因为销毁前或者退出前都要解除事件，只能都给
activated() {
    // resize没触发得手动给
    this.windowwidth=window.innerWidth;
     window.addEventListener('resize',this.relwindowwidth)
},
mounted() {
     // resize没触发得手动给
    this.windowwidth=window.innerWidth;
    window.addEventListener('resize',this.relwindowwidth)
},
beforeDestroyed() {
window.removeEventListener('resize',this.relwindowwidth);
},
deactivated() {
window.removeEventListener('resize',this.relwindowwidth);
    
},

}
</script>

<style lang="scss" scoped>
@import '../../../assets/styles/global.scss';
.whenshelfheightiseditmode{
height: calc(100% - px2rem(174))!important;
}
.whencategoryheightiseditmode{
height: calc(100% - px2rem(121))!important;
}
.shelfheight{
height: calc(100% - px2rem(109));
top: px2rem(109);
}
.categoryheight{
height: calc(100% - px2rem(56));
top: px2rem(56);
}

.editmode-category{
        opacity: .4;
    }
   .shelflist-wraper{
        width: 100%;
        // height: calc(100% - px2rem(109));
        box-sizing: border-box;
        position: absolute;
        padding: 0 px2rem(12);
        left: 0;
        // top: px2rem(109);
        // overflow: auto;
        // display: flex;
        // flex-wrap: wrap;
        // justify-content: flex-start;
        // align-items: flex-start;
        // align-content: flex-start;
        // font-size: px2rem(10);
        #tralist{
        width: 100%;
        height: 100%;
       overflow: auto;
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        align-items: flex-start;
        align-content: flex-start;
        font-size: px2rem(10);
.shelflist-move{
    // display: none;
transition: transform 1s ease;
}
.shelflist-leave-active{
    display: none;
    // position: absolute;
}
        .item-wraper{
        flex: 0 0 33.33%;
        width: 33.33%;
        max-width: 153px;
        max-height: 209px;
        padding: 2% 2%;
        box-sizing: border-box;
        // 屏幕宽度超出一个阈值 就算元素按照比例显示也不美观。所以设定只有在这个宽度阈值下计算属性才返回高度。然后通过媒体查询将
        // 不断变大的padding设为常量 不能挤压图片
          @media screen and (min-width: 800px) {
              padding: 20px 20px;
              box-sizing: content-box!important;
              }
        .item-title-wraepr{
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        margin-top: px2rem(7);
        }
        }

   }


    }
</style>