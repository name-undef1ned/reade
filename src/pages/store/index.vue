// 书城汇总路由组件
<template>
  <div class="store-wraper">
    <transition name="pagetoogle">
      <!-- 指定detail页面不缓存 -->
      <keep-alive exclude="storedetail,storelist">
        <router-view></router-view>
      </keep-alive>
    
    </transition>
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