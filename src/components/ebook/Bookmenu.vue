<template>
  <!-- 顶层menubar布局 -->
<div class="menubar">
  <!-- 菜单选项布局 -->
  <div class="showclass menu-wraper" ref="menuwraper">
     <div class="icon-wraper">
       <span class="icon-menu ico"></span>
     </div>
     <div class="icon-wraper">
       <span class="icon-progress ico"></span>
     </div>
     <div class="icon-wraper">
       <span class="icon-bright ico"></span>
     </div>
     <div class="icon-wraper" @click="toggleshowsetfontsize">
       <div class="div-a">A</div>
     </div>
  </div>
   <!-- 字体设置布局 -->
    <div class="setfontsize " v-show="isshowsetfontsize" ref="setfontsize">
     <span class="icon-font_size_minus sizespan1"></span>
        <div class="block" >
           <el-slider v-model="value2" @change="hideslibartip" v-if="isshowsetfontsize"></el-slider>
        </div>  
     <span class="icon-icon_font_size_plus sizespan2"></span>
    </div>
</div>
</template>

<script>
  
const vm={
name:'Bookmenu',
data() {
  return {
    isshowsetfontsize:false,
    value2:1,
    
  }
},
computed:{

},
methods:{
  // 控制设置字体元素是否显示-需求点：1 这个元素显示 menubar的阴影隐藏 size的阴影显示-所以干脆把这个样式抽出一个类名 去动态的添加删除类名
  toggleshowsetfontsize(){
    this.isshowsetfontsize=!this.isshowsetfontsize;
    // 元素得是v-show 不然v-if也获取不到不存在元素的类名，插入dom在响应式系统的最后边 也可以调用nexttick
    if(this.isshowsetfontsize){
      this.$refs.menuwraper.classList="menu-wraper";
      this.$refs.setfontsize.classList="setfontsize showclass";
    }else{
      this.$refs.menuwraper.classList="menu-wraper showclass";
       this.$refs.setfontsize.classList="setfontsize";
      
    }
    // console.log(this.$refs.menuwraper.classList.value);

  },
  // 微调elementui组件 该组件是v-if  所以必须放在渲染后的时机函数-updated
  editelementuiSlibar(){
    if(this.isshowsetfontsize){
       let slibardiv= document.querySelector('.el-slider__button-wrapper');
      slibardiv.style.display="flex";
      slibardiv.style.alignItems="center";
    
    }
 

  },
  hideslibartip(){
  // 松手隐藏  产生问题：单击一个地方会立马被change的以下回调隐藏 设定延时
 setTimeout(() => {
   if(document.querySelector('.el-tooltip__popper[x-placement^=top]')){
   let slibartip=document.querySelector('.el-tooltip__popper[x-placement^=top]');
   slibartip.style.opacity="0";
   slibartip.style.transition="opacity .2s linear";
   }else {return}
 
   }, 700);
  },
},
watch:{
  // 按住显示 但是不让绑定事件 可以放在updated watch 但是是否显示是建立在该组件存在的条件下 不然会造成更新任何地方都会触发显示.
  // updated覆盖面太广了 还需要做判断区分 处理回调又是dom操作 放在watch
  value2:(newv)=>{
    if(document.querySelector('.el-tooltip__popper[x-placement^=top]')){
      document.querySelector('.el-tooltip__popper[x-placement^=top]').style.opacity="1";
      console.log(newv);

    }
  },
 
},
mounted() {
  // 使用实例的watch可以传入函数去指定监听数据，但是在配置对象只能是. []的形式
  // 需求：展示字体设置有两个控制对象1A按钮2兄弟组件是否显示(上级组件都不展示 这个当然要隐藏)
  this.$watch(function(){
    return this.$store.state.book.isTitleAndMenuShow;
  },function(newv){
    newv===false?this.isshowsetfontsize=newv:this.isshowsetfontsize=false
  })
},
updated() {

  this.editelementuiSlibar();
  
},
}
export default vm


</script>

<style lang="scss" scoped>
@import '../../assets/styles/global.scss';

// 动态样式 有逻辑的 抽离出一个独立的类名
.showclass{
      /* x偏移量 | y偏移量 | 阴影模糊半径 | 阴影扩散半径 | 阴影颜色 */
    box-shadow:px2rem(0) px2rem(-5) px2rem(5) px2rem(0) rgba(0,0,0,10%);
}



.menubar{
    // 任何屏幕情况下宽度都是100%，但是高度自适应
    width:100%;
    height: px2rem(42);

    // 需要在页面下方 设置浮动
    position: absolute;
    left: 0;
    bottom: 0;
    z-index: 10;

    
       // 修饰样式 不重要
    background-color: white;


    .menu-wraper{
    // 任何屏幕情况下宽度都是100%，但是高度自适应
    width:100%;
    height: 100%;
    
   
    // 使用flex布局排列左边的1个ico的div和右边三个ico的div
    display: flex;
    justify-content: space-between;
    align-items: center;

      .ico{
            vertical-align: top;
           line-height: px2rem(22);
           font-size: 130%;
      }
      .ico::before{
        color: #333;
        font-size: px2rem(28);
      }


     :last-child{
       height: 75%;
     }
     .div-a{
       height: 100%;

       font-family: emoji fangsong;
       color: #333;
       font-size: px2rem(33);
       margin-right: px2rem(3);
       font-weight: inherit；
    
      }


}
.setfontsize{
     // 任何屏幕情况下宽度都是100%，但是高度自适应
    width:100%;
    height: px2rem(42);
    // 需要在页面下方 设置浮动
    position: absolute;
    left: 0;
    bottom: px2rem(42);
    z-index: 1;

    display: flex;
    justify-content: space-between;
    align-items: center;
    // 给到滚动条剩余空间
   .block{
     flex:1;
     touch-action: none;
   }
   span{
     color: #333;
      font-size: px2rem(28);
      margin: 10px;
   }
   .sizespan1{
     font-size: px2rem(24);
     margin-right: px2rem(20);
    }

         // 修饰样式 不重要
    background-color: white;
 
}



}




</style>