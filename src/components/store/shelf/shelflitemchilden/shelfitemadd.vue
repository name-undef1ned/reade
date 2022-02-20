<template>
  <div class="shelfitemadd-wraper" @click="gohome">
    <span class="iconfont icon-add"></span>
  </div>
</template>

<script>
export default {
    name:'shelfitemadd',
    methods:{
      gohome(){
        this.$router.push({
          path:'/store/home'
        })
      }
    }

}
</script>

<style lang="scss" scoped>
@import '../../../../assets/styles/global.scss';
.shelfitemadd-wraper{
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  border: 1px dashed #ccc;
  @include center;
  span{
    font-size: px2rem(40);
    color: #ccc;
  }
}
</style>