<template>
  <div class="recommend">

     <div class="title-wraper">
      <span>{{lefttext}}</span>
      <span @click="showlist(getCategoryEnglishName(data[0].category))">{{righttext}}</span>
    </div>

    <div class="recommend-list">
      <div class="recommend-item" :class="{'recommend-item-where3Item':data.length<=3}" v-for="(item, index) in data" :key="index" @click="showbookdetail(item)">
        <div class="img-wrapper">
          <img class="img" v-lazy="item.cover" :key="item.cover">
        </div>
        <div class="content-wrapper">
          <div class="title title-medium" ref="title">{{item.title}}</div>
          <div class="num sub-title" ref="num">{{item.readers?item.readers+'人同时在读':''}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import {storehomemixin} from '../../../../utils/mixin'
import {getCategoryEnglishName} from '../../../../utils/book'

  export default {
mixins:[storehomemixin],
    components: {
     name:'recommend'
    },
    props: {
      data: Array,
      lefttext:String,
      righttext:String
    },
    methods: {
           getCategoryEnglishName(category) {
      return getCategoryEnglishName(category, this);
    },
    },
    
  }
</script>

<style lang="scss" scoped>
@import '../../../../assets/styles/global.scss';
  .recommend {
      width: 100%;
      height: px2rem(250);
  overflow: hidden;

      .title-wraper{
    width: 100%;
    height: px2rem(45);
     display: flex;
  justify-content: space-between;
  align-items: center;
    span{
  display: block;
    }
    :nth-child(1){
      font-weight: bold;
      font-size: px2rem(20);

    }
    :nth-child(2){
      font-size: px2rem(15);
      color: #87a9cd;
    }
  }

    .recommend-list {
      width: 100%;
      height: px2rem(200);
       display: flex;
      justify-content: flex-start;
      align-items: center;
      padding: 0 px2rem(5);
      box-sizing: border-box;
      overflow: auto;
      .recommend-item {
        flex: 0 0 30%;
        width: 30%;
        padding: 0 px2rem(5);
        box-sizing: border-box;
        &.recommend-item-where3Item{
          flex: 0 0 33.3%!important;
        width: 33.3%!important;
        }
        .img-wrapper {
          @include center;
          .img {
            // width: 80%;
            width: px2rem(100);
            height: 100;
          }
        }
        .content-wrapper {
          width: 100%;
          margin-top: px2rem(10);
          font-size: px2rem(12);
          @include columnCenter;
          .title {
            text-align: center;
            line-height: px2rem(15);
            height: px2rem(29);
            overflow: hidden;
          }
          .num {
            margin-top: px2rem(5);
            color: red;
            opacity: .4;
          }
        }
      }
    }
  }
</style>
