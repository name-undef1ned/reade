<template>
  <div class="shelf-wraper">
      <transition name="fade">
        <shelftitle v-show="shelftitlevisble"></shelftitle>
      </transition>

    <shelfsearch></shelfsearch>

        <div class="table-wraper" v-show="!shelftitlevisble">
            <span>默认</span>
            <span>按进度</span>
            <span>按分类</span>
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
    console.log(res);
    this.SETSHELFLIST(res.data.bookList)
},

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
     border-bottom: 1px solid rgba(172, 164, 164,.3);

        span{
         color: rgba($color: #ad8585, $alpha: 0.7);
            display: block;
        font-size: px2rem(17);
        &:hover{
            color: rgba($color: #768ab6, $alpha: 1);
        }
        }
    }
 
}
</style>