<template>
  <div id="app">
    <span class="icon-cart"></span>
    <span class="icon-clock"></span>
    <span id="s3">this is some word in app.vue</span>
    <router-link :to="{name:'helloword'}">click me to show helloword</router-link>
    <router-view></router-view>
  </div>
</template>

<script>

export default {
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

span{
@include Setfontfamily;
}
#s3{
  font-size:px2rem(20)
}

</style>
