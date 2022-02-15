// 书城汇总路由组件
<template>
  <div class="store-wraper">
      <!-- <h1>书城页面</h1> -->
      <router-view></router-view>
  </div>
</template>

<script>
export default {
name:'index'
}
</script>

<style lang="scss" scoped>
@import '../../assets/styles/global.scss';
.store-wraper{
    width: 100%;
    height: 100%;
    // background: cyan;
    
}

</style>