<template>
 <!-- <transition-group name="routerpage-detail"> -->
 
 
  <loading :left='"35%"' :top="'30%'"  v-if="!bookItem" key="loadingcom"></loading>
  <div class="storedetail-wraper" key="content" v-else>
    <div class="scroll-wraper">
  
    <div class="title-wraper">
      <span class="iconfont icon-back" @click="back"></span>
      <span class="iconfont icon-shelf"></span>
    </div>

    <bookInfo :author="bookItem.author" :desc="bookItem.desc" :title="bookItem.title" :cover="bookItem.cover"></bookInfo>
    
        <div class="book-detail-content-wrapper">
        <div class="book-detail-content-title">版权</div>
        <div class="book-detail-content-list-wrapper">
          <div class="book-detail-content-row">
            <div class="book-detail-content-label">出版社</div>
            <div class="book-detail-content-text">{{bookItem.publisher}}</div>
          </div>
          <div class="book-detail-content-row">
            <div class="book-detail-content-label">分类</div>
            <div class="book-detail-content-text">{{bookItem.categoryText}}</div>
          </div>
          <div class="book-detail-content-row">
            <div class="book-detail-content-label">语言</div>
            <div class="book-detail-content-text">{{bookItem.language}}</div>
          </div>
          <div class="book-detail-content-row">
            <div class="book-detail-content-label">ISBN</div>
            <div class="book-detail-content-text">{{bookItem.isbn?bookItem.isbn:'urn:isbn:978-3-662-55905-1'}}</div>
          </div>
        </div>
      </div>
     <loading :left='"35%"' :top="'30%'"  v-if="!navigation"></loading>
      <div class="book-detail-content-wrapper" v-else>
        <div class="book-detail-content-title">版权</div>
        <capturerender :arr="navigation.toc" :allowdisplay="false"></capturerender>
      </div>
    </div>

    <div class="footer-wraper">
      <span @click="readBook">阅读</span>
      <span>加入书架</span>
    </div>
  </div>

 <!-- </transition-group> -->

</template>

<script>
import {detail,home2} from '../../API/store'
import Epub from "epubjs";
import {getCategoryName} from '../../utils/book'
import bookInfo from '../../components/detail/bookInfo.vue'
import detaiTitle from '../../components/detail/detaiTitle.vue'
import loading from '../../components/ebook/Notice/loading'
export default {
name:'storedetail',
components:{
  bookInfo,
  detaiTitle,
  loading,
  capturerender:()=>import(/*webpackChunkName:'capturerender'*/'../../components/ebook/bookmenuchildren/capturerender.vue')
},
data() {
  return {
       bookShelf: null,
        bookItem: null,
        book: null,
        metadata: null,
        trialRead: null,
        cover: null,
        navigation: null,
        displayed: false,
        audio: null,
        randomLocation: null,
        description: null,
        toastText: '',
        trialText: null,
        categoryText: null,
        opf: null
  }
},
methods: {
  back(){
    this.$router.go(-1)
  },
  // 跳转阅读器 使用nginx接口 而不是opf接口
     readBook() {
       console.log(this.categoryText,this.bookItem.fileName);
       this.$router.push({
              path: `/ebook/${this.categoryText}|${this.bookItem.fileName}`
            })
      },
  // 电子书解析方法 解析所需要的目录即可
   parseBook(blob) {
      try {
        this.book = new Epub(blob)
        console.log('解析成功',this.book);
        this.book.loaded.metadata.then(metadata => {
          this.metadata = metadata
          console.log(metadata);
        })
        this.book.loaded.navigation.then(nav => {
          this.navigation = nav
          // 渲染一页
          // if (this.navigation.toc && this.navigation.toc.length > 1) {
          //   this.display(this.navigation.toc[1].href)
          //     .then(section => {
          //       if (this.$refs.scroll) {
          //         this.$refs.scroll.refresh()
          //       }
          //       this.displayed = true
          //       const reg = new RegExp('<.+?>', 'g')
          //       const text = section.output.replace(reg, '').replace(/\s\s/g, '')
          //       this.description = text
          //     })
          // }
        })
      } catch (error) {
        console.log(error);
      }
      },
      // 初始获取图书信息和图书的opf类型资源链接
     init() {
      //  路由中拿到图书filename 图书分类等信息
        const fileName = this.$route.query.fileName
        this.categoryText = this.$route.query.category
        if (fileName) {
          detail({
            fileName: fileName
          }).then(response => {
            // 成功拿到图书的报文
            if (response.status === 200 && response.data.error_code === 0 && response.data.data) {
              const data = response.data.data
              this.bookItem = data
              // this.cover = this.bookItem.cover
              // 1获取opf链接的关键字段
              let rootFile = data.rootFile
              if (rootFile.startsWith('/')) {
                rootFile = rootFile.substring(1, rootFile.length)
              }
              // 2拼接成完整的图书opf资源链接
              this.opf = `http://47.99.166.157/epub2/${fileName}/${rootFile}`
              // 3解析出目录信息
              this.parseBook(this.opf)
            } else {
              // 图书的报文获取失败
              console.log('获取失败');
              // this.showToast(response.data.msg)
            }
          })
        }
        // this.bookShelf = getLocalStorage('bookShelf')
      },
},
mounted() {
 this.init()
},
}
</script>

<style lang="scss" scoped>
@import '../../assets/styles/global.scss';
.storedetail-wraper{
   width: 100%;
   height: 100%;
   box-sizing: border-box;
  
   display: flex;
   flex-direction: column;
   justify-content: space-between;

   .scroll-wraper{
     overflow: auto;
      padding: 0 px2rem(12);
   width: 100%;
   height: 100%;
   box-sizing: border-box;
   
   .title-wraper{
   box-sizing: border-box;

    //  padding: 0 px2rem(10);
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
      font-size: px2rem(20);
      color: black;
    }
  }

    .book-detail-content-wrapper {
        width: 100%;
        border-bottom: px2rem(1) solid #eee;
        box-sizing: border-box;
        .book-detail-content-title {
          font-size: px2rem(20);
          font-weight: bold;
          padding: px2rem(20) px2rem(15) px2rem(10) px2rem(15);
          box-sizing: border-box;
        }
        .book-detail-content-list-wrapper {
          padding: px2rem(10) px2rem(15);
          box-sizing: border-box;
          .loading-text-wrapper {
            width: 100%;
            .loading-text {
              font-size: px2rem(14);
              color: #666;
            }
          }
          .book-detail-content-row {
            display: flex;
            box-sizing: border-box;
            margin-bottom: px2rem(10);
            .book-detail-content-label {
              flex: 0 0 px2rem(70);
              font-size: px2rem(14);
              color: #666;
            }
            .book-detail-content-text {
              flex: 1;
              font-size: px2rem(14);
              color: #333;
            }
          }
        }
      }
    }

    .footer-wraper{
      width: 100%;
      height: px2rem(45);
      display: flex;
      justify-content: space-around;
      align-items: center;
      box-shadow: px2rem(0) px2rem(0) px2rem(3) px2rem(0) rgba(0, 0, 0, 10%);
      span{
        display: block;
        font-size: px2rem(20);
        font-weight: bold;
        color: #56b0ff;
      }
    }
}
</style>