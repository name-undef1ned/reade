<template>
  <div class="popup" v-show="visible">
    <transition name="fade">
      <div
        class="popup-bg"
        v-show="popupVisible"
        @click.stop.prevent="hide"
        @touchmove.prevent
      ></div>
    </transition>
    <transition name="popup-slide-up">
      <div class="popup-wrapper" v-show="popupVisible">
        <div class="popup-title" v-if="title && title.length > 0" v-html="title">
          <!-- {{ title }} -->
        </div>
        <div
          class="popup-confirm-btn"
          @click="third"
          v-if="thirdText && thirdText.length > 0"
        >
          {{ thirdText }}
        </div>
        <div
          class="popup-confirm-btn"
          :class="{ 'is-remove': isRemoveText }"
          @click="confirm"
        >
          {{ confirmText }}
        </div>
        <div class="popup-cancel-btn" @click="hide">{{ cancelText }}</div>
      </div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
    name:'popup',
  props: {
    title: String,
    confirmText: String,
    isRemoveText: Boolean,
    cancelText: String,
    thirdText: String,
    confirmEvenName:String,
    thirdTextconfirmEvenName:String
  },
  data() {
    return {
      popupVisible: false,
      visible: false,
    };
  },
  methods: {
    third() {
      this.hide();
      setTimeout(() => {
        this.$bus.$emit(this.thirdTextconfirmEvenName);
      }, 200);
    },
    confirm() {
      this.hide();
      setTimeout(() => {
        // 调用shelfpanel组件移出书架的事件

        this.$bus.$emit(this.confirmEvenName);
      }, 200);
    },
    hide() {
      this.popupVisible = false;
      setTimeout(() => {
        this.visible = false;
      }, 200);
    },
    show() {
      this.visible = true;
      this.popupVisible = true;
    },
  },
};
</script>

<style lang="scss"  scoped>
@import "../../assets/styles/global.scss";


.popup {

  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 2000;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  .popup-bg {
    width: 100%;
    height: 100%;
  }
  .popup-wrapper {
    background: linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%);
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 2000;
    width: 100%;
    .popup-title {
      width: 100%;
      height: px2rem(44);
      border-bottom: px2rem(1) solid #eee;
      font-size: px2rem(16);
      line-height: px2rem(14);
      padding: px2rem(15);
      box-sizing: border-box;
      text-align: center;
      color: #999;
      @include center;
    }
    .popup-confirm-btn {
      width: 100%;
      height: px2rem(60);
      border-bottom: px2rem(1) solid #eee;
      font-size: px2rem(16);
      color: #666;
      font-weight: bold;
      @include center;
      &.is-remove {
        color: $color-pink;
      }
    }
    .popup-cancel-btn {
      width: 100%;
      height: px2rem(60);
      font-size: px2rem(16);
      color: #666;
      font-weight: bold;
      @include center;
    }
  }
}
</style>
