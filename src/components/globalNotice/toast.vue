<template>
  <transition name="fade">
    <div class="toast-bg" v-show="visible">
      <div class="toast-wrapper">
        <div class="toast" v-html="text"></div>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    name:'toast',
    props: {
      text: [String, Number],
      timeout: {
        type: Number,
        default: 1500
      }
    },
    data() {
      return {
        visible: false
      }
    },
    methods: {
      hide() {
        this.visible = false
      },
      show() {
        clearTimeout(this.task)
        this.task = null
        this.visible = true
        this.task = setTimeout(() => {
          this.visible = false
        }, this.timeout)
      },
      continueShow() {
        clearTimeout(this.task)
        this.task = null
        this.visible = true
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/global.scss";

  .toast-bg {
    position: absolute;
    top: 30%;
    left: 50%;
    margin: 0 0 0 -50%;
    z-index: 2500;
    width: 100%;
    @include center;
    .toast-wrapper {
      width: 60%;
      line-height: px2rem(20);
      padding: px2rem(10) px2rem(20);
      box-sizing: border-box;
 background: linear-gradient(to bottom, rgba(255,255,255,0.15) 0%, rgba(0,0,0,0.15) 100%), radial-gradient(at top center, rgba(255,255,255,0.40) 0%, rgba(0,0,0,0.40) 120%) #989898; background-blend-mode: multiply,multiply;
   background-image: linear-gradient(to top, #5ee7df 0%, #b490ca 100%);
    border-radius: px2rem(10);
      font-size: px2rem(14);
      color: white;
      .toast {
        text-align: center;
        word-break: break-all;
      }
    }
  }
</style>
