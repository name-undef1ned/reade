<template>
  <div class="content-wraper" ref="contentwraper" :class="{'titlehide':!reltivetop}" @scroll.prevent='scroll()'>
    <div class="booklist" v-show="!issearch">

    <loading class="home-loading" v-if="!$store.state.storehome.homebooklist" :backgroundColor="'white'" :top="'30%'" :left="'50%'"></loading>
    <div class="resource-wraper" v-else>
      <div class="banner-wraper" :style="{backgroundImage:`url(https://picb8.photophoto.cn/39/917/39917738_1.jpg)`}"></div>
      <guess-you-like :likelist="$store.state.storehome.homebooklist.guessYouLike"></guess-you-like>
      <recommend :data="$store.state.storehome.homebooklist.recommend" :lefttext="'热门推荐'" :righttext="''"></recommend>
      <fetured :data="$store.state.storehome.homebooklist.featured"></fetured>
      <div class="catarylist" v-for="(item,index) in $store.state.storehome.homebooklist.categoryList" :key="'catary'+index">
      <recommend :data="item.list" :lefttext="getCategoryName(item.category)" :righttext="'查看全部'"></recommend>
      </div>
      <categrise  :data="$store.state.storehome.homebooklist.categories"></categrise>
      <transition name="backtop">
        <div class="backtotop" v-if="offsetY>750" @click="resetscroll" draggable="true" @touchmove.stop="backmove" ref="backtotop">
          <span class="iconfont icon-fanhuidingbu"></span>
        </div>
      </transition>
    </div>
  
    </div>
    <keep-alive>
     <searchlist v-if="issearch"></searchlist>
    </keep-alive>
  </div>
</template>

<script>
// import Vue from 'vue'
import {storehomemixin} from '../../../utils/mixin'
import {getCategoryName} from '../../../utils/book'
import loading from '../../../components/ebook/Notice/loading.vue'
import asyncloading from './children/asyncloading.vue'
const searchlist = () => ({
  // 需要加载的组件 (应该是一个 `Promise` 对象)
  component:import(/*webpackChunkName:'searchlist'*/'./children/searchlist.vue'),
  // 展示加载时组件的延时时间。默认值是 200 (毫秒)
  delay: 0,
  // 如果提供了超时时间且组件加载也超时了，
  // 则使用加载失败时使用的组件。默认值是：`Infinity`
  timeout: 2000,
  // 异步组件加载时使用的组件
  loading:loading,
  // 加载失败时使用的组件
  error:asyncloading
})

export default {
name:'homecontent',
mixins:[storehomemixin],
components:{
  loading,
  asyncloading,
  guessYouLike:()=>import(/*webpackChunkName:'guessYouLike'*/'./children/guessYouLike.vue'),
  recommend:()=>import(/*webpackChunkName:'recommend'*/'./children/recommend.vue'),
  fetured:()=>import(/*webpackChunkName:'fetured'*/'./children/fetured.vue'),
  categrise:()=>import(/*webpackChunkName:'categrise'*/'./children/categrise.vue'),
  searchlist,
  
 

},
data() {
  return {
    reltivetop:true,
    homescrollcontent:0
  }
},
methods: {
   getCategoryName(category) {
      return getCategoryName(category, this);
    },
  scroll(){
    this.SETOFFSETY(this.$refs.contentwraper.scrollTop)
    if(this.$refs.contentwraper.scrollTop>=3){
      this.reltivetop=false;
    }else{
      this.reltivetop=true;
    }
  },
  resetscroll(e){
    this.$refs.contentwraper.scrollTop=0;
  },
  backmove(e){
    this.$refs.backtotop.style.left=`${e.changedTouches[0].clientX}px`
    this.$refs.backtotop.style.top=`${e.changedTouches[0].clientY}px`
  }
  },
watch:{
  // 当进入searchlist组件就重置滚动条位置为0  并且需要记录homecontent的scrolltop值，切换回来赋值给他
  'issearch'(newv){
    if(newv==true){
      this.homescrollcontent=this.$refs.contentwraper.scrollTop;
      this.resetscroll();
    }else{
     this.$nextTick(()=>{
       this.$refs.contentwraper.scrollTop=this.homescrollcontent;

     })
    }
  },
  // 'offsetY'(newv){
  //   if(newv<1500){
  //     // this.SETISBACKTOTOP(false)
  //   }
  // }
},
activated() {
   this.$nextTick(()=>{
       this.$refs.contentwraper.scrollTop=this.$store.state.storehome.offsetY;

     })
},

}
</script>

<style lang="scss" scoped>
@import '../../../assets/styles/global.scss';
.home-loading{
  transform: translate(-50%,0);
}
.content-wraper{
  position: relative;
    top: px2rem(53);
    width: 100%;
    flex: 1;
    box-sizing: border-box;
    padding: 0 px2rem(12);
    overflow: scroll;
    transition: top .2s ease;

    img{
    width: 100%;
    height: 280px;
    }
    &.titlehide{
      top: 0;
    }
    .booklist{
      .resource-wraper{
        .banner-wraper{
          
          // 不同宽度阶段使用媒体查询设置对应比例的高度 简陋的响应式图片方案
          @media screen and (min-width: 850px) {
            height: px2rem(200);
          }
            @media screen and (min-width: 1050px) {
              height: px2rem(230);
          }
          width: 100%;
          min-width: 300px;
          margin: 0 auto;
          height: px2rem(150);
          background-repeat:no-repeat;
          background-size: 100% 100%;
        }
      }
    }
}

     .backtotop{
       position: fixed;
       right: 3%;
       bottom: 20%;
        width: px2rem(50);
        height: px2rem(50);
        overflow: hidden;
        box-sizing: border-box;
        padding: px2rem(2);
        color: rgba(50, 89, 206,.7);
        z-index: 999;
        backdrop-filter: blur(10px);
        @include center;
        border-radius: 50%;
        span{
          font-size: px2rem(40);
        }
      }
</style>