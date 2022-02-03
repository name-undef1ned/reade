<template>
  <div class="bookmark-wraper">

      <div class="all" ref="all">
      <div class="icon-down-wraper">
          <span class="iconfont icon-down1" ref="icondown"></span>
      </div>
      <div class="text-wraper">
          <span v-if="islevel==3">{{ismark==false?'松手添加书签':'松手删除书签'}}</span>
          <span v-else>{{ismark==false?'下拉添加书签':'下拉删除书签'}}</span>
      </div>
      <div class="icon-mark-wraper" ref="mark">
      </div>

      </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
name:"bookmark",
computed:{
    ...mapState('book',['offsetY','rendition','isTitleAndMenuShow','isbookprogressready','hastouchup','lastoffsetY'])
},
data() {
    return {
        islevel:0,
        ismark:false
    }
},
watch:{
    offsetY(newv){
           //  判断是否已经添加了书签如果是就是删除的逻辑 否则就是添加逻辑
       if(this.ismark){
       this.delmark(newv);
       }else{
           this.addmark(newv);
       }

    },
    // 最终删除/添加与否都是建立在用户松手(hastouchup状态数据)的情况之上 且 需要以当前mark是否存在 和 下拉量 为判断 去决定mark的定位和颜色
    hastouchup(newv){
        // 第三阶段数值且用户松手
        if(newv&&this.lastoffsetY>85&&!this.ismark){
            // 第三阶段标签变色且变为fixed布局
        
        this.$refs.mark.style.position='fixed'
        this.$refs.mark.style.zIndex='18'
        this.$refs.mark.style.top='0px'
           setTimeout(() => {
                this.ismark=true
                
            }, 250);
        }else if(newv&&this.lastoffsetY>85&&this.ismark){
            setTimeout(() => {
                this.ismark=false
                
            }, 250);
        }
    }
},
methods: {
    addmark(newv){
    if(newv<57){
        this.islevel=1;
        this.$refs.icondown.style.transform='rotate(360deg)'
        // 第一阶段让三个元素回到初始位置 并且需要延迟回去 不然在弹回去阶段就会看到，而且是为0的时候.
        if(newv==0){
          setTimeout(() => {
            this.$refs.all.style.bottom=`0px`;
              // 第一第二阶段书签是白色
        // this.$refs.mark.style.borderColor='white white transparent white';
        }, 300);
        }
    }
    if(newv>57&&newv<85){
        this.islevel=2;
        this.$refs.icondown.style.transform='rotate(360deg)'
        // 第二阶段和第三阶段都吸顶 同步移动达到相对静止
        this.$refs.all.style.bottom=`${newv-57}px`
        // 第一第二阶段书签是白色
        this.$refs.mark.style.borderColor='white white transparent white'

    }
    if(newv<100&&newv>85){
        this.islevel=3;
        this.$refs.icondown.style.transform='rotate(180deg)'
           // 第二阶段和第三阶段都吸顶
        this.$refs.all.style.bottom=`${newv-57}px`;
        // 第三阶段标签变色
        this.$refs.mark.style.borderColor='#295a9d #295a9d transparent #295a9d'
    }
    },
    delmark(newv){
    if(newv<57){
        this.islevel=1;
        this.$refs.icondown.style.transform='rotate(360deg)'
        // 第一阶段让三个元素回到初始位置 并且需要延迟回去 不然在弹回去阶段就会看到，而且是为0的时候.
        if(newv==0){
          setTimeout(() => {
            this.$refs.all.style.bottom=`0px`;
              // 第一第二阶段书签是白色
        // this.$refs.mark.style.borderColor='white white transparent white';
        }, 300);
        }
    }
    if(newv>57&&newv<85){
        this.islevel=2;
        this.$refs.mark.style.position='absolute'
        this.$refs.mark.style.zIndex='2'
        this.$refs.mark.style.top=''
        this.$refs.icondown.style.transform='rotate(360deg)'
        // 第二阶段和第三阶段都吸顶 同步移动达到相对静止
        this.$refs.all.style.bottom=`${newv-57}px`
        // 第一第二阶段书签是白色

    }
    if(newv<100&&newv>85){
        this.islevel=3;
        this.$refs.icondown.style.transform='rotate(180deg)'
           // 第二阶段和第三阶段都吸顶
        this.$refs.all.style.bottom=`${newv-57}px`;
        // 第三阶段标签变色
        this.$refs.mark.style.borderColor='white white transparent white'

    }
    }
},
}
</script>

<style lang="scss" scoped>
@import '../assets/styles/global.scss';
// icondown图标第二阶段样式
// text第二阶段样式
// mark标签第二阶段样式
.icondown-roatate{
    transform: rotate(180deg);
}
.bookmark-wraper{
    width: 100%;
    height:98px;
    background:#686b70;
    position: absolute;
    top: -98px;
    box-sizing: border-box;
    // z-index: 99;
    .all{
        width: 50%;
        height: 57px;
        // border: 1px solid red;
        position: absolute;
        box-sizing: border-box;
        right: 0px;
        bottom: 0;
        // display: flex;
        // border: 1px solid white;
        // justify-content: flex-end;
        // align-items: flex-end;
        span{
            font-size: px2rem(16);
            color: white;
        }
        div{
            margin:0 px2rem(2);
        }
        .icon-down-wraper{
            position: absolute;
            right: 160px;
            bottom: 0px;
            .icon-down1{
            display: block;
            transform-origin: center;
            transition: all .2s linear;
            margin-bottom: px2rem(2);
        }
        }
        
        .text-wraper{
              position: absolute;
            right: 40px;
            bottom: 0px;

            span{
                display: block;
            margin-bottom: px2rem(2);

            }
        }
        .icon-mark-wraper{
              position: absolute;
            right: 10px;
            width: 0;
            height: 0;
            border-width: 45px 10px 10px 10px;
            border-style: solid;
            border-color: white white transparent white;
            
        }
    }
   

}
</style>