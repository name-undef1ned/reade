<template>
  <div class="content-wraper" ref="contentwraper" :class="{'titlehide':!reltivetop}" @scroll.prevent='scroll()'>
    <div class="booklist" v-show="!issearch">

    <loading class="home-loading" v-if="!$store.state.storehome.homebooklist" :backgroundColor="'white'" :top="'30%'" :left="'50%'"></loading>
    <div class="resource-wraper" v-else>
      <div class="banner-wraper" :style="{backgroundImage:`url(https://picb8.photophoto.cn/39/917/39917738_1.jpg)`}"></div>
    <!-- $store.state.storehome.homebooklist.banner -->
      <guess-you-like :likelist="$store.state.storehome.homebooklist.guessYouLike"></guess-you-like>
      <recommend :data="$store.state.storehome.homebooklist.recommend" :lefttext="'热门推荐'" :righttext="' '"></recommend>
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
    <searchlist v-show="issearch"></searchlist>
  </div>
</template>

<script>
import {storehomemixin} from '../../../utils/mixin'
import searchlist from './children/searchlist.vue'
import loading from '../../../components/ebook/Notice/loading.vue'
import guessYouLike from './children/guessYouLike.vue'
import recommend from './children/recommend.vue'
import fetured from './children/fetured.vue'
import {getCategoryName} from '../../../utils/book'
import categrise from './children/categrise.vue'
export default {
name:'homecontent',
mixins:[storehomemixin],
components:{
  searchlist,
  loading,
  guessYouLike,
  recommend,
  fetured,
  categrise
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
  'offsetY'(newv){
    if(newv<1500){
      // this.SETISBACKTOTOP(false)
    }
  }
}

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