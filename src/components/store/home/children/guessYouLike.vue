<template>
  <div class="guessyoulike-wraper">
    <div class="title-wraper">
      <span>猜你喜欢</span>
      <span @click="changebooklist">换一批</span>
    </div>

    <div class="book-wraper" v-for="(item,index) in likelistshow" :key="'guesslike'+index" @click="showbookdetail(likelist[item])">
         <div class="img-wraper">
            <img :src="likelist[item].cover"/>    
         </div>
         <div class="book-describe-wraper">
           <div class="top-wraper">
             <span>{{likelist[item].title}}</span>
           </div>
           <div class="bottom-wraper">
             <span>{{likelist[item].author}}</span>
             <span>根据{{likelist[item].result}}推荐</span>
           </div>
         </div>
    </div>
  </div>
</template>

<script>
import {storehomemixin} from '../../../../utils/mixin'
export default {
name:'guessYouLike',
mixins:[storehomemixin],
data() {
  return {
    likelistshow:[0,1,2]
  }
},
props:{
  likelist:Array
},
methods: {
  changebooklist(){
    console.log(1);
    switch(this.likelistshow[0]){
      case 0 :
        this.likelistshow=[3,4,5];
        break ;
      case 3 :
         this.likelistshow=[6,7,8];
        break ;
      case 6 :
         this.likelistshow=[0,1,2];
        break ;
    }
  }
},
mounted() {
 
},
}
</script>

<style lang="scss" scoped>
@import '../../../../assets/styles/global.scss';
.guessyoulike-wraper{
  width: 100%;
  // height: px2rem(600);
  box-sizing: border-box;
  padding: px2rem(5) 0;
 
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

  .book-wraper{
     width: 100%;
    height: px2rem(115);
  box-sizing: border-box;
     display: flex;
     justify-content: flex-start;
    //  flex-wrap: wrap;
    align-items: center;
    // margin: px2rem(10) 0;
  
    .img-wraper{
      width: px2rem(70);
      // 不允许伸展 缩放 固定宽度
      flex:0 0 px2rem(70);
      
      height: px2rem(100);
      margin: px2rem(5);
      img{
        width: 100%;
        height: 100%;
      }
    }

    .book-describe-wraper{
      // 允许伸展 缩放 自适应宽度 相当于flex：1；
      flex:1 1 auto;
      height: px2rem(100);
      box-sizing: border-box;
      display: flex;
      flex-wrap: wrap;
      align-items: flex-start;
      // overflow: hidden;
      width: 0;
      .top-wraper{
        width: 100%;
        height: 30%;
      box-sizing: border-box;

        span{
        display: inline-block;
      width: 100%;
        height: 75%;
      font-size: px2rem(17);
      font-weight: bold;
      white-space: nowrap;
          overflow: hidden;
      text-overflow: ellipsis;
   
        }
      }
      .bottom-wraper{
        width: 100%;
        height: 70%;
      box-sizing: border-box;
          overflow: hidden;

        span{
          display: inline-block;
      width: 100%;
      font-size: px2rem(12);
      white-space: nowrap;
          overflow: hidden;
      text-overflow: ellipsis;

        }
          :nth-child(1){
      font-size: px2rem(13);
          }
          :nth-child(2){
            color: rgba(139, 117, 117, 0.8);
          }
      }
    }
  }
}
</style>