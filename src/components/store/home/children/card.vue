<template>
  <div class="card-wraper">
    <div class="card-bg-wraper" :class="{'cardshow':$store.state.storehome.cardvisible}" v-if="hasaround==false">
      <div
        class="circle-wraper"
        v-for="(item, index) in CardList"
        :key="'circle' + index"
        :style="{ zIndex: item.zIndex }"
      >
        <div class="left" :style="showany(item, 'left')" ref="left"></div>
        <div class="right" :style="showany(item, 'right')" ref="right"></div>
      </div>
    </div>


    <div class="randombook-wraper" v-else>
      <div class="img-wraper">
        <img :src="randomObj.cover">    
      </div>

      <div class="book-describe-wraper">
          <span>{{randomObj.title}}</span>
          <span>{{randomObj.author}}</span>
      </div>

      <div class="readnow-wraper">
        <span>立即阅读</span>
      </div>

      <audio src="../../../../assets/card.mp3" ref="audio" autoplay preload="auto"></audio>
    </div>


    <div class="close" @click="hidecard">
      <span class="iconfont icon-close-line"></span>
    </div>
  </div>
</template>

<script>
import { storehomemixin } from "../../../../utils/mixin";
export default {
  props:['randomObjlist'],
  data() {
    return {
      CardList: [
        {
          r: 255,
          g: 102,
          _g: 102,
          b: 159,
          imgLeft: "url(" + require("@/assets/images/gift-left.png") + ")",
          imgRight: "url(" + require("@/assets/images/gift-right.png") + ")",
          backgroundSize: "50% 50%",
          zIndex: 100,
          leftrotateDegree: 0,
          rightrotateDegree: 0,
        },
        {
          r: 74,
          g: 171,
          _g: 171,
          b: 255,
          imgLeft: "url(" + require("@/assets/images/compass-left.png") + ")",
          imgRight: "url(" + require("@/assets/images/compass-right.png") + ")",
          backgroundSize: "50% 50%",
          zIndex: 99,
          leftrotateDegree: 0,
          rightrotateDegree: 0,
        },
        {
          r: 255,
          g: 198,
          _g: 198,
          b: 102,
          imgLeft: "url(" + require("@/assets/images/star-left.png") + ")",
          imgRight: "url(" + require("@/assets/images/star-right.png") + ")",
          backgroundSize: "50% 50%",
          zIndex: 98,
          leftrotateDegree: 0,
          rightrotateDegree: 0,
        },
        {
          r: 255,
          g: 102,
          _g: 102,
          b: 159,
          imgLeft: "url(" + require("@/assets/images/heart-left.png") + ")",
          imgRight: "url(" + require("@/assets/images/heart-right.png") + ")",
          backgroundSize: "50% 50%",
          zIndex: 97,
          leftrotateDegree: 0,
          rightrotateDegree: 0,
        },
        {
          r: 59,
          g: 201,
          _g: 201,
          b: 22,
          imgLeft: "url(" + require("@/assets/images/crown-left.png") + ")",
          imgRight: "url(" + require("@/assets/images/crown-right.png") + ")",
          backgroundSize: "50% 50%",
          zIndex: 96,
          leftrotateDegree: 0,
          rightrotateDegree: 0,
        },
    {
          r: 255,
          g: 102,
          _g: 102,
          b: 159,
          imgLeft: "url(" + require("@/assets/images/gift-left.png") + ")",
          imgRight: "url(" + require("@/assets/images/gift-right.png") + ")",
          backgroundSize: "50% 50%",
          zIndex: 90,
          leftrotateDegree: 0,
          rightrotateDegree: 0,
        },
      ],
      times: 0,
      hasaround:false,
      randomObj:null,
    };
  },
  mixins: [storehomemixin],
  methods: {
    hidecard() {
      this.SETCARDVISIBLE(false);
    },
    showany(item, dir) {
      // 返回一个样式对象供模板的style绑定使用
      return {
        background: dir == "left" ? item.imgLeft : item.imgRight,
        backgroundColor: `rgb(${item.r} ,${item.g} ,${item.b})`,
        backgroundSize: item.backgroundSize,
        transform: `rotateY(${
          dir == "left" ? item.leftrotateDegree : item.rightrotateDegree
        }deg)`,
      };
    },
    rotate(){
              if (this.CardList[this.times].rightrotateDegree !== 90) {
                   
                 this.CardList[this.times].rightrotateDegree += 10;

               } else {
                    if(this.times+1==5){
                      
                      this.CardList[this.times].zIndex=100;
                
                      this.CardList[this.times+1].zIndex=200;
                      this.CardList[this.times + 1].leftrotateDegree -= 10;
                    }else{
                      this.CardList[this.times].zIndex=100;

                      this.CardList[this.times+1].zIndex=200;
                    this.CardList[this.times + 1].leftrotateDegree -= 10;
                    }
                  
               }
               Promise.resolve()
    },
     oncerotate() {
           let s = setInterval(async () => {
        await this.rotate()
    if(this.CardList[this.times].rightrotateDegree==90&&this.CardList[this.times + 1].leftrotateDegree==0){
      if (this.times<4) {
        this.times++;
      } else {
        this.hasaround=true;
        this.times = 0;
        this.CardList.forEach((item,index)=>{
          item.leftrotateDegree=0;
          item.rightrotateDegree=0
          // item.zIndex=0;
      
        })
      }
        clearInterval(s)
    }
    }, 22);
    },
   
  },
  mounted() {
    
    this.randomObj=this.randomObjlist[Math.floor(Math.random() * this.randomObjlist.length)]
  },
  watch:{
  'times':{
      deep:true,
      immediate:true,
      handler(newv){
          if(newv<4){

            this.CardList[newv + 1].leftrotateDegree=90;
          }
          if(newv==4){
            this.CardList[5].leftrotateDegree=90;
          }
           this.CardList.forEach((item,index) => {
               if(index!==newv&&index!==newv+1){
                   item.zIndex=0;
               }else if(index==newv){
                    item.zIndex=200;
               }else if(index==newv+1){
                 item.zIndex=100;

               }
                 });
          this.oncerotate()
      }
  },
  'hasaround'(newv){
if(newv==true){
this.$nextTick(()=>{
  this.$refs.audio.play();
})

}
  }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../../assets/styles/global.scss";
.card-wraper {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 999;
  background: rgba(51, 51, 51, 30%);

  .card-bg-wraper {
    width: px2rem(80);
    height: px2rem(80);
    background: white;
    box-sizing: border-box;
    // padding: px2rem(20) px2rem(20);
    border-radius: px2rem(10);
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    margin: auto;

    .circle-wraper {
      width: px2rem(60);
      height: px2rem(60);
      // background-color: #ffc666;
      @include abscenter;
      display: flex;
      justify-content: flex-start;
      .left {
        box-sizing: border-box;
        flex: 0 0 50%;
        width: 50%;
        height: 100%;
        // background-color: #ffc666;
        background-repeat: no-repeat !important;
        background-position: center right !important;
        border-radius: px2rem(50) 0 0 px2rem(50);
        transform-origin: right;
        backface-visibility: hidden;
      }
      .right {
        box-sizing: border-box;
        flex: 0 0 50%;
        width: 50%;
        height: 100%;
        background-repeat: no-repeat !important;
        background-position: center left !important;
        border-radius: 0 px2rem(50) px2rem(50) 0;
        transform-origin: left;
        backface-visibility: hidden;
      }
    }

      &.cardshow{
        animation: cardshow .3s ease;
      }
      @keyframes cardshow {
        0% {
        transform: scale(0);
        opacity: 0;
        }
        50% {
          transform: scale(1.2);
          opacity: 1;
      }
      75% {
        transform: scale(0.9);
        opacity: 1;
      }
      100% {
        transform: scale(1);
        opacity: 1;
      }
    }
  }

.randombook-wraper{
  box-sizing: border-box;
  border-radius: 5%;
  width: 30%;
  min-width: px2rem(250);
  max-width: px2rem(300);
  height:55%;
  min-height: px2rem(300);
  max-height: px2rem(350);
  background: white;
  overflow: hidden;
  @include abscenter;
  .img-wraper{
    width: 100%;
    height: 70%;
    @include center;
    img{
    width: 60%;
    height: 80%;
    }
  }
  .book-describe-wraper{
    span{
          width: 100%;
    text-align: center;
      display: block;
      font-size: px2rem(15);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;

    }
    :nth-child(1){
      font-weight: bold;
    }
      padding: px2rem(0) px2rem(5);
     width: 100%;
    height: 20%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
  }
  .readnow-wraper{
     width: 100%;
    height: 10%;
    background:linear-gradient(to right,#3d94fe,#59bae9);
    @include center;
   
    span{
      display: block;
      font-size: px2rem(15);
      color:white;
    }
  }
  animation: bookshow .3s ease-in;
   @keyframes bookshow {
        0% {
        transform: scale(0);
        opacity: 0;
        }
        50% {
          transform: scale(1.2);
          opacity: 1;
      }
      100% {
        transform: scale(1);
        opacity: 1;
      }
    }
}


  .close {
    width: px2rem(50);
    height: px2rem(50);
    position: absolute;
    top: 90%;
    left: 50%;
    transform: translate(-50%, 0px);
    border-radius: 50%;
    background: white;
    @include center;
  }
}
</style>