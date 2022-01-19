// 通知组件:位置属性有left top bottom right ，样式属性有字体颜色即color 背景颜色backgroundColor，信息属性message



<template>
<transition name="loading-wrap">
  <div class="loading-wrap" ref="loadingwrap">
    <div class="progress-wraper">
    <span class="iconfont icon-a-InProgress" ref="iconloading"></span>
    </div>

    <div class="message-wraper">
        <span class="messagespan">{{message}}</span>
    </div>
    
  </div>
</transition>

</template>

<script>
export default {
    name:'loading',
    props:['left','top','right','bottom','message','color','backgroundColor'],
    methods: {
        initloading(){
        // 属性赋值
        this.$refs.loadingwrap.style.left=this.left;
        this.$refs.loadingwrap.style.top=this.top;
        this.$refs.loadingwrap.style.right=this.right;
        this.$refs.loadingwrap.style.bottom=this.bottom;
        this.$refs.loadingwrap.style.color=this.color;
        this.$refs.loadingwrap.style.borderColor=this.color;
        // this.$refs.loadingwrap.style.background=this.backgroundColor;


        // 自销毁逻辑
      

        }
    },
    watch:{
        
    },
    mounted() {
       this.initloading();
    },
    beforeDestroy() {
    },
}
</script>

<style lang="scss" scoped>
@import '../../../assets/styles/global.scss';
.loading-wrap{
    z-index: 99;
    width: px2rem(140);
    max-width: px2rem(200);
    // height: px2rem(100);
    // 高度不应被限制 由内容决定
    // max-height: px2rem(200);

    // 开启毛玻璃效果
    backdrop-filter: blur(px2rem(20));
    -webkit-backdrop-filter: blur(px2rem(20));
    // border: 1px solid cyan;
    box-sizing: border-box;
    position: absolute;
    z-index: 30;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    
    border-radius:6%;
    // background: rgba(83, 107, 107,10%);
    // background: white;
    color: black;

    // overflow: hidden;

.progress-wraper{

/* 使用css3动画实现加载动画 */
.icon-a-InProgress{
    // 行内元素转不了
    display: block;

@keyframes myfirst2
{
from {transform: rotate(0deg);}
to {transform: rotate(359deg);}
}
animation: myfirst2 6s infinite ease;

}
}

.message-wraper{
flex:1;
width:100%;

   
 .messagespan{
     display: inline-block;
    font-size:px2rem(16);
}


}

}
// 离开动画 进入不由该组件控制 写了也没用
 .loading-wrap-leave-to{
  opacity: 0;
 }
//  离开起点后的状态和元素最终状态 。但是元素最终状态会被元素本身的样式类覆盖
 .loading-wrap-leave{
 opacity: 1;
 }
//  整个过程
 .loading-wrap-leave-active{
  // transition:all .3s ease;
  transition:opacity 0.3s linear;
  -ms-transition:all 0.3s ease;/*IE*/
 -moz-transition: all 0.3s ease; /* Firefox 4 */
 -webkit-transition:all 0.3s ease; /* Safari 和 Chrome */
 -o-transition: all 0.3s ease; /* Opera */
 }

</style>