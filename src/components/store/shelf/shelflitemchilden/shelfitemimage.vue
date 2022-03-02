<template>
  <div class="shelfitemimage-wraper">
  <img v-lazy="data.cover" :key="data.cover">
  </div>
</template>

<script>
export default {
    name:'shelfitemimage',
    props:{
      data:{
        type:Object
      }
    }

}
</script>

<style lang="scss" scoped>
@import '../../../../assets/styles/global.scss';
.shelfitemimage-wraper{
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  img{
    width: 100%;
    height: 100%;
    box-sizing: border-box;

  }

}
</style>