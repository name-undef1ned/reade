<template>
  <div class="family-wraper">
   <div class="family-title">
     <span class="icon-down iconfont" @click="hidefontFamily"></span>
     字体设置
   </div>

   <div class="familylist-wraper">
     <li v-for="(item,index) in fontfamilylist" 
     class="fontlist" 
     :key="index" 
     :style="{'font-Family':item}" 
     @click="setfontfamily(item)"
     :class="{selectcurrent:$store.state.book.fontfamilyselected==item}"
     >
            <span>{{item+$store.state.book.fontfamilylistlang[index]}}
            </span><span class="icon-check iconfont" v-if="$store.state.book.fontfamilyselected==item"></span>
      </li>
    
   </div>
  
  </div>
</template>

<script>
import mixin from '../../../utils/mixin'
import {setfontfamily} from '../../../utils/localstorage'
export default {
name:'Fontfamily',
mixins:[mixin],
methods: {
  hidefontFamily(){
        this.setisshowFontfamily(false)
    },
    setfontfamily(font){
      // 用户单击按钮时存入缓存
      setfontfamily(this.$store.state.book.filename,font);

      this.$store.commit('book/setfontfamilyselected',font)
      if(font=='Default'){
        this.$store.state.book.rendition.themes.font('normal')
      }else{
        this.$store.state.book.rendition.themes.font(font)

      }
    
    }
},
}
</script>

<style lang="scss" scoped>
@import '../../../assets/styles/global.scss';
.family-wraper{
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 25;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  
 
  width: 100%;
  // 超出此宽度由内容决定
  min-height: px2rem(115);
  max-height: px2rem(250);
  overflow: auto;
  background: white;
    /* x偏移量 | y偏移量 | 阴影模糊半径 | 阴影扩散半径 | 阴影颜色 */
    box-shadow: px2rem(0) px2rem(-5) px2rem(3) px2rem(0) rgba(0, 0, 0, 10%);
  .family-title{
    // fixed是相对于窗口，而这个是相对与含有滚动条的祖先定位 粘性定位
    position: sticky;
    top: 0;
    background: white;
    font-weight: bold;
    height: 100%;
    height: px2rem(35);
    padding: px2rem(5) 0;
    @include center;
     font-size: px2rem(20);
      border-bottom: px2rem(1) solid rgb(244, 244, 244);
    .icon-down{
      position: absolute;
      left: 0;
      margin-left: px2rem(5);
    }
    text-align: center;
  }

    .selectcurrent{
      color: cornflowerblue !important;
    }
  .fontlist{
    // position: absolute;
    list-style: none;
      // border-bottom: px2rem(1) solid rgb(244, 244, 244);
      width: 100%;
      height: px2rem(30);
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    // text-align: left;
    // font-weight: bold;
  

   span{
      padding: 0 px2rem(15);
   }
   
  }
  
  .familylist-wraper{
  text-align: center;
       font-size: px2rem(18);

  }
}

</style>