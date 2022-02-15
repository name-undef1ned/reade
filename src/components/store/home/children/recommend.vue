<template>
  <div class="recommend">

     <div class="title-wraper">
      <span>{{lefttext}}</span>
      <span>{{righttext}}</span>
    </div>

    <div class="recommend-list">
      <div class="recommend-item" v-for="(item, index) in data" :key="index">
        <div class="img-wrapper">
          <img class="img" :src="item.cover">
        </div>
        <div class="content-wrapper">
          <div class="title title-medium" ref="title">{{item.title}}</div>
          <div class="num sub-title" ref="num">{{item.readers}}人同时在读</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">


  export default {
   
    components: {
     name:'recommend'
    },
    props: {
      data: Array,
      lefttext:String,
      righttext:String
    }
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
        flex: 0 0 33.33%;
        width: 33.33%;
        padding: 0 px2rem(5);
        box-sizing: border-box;
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
