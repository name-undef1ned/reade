<template>
  <div class="searchbar-wraper">
    <transition name="title-move">
      <div class="title-wraper" v-show="titlevisbale">
         
          <div class="titlename-wraper">
              <span>{{issearch?'搜索':'书城'}}</span>
          </div>

          <div class="recommend-wraper" @click="showcard">
              <span class="iconfont icon-shake"></span>
          </div>
      </div>
    </transition>
           <div class="back-wraper" @click="backhome">
              <span class="iconfont icon-back"></span>
          </div>
      <div class="search-wraper" :class="{'inputmove':!titlevisbale}">
        <div class="search-blank" :class="{'showblank':!titlevisbale}"></div>
        <div class="search-box-wraper">
            <span class="icon-search iconfont"></span>
            <input type="text" @focus="gosearch" placeholder="搜索书籍" />
        </div>
      </div>
      
  </div>
  
</template>

<script>
import {storehomemixin} from '../../../utils/mixin'

export default {
name:'searchbar',
mixins:[storehomemixin],
data() {
  return {
    titlevisbale:true,
  }
},
watch:{
  offsetY(newv){
    if(newv==0||newv<0){
    this.showtitle()
    }else{
      this.hidetitle()
    }
  }
},
methods: {
  showtitle(){
    this.titlevisbale=true;
  },
  hidetitle(){
    this.titlevisbale=false;
  },
  gosearch(){
    this.SETISSEARCH(true)
  },
  backhome(){
    this.SETISSEARCH(false)
  },
  showcard(){
    this.SETCARDVISIBLE(true)
  }
},

}
</script>


<style lang="scss" scoped>
@import "../../../assets/styles/global.scss";
.searchbar-wraper{
    width: 100%;
    height: px2rem(54);
    box-sizing: border-box;
    padding: 0 px2rem(12);
    .title-wraper{

        width: 100%;
        height: px2rem(54);
        box-sizing: border-box;
        position: relative;
    
        .titlename-wraper{
        font-size: px2rem(25);
        font-weight: bold;
        width: 100%;
        height: px2rem(54);
        @include center;
        }
        .recommend-wraper{
            font-size: px2rem(22);
            position: absolute;
            right: 0;
            top: 0;
            // 居中：父盒子高度撑满 子元素flex居中
            // width: px2rem(50);
            height: px2rem(54);
            @include center;
        }
    }

        .back-wraper{
          z-index: 99;
        font-size: px2rem(22);
        position: absolute;
        left: px2rem(12);
        top: 0;
        // 居中：父盒子高度撑满 子元素flex居中
        // width: px2rem(50);
        height: px2rem(54);
        @include center;
        }

  .search-blank{
  width: px2rem(0);
  flex:0 0 px2rem(0);
  transition: all .3s ease;
  &.showblank{
    // title隐藏 该元素开始挤压
  width: px2rem(22);
  flex:0 0 px2rem(22);
  }
  }
  .search-wraper{
    display: flex;
    position: absolute;
    top: px2rem(53);
    left: 0;
    // background: transparent;
    width: 100%;
    height: px2rem(54);
    box-sizing: border-box;
    padding:px2rem(5) px2rem(12);
    
    transition: top .3s ease;
    &.inputmove{
    top:0;
     box-shadow:0 px2rem(2) px2rem(0) px2rem(0) rgba(0,0,0,10%);
    }
    .search-box-wraper {
        width: 100%;
        height: px2rem(44);
        box-sizing: border-box;
        @include center;
        border: 1px solid rgba(83, 107, 107, 0.2);
        border-radius: px2rem(25);
        padding:0 px2rem(15);
        // margin: px2rem(5) 0;
        // margin: 0 auto;
        background: rgba(242, 242, 244, 100%);
        .icon-search {
          font-size: px2rem(20);
          color: #7e8186;
        //   height: 100%;
        }
        input {
          flex: 1;
          font-size: px2rem(17);
          height: 100%;
          margin-left: px2rem(8);
          // 跟随父级 相当于透明
          background: transparent;
          border: none;
          // 获取焦点后没有outline样式
          &:focus {
            outline: none;
          }
          &::-webkit-input-placeholder{
               color: #7e8186;
          }
        }
      }
}

}

</style>