<template>
  <div class="captureslibar-wraper">
    <!-- 目录布局 -->
    <!-- <div class="capture"  :class="{capturepointevent:!isanyshow[3]}"  v-show="isanyshow[3]"> -->
    <!-- 给这个元素加上v-if子元素动画不正常显示 不加让他一直存在父元素的动画又会出问题。应该是父子元素的渲染规则和vue的过渡动画产生冲突 
    换成v-show就默认存在 v-enter就不会有问题  可是切换后该元素及其后代一直存在 v-leave的动画又监听不到了  总而言之对一个dom元素的的渲染规则
    影响了vue过渡类名的监听-动画元素即条件渲染不要设置父元素布局或者其他抢夺元素是否存在的控制权
     .这个只是起到子元素定位作用 -要不给子元素单独定位 -实现-->

    <transition name="capture-wraper">
      <div class="capture-wraper" ref="captureWraper" v-show="isanyshow[3]">
        <div class="search-wraper">
          <div class="search-box-wraper">
            <span class="icon-search iconfont"></span>
            <input type="text" v-model="searchText" placeholder="搜索全书内容" @focus="search" @keyup.enter="inputdone"/>
          </div>
          <div class="search-cancel-wraper" @click="cancelsearch" v-if="issearch">取消</div>
        </div>



        <!-- 当前dom渲染早于vuex的数据生成，在此进行占位 -->
        <span v-if="!this.$store.state.book.bookmetadata">加载中.......</span>
        <div class="section-wraper" v-if="this.$store.state.book.bookmetadata" v-show="!issearch">
          <!-- 图书元数据展示模块 -->
          <div class="metawraper">
            <div class="cover-wraper">
              <img
                :src="$store.state.book.coverurl"
                v-if="$store.state.book.coverurl"
                alt=""
              />
              <img
                v-else
                src="https://tse3-mm.cn.bing.net/th/id/OIP-C.0NqZJNM7Jt-f3TfckfBFKAHaJY?pid=ImgDet&rs=1"
                alt=""
              />
            </div>
            <div class="bookmeta-wraper">
              <span class="book-title">{{
                this.$store.state.book.bookmetadata.title
              }}</span>
              <span class="book-author"
                >作者:{{ this.$store.state.book.bookmetadata.creator }}</span
              >
            </div>
            <div class="bookreadertime-wraper">
              <span class="readtime-section"
                >*{{ this.$store.state.book.nowsection.label }}</span
              >
              <span class="readtime-progress"
                >{{ this.$store.state.book.value1 }}%已阅读</span
              >
            </div>
          </div>
          <!-- 章节列表模块 -->

          <!-- 1降维数据思路 ->
           <div class="li-wraper">
            <li
              v-for="(item, index) in flattenTocArr"
              :key="index"
              :class="{'level1':item.level==1,'level2':item.level==2,'level3':item.level==3,}"
              @click="jumpandhide(item.href)"
            >
            
            <div class="li-mes-wraper" v-if="item.level==1">
              <span>{{ item.label }}</span>
            </div>
           
            </li>
          </div>
        </div> -->

          <!-- 2条件渲染思路 -->
          <!-- <div class="li-wraper">
            <li
              v-for="(item, index) in flattenTocArr"
              :key="index"
              v-if="item.level==1"
              :class="{'level1':item.level==1,'level2':item.level==2,'level3':item.level==3}"
              @click="jumpandhide(item.href)"
            >
              <div class="li-mes-wraper">
              <span :class="{'nowsectioncolor':item.href==nowsection.href}">{{ item.label }}</span>
              <span class="iconfont icon-back" v-if="item.subitems[0]" @click.stop="isshowson"></span>
              </div>
               
                  <div class="son" v-if="item.subitems[0]">
                <div class="li-mes-wraper" v-for="(item2, index2) in item.subitems" :key="index2+'sec'">
                  <li :class="{'nowsectioncolor':item2.href==nowsection.href}" @click.stop="jumpandhide(item2.href)">
                       <span>{{ item2.label }}</span>
                  </li>
                </div>
              </div>
               
           
            </li>
          </div> -->

          <!-- 3递归组件思路 -->
          <capturerender
            :arr="$store.state.book.navigation.toc"
          ></capturerender>
          <!-- 填充用空白盒子 -->
          <div style="height:px2rem(40)"></div>
        </div>
        <div class="search-content-wraper" v-show="issearch">
        <div class="search-wontent-nulltip" v-show="!searchList[0]">暂无数据...</div>

          <li v-for="(item,index) in searchList" @click="jumpandhide(item.cfi)" :key="index+'search'" v-html="(index+1)+':'+item.excerpt"></li>
          <!-- 填充用空白盒子 -->
          <div style="height:px2rem(40)"></div>
        </div>

        <div class="footer-wraper">
          <span
            @click="isshowanytabel = 1"
            :class="{ 'footer-span-current': isshowanytabel == 1 }"
            >目录</span
          >
          <span
            @click="isshowanytabel = 2"
            :class="{ 'footer-span-current': isshowanytabel == 2 }"
            >书签</span
          >
        </div>
      </div>
    </transition>

    <transition name="fade">
      <div
        class="mask"
        v-if="isanyshow[3]"
        ref="mask"
        @click="$emit('capturehide')"
      ></div>
    </transition>

  </div>
</template>

<script>
import mixin from "../../../utils/mixin";
import { mapState } from "vuex";
import capturerender from "../bookmenuchildren/capturerender.vue";
import loading from '../Notice/loading.vue'
export default {
  name: "captureslibar",
  mixins: [mixin],
  props: ["isanyshow", "capturehide"],
  components: {
    capturerender,
    loading
  },
  data() {
    return {
      isshowanytabel: 1,
      issearch:false,
      searchText:'',
      searchList:[],
      isshowtip:false
    };
  },
  computed: {
    ...mapState("book", ["navigation", "book"]),
    flattenTocArr() {
      // computed早于vuex数据，在此处理报错
      if (!this.navigation.toc) {
        return;
      } else {
        return this.flatten(this.navigation.toc);
      }
    },
  },
  methods: {
    // 移动端的chorme和safiry兼容 将innerheight给到capture-wraper
    captureheight() {
      setTimeout(() => {
        this.$refs.captureWraper.style.height = `${window.innerHeight}px`;
      }, 1000);
    },
    jumpandhide(href) {
      this.book.rendition.display(href).then(() => {
        // 更新当前章节信息
        this.setnowsection();
        this.book.rendition.annotations.highlight(href)

      });

      this.setistitleandmenushow();

      //   隐藏通知父组件更改状态数据
      this.$emit("capturehide");
    },
    // justjump(href){
    //    this.book.rendition.display(href).then(() => {
    //     // 更新当前章节信息
    //     this.setnowsection();
    //     this.book.rendition.annotations.highlight(href)
    //   });
    // },
    doSearch(q) {
      return Promise.all(
        this.book.spine.spineItems.map((item) =>
          item
            .load(this.book.load.bind(this.book))
            .then(item.find.bind(item, q))
            .finally(item.unload.bind(item))
        )
      ).then((results) => Promise.resolve([].concat.apply([], results)));
    },

    // 用户单击搜索框
    search(){
      this.issearch=true
    },
    // 用户回车搜索 且 内容高亮
    inputdone(e){
      if(this.searchText&&this.searchText.length>0){
        this.book.ready.then(()=>{
          this.doSearch(this.searchText).then(res=>{
            this.searchList=res;
            this.searchList.map(item=>{
              item.excerpt=item.excerpt.replace(this.searchText,`<span class="search-content-text">${this.searchText}</span>`)
              return item
            })
       })
        })
      }else{
        this.searchList=[];
      }
        e.target.blur()
    
    },
    // 取消
    cancelsearch(){
      this.issearch=false;
      this.searchText='';
      this.searchList=[];
    }
  },
  beforeMount() {},
  mounted() {
    this.captureheight();

    window.addEventListener("resize", () => {
      this.$refs.captureWraper.style.height = `${window.innerHeight}px`;
    });
  },
  updated() {},
};
</script>

<style lang="scss" scoped>
@import "../../../assets/styles/global.scss";

.footer-span-current {
  color: cornflowerblue;
}
 

.captureslibar-wraper {
  width: 100%;

  .mask {
    position: absolute;

    bottom: 0;

    z-index: 21;
    width: 100%;
    height: 100vh;
    background: rgba(51, 51, 51, 80%);
  }

  .capture-wraper {
    // height: 300px;
    //   overflow: auto;
    width: px2rem(270);
    height: 100vh;
    position: absolute;

    bottom: 0;

    z-index: 22;
    box-sizing: border-box;

    background-color: white;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    // flex-wrap: wrap;

    .search-wraper {
      width: 100%;
      flex: 0 0 5%;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      // background-color: white;
      /* x偏移量 | y偏移量 | 阴影模糊半径 | 阴影扩散半径 | 阴影颜色 */
      box-shadow: px2rem(0) px2rem(1) px2rem(3) px2rem(0) rgba(0, 0, 0, 10%);
      .search-box-wraper {
        flex: 1;
        @include center;
        border: 1px solid rgba(83, 107, 107, 0.2);
        border-radius: px2rem(10);
        box-sizing: border-box;
        margin-left: px2rem(10);
        margin-right: px2rem(5);
        padding: 0 px2rem(4);
        background: rgba(83, 107, 107, 7%);
        .icon-search {
          font-size: px2rem(20);
        }
        input {
          flex: 1;
          // 跟随父级 相当于透明
          background: transparent;
          border: none;
          // 获取焦点后没有outline样式
          &:focus {
            outline: none;
          }
        }
      }
      .search-cancel-wraper {
        flex: 0 0 15%;
        text-align: center;
        // color: rgb(206, 15, 15);
        color: cornflowerblue;
        font-size: px2rem(15);
      }
    }
    .section-wraper {
      flex: 1;
      overflow: auto;
      width: 100%;
      flex: 0 0 1;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      flex-wrap: no-wrap;
      align-items: center;
      .metawraper {
        width: 100%;
        height: px2rem(100);
        display: flex;
        justify-content: flex-start;
        box-sizing: border-box;
        padding: px2rem(7) px2rem(5);
        background: rgba(231, 227, 208, 20%);

        .cover-wraper {
          flex: 1;
          @include center;
          height: 100%;
          // padding: 0 20px;
          box-sizing: border-box;

          img {
            width: 85%;
            height: 95%;
          }
        }
        .bookmeta-wraper {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: flex-start;
          flex-wrap: wrap;

          padding: px2rem(10) px2rem(1);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          span {
            width: 100%;
            text-align: left;
          }
          .book-title {
            text-align: center;
            height: px2rem(15);
            font-size: px2rem(15);
            padding-bottom: px2rem(2);

            overflow: hidden;
            text-overflow: ellipsis;
            white-space: normal;
          }
          .book-author {
            // display: inline-block;
            width: 100%;
            flex: 1;
            font-size: px2rem(10);
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: normal;
            // 自动折行
            word-break: break-all;
          }
        }
        .bookreadertime-wraper {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: flex-start;
          flex-wrap: wrap;

          padding: px2rem(10) px2rem(1);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: normal;
          span {
            width: 100%;

            text-align: left;
          }
          .readtime-section {
            padding-bottom: px2rem(2);
            text-align: center;
            font-size: px2rem(14);
          }
          .readtime-progress {
            font-size: px2rem(12);
            text-align: center;
          }
        }
      }
    }


    .search-content-wraper{
      width:100%;
      overflow: auto;
      box-sizing: border-box;
      padding: px2rem(2) px2rem(5);
      .search-wontent-nulltip{
        font-size: px2rem(20);
        text-align: center;
        box-sizing: border-box;
        width: px2rem(100);
        position: absolute;
        top: 10%;
        left: 50%;
        transform: translate3d(-50%,0,0);

        color: rgba(83, 107, 107, 0.7);

      }
      li{
          border-bottom: px2rem(1) solid rgba(83, 107, 107, 0.2);

        box-sizing: border-box;
       margin: px2rem(10) 0;
      list-style: none;
      font-size: px2rem(14);
      width: 100%;
      min-height: px2rem(30);
      // max-height: px2rem(50);
      // height: px2rem(25);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: normal;
     .search-content-text{
        // color: cornflowerblue;
        font-weight: bolder;
        background: cornflowerblue;
      }
      }
    }
    .footer-wraper {
      width: 100%;
      min-height: px2rem(40);

      // flex: 0 0 7%;
      position: absolute;
      bottom: 0;

      display: flex;
      justify-content: space-around;
      align-items: center;
      box-sizing: border-box;
      background-color: white;
      // border: 1px solid cyan;
      /* x偏移量 | y偏移量 | 阴影模糊半径 | 阴影扩散半径 | 阴影颜色 */
      box-shadow: px2rem(0) px2rem(-1) px2rem(3) px2rem(0) rgba(0, 0, 0, 10%);
      span {
        font-size: px2rem(17);
      }
    }
  }
}
</style>