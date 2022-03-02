<template>
  <div class="featured">
    <div class="title-wraper">
      <span>精选</span>
      <!-- <span></span> -->
    </div>

    <div class="featured-list">
      <div class="featured-item-wrapper">
        <div
          class="featured-item"
          v-for="(item, index) in data"
          :key="index"
           @click="showbookdetail(item)"
        >
          <div class="img-wrapper">
            <img class="img" :key="item.cover" v-lazy="item.cover"/>
          </div>
          <div class="content-wrapper">
            <div class="title title-small" ref="title">{{ item.title }}</div>
            <div class="author sub-title-tiny" ref="author">
              {{ item.author }}
            </div>
            <div class="category third-title-tiny" ref="category">
              {{ getCategoryName(item.category) }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { getCategoryName } from "../../../../utils/book";
import {storehomemixin} from '../../../../utils/mixin'

export default {
  name: "fetured",
mixins:[storehomemixin],
  components: {},
  props: {
    data: Array,
  },
  computed: {},
  methods: {
    getCategoryName(category) {
      return getCategoryName(category, this);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../../../assets/styles/global.scss";

.featured {
  width: 100%;
//   height: px2rem(452);
  overflow: hidden;
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
  .featured-list {
    width: 100%;
    // padding: 0 px2rem(10);
    box-sizing: border-box;
    .featured-item-wrapper {
      width: 100%;
      display: flex;
    //   flex-flow: row wrap;
      justify-content: flex-start;
            // justify-content: space-around;

      align-items: flex-start;
      flex-wrap: wrap;
      .featured-item {
        flex: 0 0 47%;
        width: 47%;
          @media screen and (min-width: 350px) {
            //   width: px2rem(350);
              max-width: px2rem(350);
            justify-content: space-around;
          }
        // padding: px2rem(5) 0;
        background: rgba(246, 246, 246,.9);
        box-sizing: border-box;
        margin: px2rem(5);
        @include top;
        .img-wrapper {
          flex: 0 0 30%;
          width: 30%;
          .img {
            width: 100%;
       
          }
        }
        .content-wrapper {
          font-size: px2rem(12);
          flex: 1;
          width: px2rem(117.5);
          padding: 0 px2rem(5);
          box-sizing: border-box;
          overflow: hidden;
          .title {
            display: inline-block;
            width: 100%;
            height: 75%;
            font-size: px2rem(12);
            font-weight: bold;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .author {
            margin-top: px2rem(15);
            display: inline-block;
            width: 100%;
            font-size: px2rem(12);

            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .category {
            margin-top: px2rem(5);
            display: inline-block;
            width: 100%;
            font-size: px2rem(12);

            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
      }
    }
  }
}
</style>
