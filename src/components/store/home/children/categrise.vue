<template>
  <div class="category">
       <div class="title-wraper">
            <span>分类</span>
            <span @click="showAllList()">查看全部</span>
        </div>
    <div class="category-list">
      <div class="category-item-wrapper" v-for="(item, index) in data" :key="index">
        <div class="category-item" @click="showlist(getCategoryEnglishName(item.category))">
          <div class="content-wrapper">
            <div class="title title-medium">{{getCategoryName(item.category)}}</div>
            <div class="num sub-title-tiny">{{item.num + '本书'}}</div>
          </div>
          <div class="img-wrapper">
            <div class="img-group">
              <img class="img"  v-lazy="item.img1" :key="item.img1">
              <img class="img2"  v-lazy="item.img2" :key="item.img2">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { getCategoryName,getCategoryEnglishName} from "../../../../utils/book";
 import { storehomemixin} from '../../../../utils/mixin'

  export default {
      name:'categrise',
      mixins:[storehomemixin],
    components: {
      
    },
    props: {
      data: Array
    },
    methods: {
          getCategoryName(category) {
      return getCategoryName(category, this);
    },
         getCategoryEnglishName(category) {
      return getCategoryEnglishName(category, this);
    },
      showAllList(){
        console.log('全部');
            this.$router.push({
              path:'/store/list',
            })
          }
    },
    mounted() {
      console.log(this.data);
    },
  }
</script>

<style lang="scss" scoped>
  @import "../../../../assets/styles/global.scss";

  .category {
font-size: px2rem(13);
       .title-wraper {
    width: 100%;
    height: px2rem(45);
    display: flex;
    justify-content: space-between;
    align-items: center;
    span {
      display: block;
    }
    :nth-child(1) {
      font-weight: bold;
      font-size: px2rem(20);
    }
    :nth-child(2) {
      font-size: px2rem(15);
      color: #87a9cd;
    }
  }


    .category-list {
      display: flex;
      flex-flow: row wrap;
      width: 100%;
      .category-item-wrapper {
        flex: 0 0 50%;
        width: 50%;
        padding: 0 px2rem(5) px2rem(10) px2rem(5);
        box-sizing: border-box;
        &:nth-child(odd) {
          padding-left: px2rem(10);
        }
        &:nth-child(even) {
          padding-right: px2rem(10);
        }
        .category-item {
          display: flex;
          width: 100%;
          background: #eee;
          .img-wrapper {
            flex: 0 0 50%;
            width: 50%;
            padding: px2rem(20) px2rem(10);
            box-sizing: border-box;
            .img-group {
              position: relative;
              width: 100%;
              height: px2rem(60);
              @include left;
              .img {
                position: absolute;
                left: 0;
                top: 0;
                z-index: 100;
                width: px2rem(45);
                height: px2rem(60);
              }
              .img2 {
                position: absolute;
                left: px2rem(30);
                top: px2rem(7.5);
                z-index: 99;
                width: px2rem(30);
                height: px2rem(45);
              }
            }
          }
          .content-wrapper {
            flex: 0 0 50%;
            width: 50%;
            @include columnCenter;
            .title {
              text-align: center;
            }
            .num {
              text-align: center;
              margin-top: px2rem(5);
            }
          }
        }
      }
    }
  }
</style>
