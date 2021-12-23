<template>
  <div>
    <transition name="title">
      <Booktitle v-show="$store.state.book.isTitleAndMenuShow"></Booktitle>
     </transition>

 
    <Bookreader></Bookreader>


    <transition name="menu">
    <Bookmenu v-show="$store.state.book.isTitleAndMenuShow"></Bookmenu>
    </transition>
  </div>
</template>
<script>
import Booktitle from '../../components/ebook/Booktitle.vue'
import Bookmenu from '../../components/ebook/Bookmenu.vue'
// 在该路由组件中引入默认显示的普通组件 bookreader.vue
import Bookreader from "../../components/ebook/Bookreader.vue";
export default {
  name: "index",
  components:{
    Bookreader,
    Booktitle,
    Bookmenu
  },
  data() {
    return {
    
    }
  },
  mounted() {
     console.log(this.$store);
  },
  methods:{
  
  }
};
</script>

<style lang="scss" scoped>
@import '../../assets/styles/global.scss';

// title组件
// 组件渲染时-进入时候 的起点位置
 .title-enter,.title-leave-to{
  transform: translate3d(0,-100%,0);
 }
//  离开起点后的状态和元素最终状态 。但是元素最终状态会被元素本身的样式类覆盖
 .title-enter-to,.title-leave{
  transform: translate3d(0,0,0);
 }
//  整个过程
 .title-enter-active,.title-leave-active{
  transition:all .3s linear;
 }

// menu组件
 .menu-enter,.menu-leave-to{
   transform: translate3d(0,100%,0);
   }
//  离开起点后的状态和元素最终状态 。但是元素最终状态会被元素本身的样式类覆盖
 .menu-enter-to,.menu-leave{
   transform: translate3d(0,0,0);
 }
//  整个过程
 .menu-enter-active,.menu-leave-active{
  transition:all .3s linear;
 }




</style>