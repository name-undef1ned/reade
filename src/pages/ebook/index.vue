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
    Bookmenu,
    
  },
  data() {
    return {
    
    }
  },
  mounted() {
     console.log(this.$store);
     if(this. is_weixin()){
       alert('由于微信内置浏览器的安全政策，该项目不兼容微信端，请到其他浏览器查看!')
     }
  },
  methods:{
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

</style>