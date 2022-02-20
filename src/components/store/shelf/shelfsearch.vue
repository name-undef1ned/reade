<template>
   <div class="search-wraper" :class="{'searchboxfocus':isfocus}">
        <div class="search-box-wraper">
            <span class="icon-search iconfont"></span>
            <input type="text" ref="searchinput" v-model="searchText" @focus="gosearch" placeholder="搜索书籍" @input="inputing" @keyup.enter="inputdone"/>
            <span class="iconfont icon-close-circle-fill" v-show="searchText" @click="cleartext"></span>
        </div>
        <div class="search-cancel"  @click="focuscancel" :class="{'showsearch-cancel':isfocus,'hidesearch-cancel':isfocus==false}"><span>取消</span></div>
    </div>
</template>

<script>
import {storeshelfmixin} from '../../../utils/mixin'

export default {
name:'shelfsearch',
    mixins:[storeshelfmixin],

data() {
    return {
        searchText:'',
        isfocus:false
    }
},
methods: {
    gosearch(){
        this.SETTITLEVISBLE(false)
        this.isfocus=true;
    },
    focuscancel(){
         this.SETTITLEVISBLE(true)
         this.searchText='';
        this.isfocus=false;
    },
    cleartext(){
         this.searchText='';
    },
    inputing(){},
    inputdone(){}
},
}
</script>

<style lang="scss" scoped>
@import '../../../assets/styles/global.scss';
.searchboxfocus{
 position: absolute!important;
 top: px2rem(0)!important;
 z-index: 9999;
}
 .search-wraper{
     will-change: top;
     position: absolute;
    display: flex;
    top: px2rem(53);
    left: 0;
    // background: white;
    // backdrop-filter: blur(px2rem(20px));
    width: 100%;
    height: px2rem(54);
    box-sizing: border-box;
    padding:px2rem(5) px2rem(12);
        transition: all 0.2s cubic-bezier(0.68, -0.55, 0.27, 1.55);
    // transition: all .3s linear;
    &.inputmove{
    top:0;
     box-shadow:0 px2rem(2) px2rem(0) px2rem(0) rgba(0,0,0,10%);
    }
    .search-box-wraper {
        flex:1;
    // transition: flex .3s ease;

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
        .icon-close-circle-fill{
            font-size: px2rem(20);
            color: rgba($color: #706060, $alpha: 0.8);
        }
      }

      .search-cancel{
          will-change: flex;
          flex: 0 0 px2rem(0);
             width: px2rem(0);
             font-size: px2rem(15);
            //  background: cyan;
            color: red;
            overflow: hidden;
            transition: flex .3s ease;

          @include center;
       
      }
        .showsearch-cancel{
             flex: 0 0 px2rem(45);
             width: px2rem(45);

             
         }
         .hidesearch-cancel{
             opacity: 0;
         }
}
</style>