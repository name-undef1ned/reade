<template>
  <div id="app">
   
    <router-view></router-view>
  </div>
</template>

<script>

export default {
 data() {
   return {
 
   }
 },
  name: 'App',
  components: {
   
  },
 
}

// rem响应式的设置
// 1在合适的时候用于监听计算赋值
document.addEventListener('DOMContentLoaded',()=>{
  // 2响应式-相对于谁响应并给出计算公式
  let fontsize=window.innerWidth/10;
  // 3一般设置最大值
  fontsize=fontsize>50?50:fontsize
  const html=document.querySelector('html')
  html.style.fontSize=fontsize+'px';
  console.log(html.style.fontSize);
})
</script>

<style lang="scss">
@import './assets/styles/global.scss';
 #app{
   width: 100%;
   height: 100%;
   overflow: hidden;
 }
span{
@include Setfontfamily;
}
#s3{
  font-size:px2rem(20)
}


 

</style>
