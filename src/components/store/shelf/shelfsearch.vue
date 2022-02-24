<template>
   <div class="search-wraper" :class="{'searchboxfocus':isfocus}">
        <div class="search-box-wraper">
            <span class="icon-search iconfont"></span>
            <input type="text" ref="searchinput" v-model.trim="searchText" @focus="gosearch" placeholder="搜索书籍或分类..." @input="inputing" @keyup.enter="inputdone"/>
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
        
          // 取消搜索清空搜索结果记录
        this.DELSEARCHINDEXLIST();

          this.shelflist.forEach((item)=>{
             item.isshow=true
    })
    },
    cleartext(){
         this.searchText='';
    this.shelflist.forEach((item)=>{
             item.isshow=true
    })
    },
    inputing(){
    if(this.s){
        clearTimeout(this.s)
    }
    this.s=setTimeout(()=>{
        let bookcount=0;
        let categorycount=0;

        // 搜索前先清空历史的搜索结果记录
        this.DELSEARCHINDEXLIST();
        // 搜索前清空选中列表
        this.DELSHELFSELECTED('clear')

        this.shelflist.forEach((item,index)=>{
         if(this.searchText.length==0||this.searchText==''||!this.searchText){
             item.isshow=true
            //  并且存储到搜索结果数组 供用户后续的对搜索结果的进一步筛选
            this.SETSEARCHINDEXLIST(item.title)
             return
          }
     item.title.toLocaleLowerCase().includes(this.searchText.toLocaleLowerCase())?item.isshow=true:item.isshow=false
       //  并且存储到搜索结果数组 供用户后续的对搜索结果的进一步筛选
            item.isshow?this.SETSEARCHINDEXLIST(item.title):''

    // 提示的计数
    if(item.type==1&&item.isshow){
     bookcount++
    }else if(item.type==2&&item.isshow){
        categorycount++
    }

    })
    if(bookcount!==0||categorycount!==0){
        this.toast({text:'为您检索到共计'+(bookcount==0?'':`<span class="shelfsearch-tip-toast">${bookcount}</span>本书籍`)+(categorycount==0?'':`<span class="shelfsearch-tip-toast">${categorycount}</span>个分类!`)}).show();
     }


    },500)

    },
    // 搜索已经在输入事件处理，这里只做提示 
    inputdone(){
        let bookcount=0;
        let categorycount=0;
              this.shelflist.forEach((item)=>{
                       // 提示的计数
           if(item.type==1&&item.isshow){
           bookcount++
           }else if(item.type==2&&item.isshow){
               categorycount++
           }
       })
        if(this.searchText.length==0||this.searchText==''||this.searchText==false){
            this.toast({text:'请输入书籍或分类名称'}).show()
        }else{
       this.toast({text:'已经为您展示出搜索结果了哦'+(bookcount==0?'':`<span class="shelfsearch-tip-toast">${bookcount}</span>本书籍`)+(categorycount==0?'':`<span class="shelfsearch-tip-toast">${categorycount}</span>个分类!`)}).show();
        
        }
    }
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
        // transition: all 0.2s cubic-bezier(0.68, -0.55, 0.27, 1.55);
    transition: all .2s ease;
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