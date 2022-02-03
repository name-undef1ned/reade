<template>
  <div class="router-reader-wraper" ref="routerreaderwraper">

    <bookmark></bookmark>

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
import bookmark from '../../components/bookmark.vue'
// 在该路由组件中引入默认显示的普通组件 bookreader.vue
import Bookreader from "../../components/ebook/Bookreader.vue";
import { mapState } from 'vuex'
export default {
  name: "index",
  components:{
    Bookreader,
    Booktitle,
    Bookmenu,
    bookmark
    
  },
  computed:{
    ...mapState('book',['offsetY','rendition','isTitleAndMenuShow','isbookprogressready'])
  },
  data() {
    return {
    
    }
  },
  watch:{
    // 监听书签的下拉值变化
    offsetY(newv){
      // 如果处于分页过程当中或者title和menu组件显示 那就不允许下拉
      if(this.isTitleAndMenuShow || !this.isbookprogressready){
       return
      }else{
        this.MarkoffsetyChange(newv)
      }
    }
  },
  mounted() {
     if(this. is_weixin()){
       alert('由于微信内置浏览器的安全政策，该项目不兼容微信端，请到其他浏览器查看!')
     }
  },
  methods:{
    // 监听书签的下拉值变化的回调处理
  MarkoffsetyChange(newv){
    if(newv>0&&newv<100){
      // 下拉不要有过渡，不然不断的.3s会卡顿
      this.$refs.routerreaderwraper.style.transition=''
 
    this.$refs.routerreaderwraper.style.top=newv+'px';
    this.$refs.routerreaderwraper.style.left=0+'px';
    }else if(newv==0){
      this.$refs.routerreaderwraper.style.transition='top .3s linear'
      this.$refs.routerreaderwraper.style.top=0+'px';
    }else if(newv<0){
      return
    }
  },
  is_weixin(){
      var ua = navigator.userAgent.toLowerCase();
      if(ua.match(/MicroMessenger/i)=="micromessenger") {
           return true;
     } else {
            return false;
      }
}
  }
};
</script>

<style lang="scss" scoped>
@import '../../assets/styles/global.scss';
.router-reader-wraper{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>