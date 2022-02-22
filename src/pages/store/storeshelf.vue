<template>
  <div class="shelf-wraper">
      <transition name="fade">
        <shelftitle v-show="shelftitlevisble"></shelftitle>
      </transition>

    <shelfsearch></shelfsearch>

        <div class="table-wraper" v-show="!shelftitlevisble">
            <span @click="howshow('default')">默认</span>
            <span @click="howshow('name')">按书籍</span>
            <span @click="howshow('category')">按分类</span>
        </div>

      <shelflist></shelflist>
  </div>
</template>

<script>
import shelftitle from '../../components/store/shelf/shelftitle.vue'
import shelfsearch from '../../components/store/shelf/shelfsearch.vue'
import {storeshelfmixin} from '../../utils/mixin'
import {bookShelf} from '../../API/store'
export default {
    mixins:[
        storeshelfmixin
    ],
components:{
    shelftitle,
    shelfsearch,
    shelflist:()=>import(/*webpackChunkName:'shelf-list'*/'../../components/store/shelf/shelflist.vue'),
},
methods: {
    shelflistinit(res){
    this.SETSHELFLIST(res.data.bookList.filter(item=>{
        // 拿到数据写入isshow属性控制不同类型的显示
        item.isshow=true;
        return item
    }))
},
// 搜索结果的再次筛选  为0即初始化或者没有搜索-直接以shelflist数据筛选  有数据说明用户搜索
howshow(showtype){
    if(showtype==='default'){
        if(Boolean(this.searchindexlist[0])==false){
            this.shelflist.forEach((item,index)=>{
                item.isshow=true
            })
        }else{
             this.searchindexlist.forEach((i)=>{
                this.shelflist[i].isshow=true
            })
        }
    }else if(showtype==='name'){
        if(Boolean(this.searchindexlist[0])==false){
            console.log('name-null');
            this.shelflist.forEach((item,index)=>{
                item.type!=1?item.isshow=false:item.isshow=true
            })
         }else{
              this.searchindexlist.forEach((i)=>{
                this.shelflist[i].type!=1?this.shelflist[i].isshow=false:this.shelflist[i].isshow=true
            })
         }
    }else if(showtype==='category'){
            if(Boolean(this.searchindexlist[0])==false){
            this.shelflist.forEach((item,index)=>{
                item.type!=2?item.isshow=false:item.isshow=true
            })
         }else{
              this.searchindexlist.forEach((i)=>{
                this.shelflist[i].type!=2?this.shelflist[i].isshow=false:this.shelflist[i].isshow=true
            })
         }
    }
}
},
mounted() {
    bookShelf().then(res=>{
    if (res.status === 200) {
        this.shelflistinit(res)
    }else{
        console.log('请求失败');
    }
    })
},

}
</script>

<style lang="scss" scoped>
@import '../../assets/styles/global.scss';
.shelf-wraper{
    position: relative;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 0 px2rem(12);
    .table-wraper{
     width: 100%;
    height: px2rem(45);
    box-sizing: border-box;
      position: absolute;
        top: px2rem(54);
        left: 0;
        display: flex;
        justify-content: space-around;
        align-items: center;
     border-bottom: px2rem(1) solid rgba(172, 164, 164,.3);
        span{
         color: rgba($color: #ad8585, $alpha: 0.7);
            display: block;
        font-size: px2rem(17);
        &:hover{
            color: rgba($color: #1e3055, $alpha: 1);
        }
        }
    }
 
}
</style>