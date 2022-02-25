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
            <div class="book-detail-content-text">{{getCategoryName(bookItem.category)}}</div>
            <!-- <div class="book-detail-content-text">{{bookItem.categoryText}}</div> -->
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
        <div class="book-detail-content-title">目录</div>
        <capturerender :arr="navigation.toc" :allowdisplay="false"></capturerender>
      </div>
    </div>

    <div class="footer-wraper">
      <div class="reader-wraper">
      <span @click="readBook">阅读</span>
      </div>
      <div class="shelf-wraper" @click="addshelf">
      <span :class="{shelfhas:shelfhas}">{{shelfhas?'已添加书架':'添加书架'}}</span>
      </div>
    </div>
  </div>

 <!-- </transition-group> -->

</template>

<script>
import {detail,chenesebookdetail} from '../../API/store'
import Epub from "epubjs";
import {getCategoryName} from '../../utils/book'
import bookInfo from '../../components/detail/bookInfo.vue'
import detaiTitle from '../../components/detail/detaiTitle.vue'
import loading from '../../components/ebook/Notice/loading'
import {storeshelfmixin} from '../../utils/mixin'
export default {
name:'storedetail',
mixins:[storeshelfmixin],
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
        navigation: {},
        displayed: false,
        audio: null,
        randomLocation: null,
        description: null,
        toastText: '',
        trialText: null,
        categoryText: null,
        opf: null,
        // shelfhas:false
  }
},
computed:{
  // 是否已经存在于书架的判断  如果用户直接来到书城页面没有去书架页面 计算不准确-因为此时没有拿书架数据
  shelfhas:{
    immediate:true,
    get(){
        let shelfhas=false;
      this.shelflist.forEach(item => {
      if(item.type==1){
        item.fileName==this.bookItem.fileName?shelfhas=true:''
      }else{
        item.itemList.forEach(item2=>{
        item2.fileName==this.bookItem.fileName?shelfhas=true:''
        })
      }
    })
    return shelfhas;
    }
  }
},
methods: {
  addshelf(){
    if(this.shelfhas){
      console.log(123);
      this.toast({text:'已经存在于书架哦'}).show()
    }else{
      console.log('add');
      this.bookItem.isshow=true;
      this.bookItem.type=1;
      this.SETSHELFLIST({type:'addbook',book:this.bookItem})
      this.toast({text:'添加书架成功,快去阅读吧！'}).show()
    }
    
  },
  getCategoryName(category){
    return getCategoryName(category)
  },
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
        })
      } catch (error) {
        console.log(error);
      }
      },
      englishbookinit(fileName){
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
      },
      chinesebookinit(fileName){
        chenesebookdetail(fileName).then(res=>{
          // 书籍信息筛选
            if (res.status === 200 && res.data.error_code === 0 && res.data.data) {
              this.bookItem=res.data.data.detaillist.filter(item=>{
                return item.fileName==fileName
              })[0]
          // 目录数据
          this.navigation.toc=this.bookItem.toc;
            }else{
              console.log('error');
            }
        })
      },
      // 初始获取图书信息和图书的opf类型资源链接
     init() {
      //  路由中拿到图书filename 图书分类等信息
        const fileName = this.$route.query.fileName
        this.categoryText = this.$route.query.category
        if (fileName) {
          if(this.categoryText!=='chinesebook'){
            this.englishbookinit(fileName)
          }else{
            this.chinesebookinit(fileName)
          }
        }
        // this.bookShelf = getLocalStorage('bookShelf')
      },
},
mounted() {
  // console.log(this.$route.query);
 this.init()
 
},
}
</script>

<style lang="scss" scoped>
@import '../../assets/styles/global.scss';
.shelfhas{
  color: #ccc!important;
}
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
      height: px2rem(65);
      display: flex;
      justify-content: space-around;
      align-items: center;
      box-shadow: px2rem(0) px2rem(-1) px2rem(3) px2rem(2) rgba(0, 0, 0, 10%);
      // background: white;
      .reader-wraper{
        width: 40%;
        height: 75%;
        border-radius: px2rem(14);
      overflow: hidden;
         background:linear-gradient(to right,#3d94fe,#59bae9);
         text-align: center;
         line-height:110%;
          span{
        display: block;
        font-size: px2rem(17);
        font-weight: bold;
        color: white;
      }
      }
      .shelf-wraper{
        width: 40%;
        height: 75%;
        border-radius: px2rem(14);
        overflow: hidden;
        text-align: center;
         line-height:110%;
        background: rgba(246, 246, 246,.9);
        span{
          display: block;
          font-size: px2rem(17);
          font-weight: bold;
          color: black;
        }
      }
    }
}
</style>