<template>
      <p v-if="!shelfcategory"></p>
  <div class="shelf-wraper" v-else>
      <transition name="fade">
        <!-- v-show="shelftitlevisble" -->
        <shelftitle :title="shelfcategory.title" :whatpage="'category'"></shelftitle>
      </transition>
      <p v-if="Boolean(shelflist[shelfcategory.index])==false"></p>
      <shelflist v-else :list="shelflist[shelfcategory.index].itemList" :whatpage="'category'"></shelflist>
  </div>
</template>

<script>
import shelftitle from '../../components/store/shelf/shelftitle.vue'
import {storeshelfmixin} from '../../utils/mixin'
export default {
    name:'storeshelfcategory',
    mixins:[
        storeshelfmixin
    ],
components:{
    shelftitle,
    shelflist:()=>import(/*webpackChunkName:'shelf-list'*/'../../components/store/shelf/shelflist.vue'),
},
    data() {
        return {
           shelfcategory:null
        }
    },
    watch:{
    shelfselected:{
      immediate:true,
      deep:true,
      handler(){
        console.log('检测到list变化');
        this.shelfcategoryinit();
      }
    }
    },
  
methods: {
    shelfcategoryinit(){
           this.shelflist.forEach((item,i)=>{
        if(item.title==this.$route.query.title){
           this.shelfcategory={
               index:i,
               title:item.title
           }
        }
        })
    }
},
mounted() {
  this.shelfcategoryinit()
  this.SETCURRENTPAGE('category')
  this.SETCURRENTCATEGORY(this.$route.query.title)
},
destroyed(){
  this.SETCURRENTCATEGORY('')
},
activated(){
  this.shelfcategoryinit()
  this.SETCURRENTPAGE('category')
  this.SETCURRENTCATEGORY(this.$route.query.title)
},
deactivated() {
  this.SETCURRENTCATEGORY('')
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