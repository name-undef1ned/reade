<template>
  <div class="title-wraper" >
      <!-- left right div为一级flex，right为二级flex 所以这样搭建结构 -->
      <div class="left" @click="back"> 
         <span class="icon-back iconfont"></span>
      </div>
      <div class="right">
         <div class="icon-wraper">
             <span class="icon-cart iconfont ico"></span>
         </div>
         <div class="icon-wraper">
             <span class="icon-person iconfont ico"></span>
         </div>
         <div class="icon-wraper">
             <span class="icon-moreandroid iconfont ico"></span>
         </div>
      </div>
  </div>
</template>

<script>
export default {
name:'Booktitle',
methods: {
      back(){
    this.$router.go(-1)
  },
},
}
</script>

<style lang="scss" scoped>
@import '../../assets/styles/global.scss';
//  .themezhuqingimage{
//       background-image: url("../../assets/img/p243944566.jpg") !important;
//   }
.title-wraper{
    // 任何屏幕情况下宽度都是100%，但是高度自适应
    width:100%;
    height: px2rem(42);
    
    // 需要在页面上方 设置浮动
    position: absolute;
    left: 0;
    top: 0;
    z-index: 20;
    // 使用flex布局排列左边的1个ico的div和右边三个ico的div
    display: flex;
    
    .left{
        // 设定flex属性 份数即分子 项目大与容器时缩进程度 初始固定大小 .
        // 关于第一个值 如果几个项目其他项目都没有这个值 那么设置这个值就是剩下所有空间即自动填充
        flex:0 0 px2rem(22);
       
        // 也设置为flex居中对齐,已经居中 不过是三级视觉错误 调整一下ico相对于span的位置
        @include center;
        // 设置图标居中
        span{
           vertical-align: top;
           line-height: px2rem(22);
           font-size: px2rem(25);
        }
    }
    .right{
        //右侧div 自动填充
        flex:1;
        // 二级flex 调整三个ico  flex嵌套 项目也可以设置成容器
        display: flex;
        justify-content: flex-end;
        .icon-wraper{
            @include center;
                span::before{
                    font-size: px2rem(25);
                }
            
        }
        .icon-wraper:first-child{
             span::before{
                    font-size: px2rem(27.5);
                }
        }
        span{
           margin: auto 10px;
           vertical-align: top;
           line-height: px2rem(22);
           font-size: 90%;
        }
        
        
    }
    
    // 修饰样式 不重要
    /* x偏移量 | y偏移量 | 阴影模糊半径 | 阴影扩散半径 | 阴影颜色 */
    box-shadow:0 px2rem(1) px2rem(5) px2rem(5) rgba(0,0,0,10%);
    background: white;
}
</style>