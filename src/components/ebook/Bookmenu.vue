<template>
  <!-- 顶层menubar布局 -->
 
  <div class="menubar">
    <!-- 菜单选项布局 -->
    <div
      class="menu-wraper"
      :class="{ showclass:!isallfalse}"
      ref="menuwraper"
    >
      <div class="icon-wraper" @click="showcapture">
        <span class="icon-menu ico"></span>
      </div>
      <div class="icon-wraper" @click="toggleshowprogress">
        <span class="icon-progress ico"></span>
      </div>
      <div class="icon-wraper"   @click="toggleshowsettheme">
        <span class="icon-bright ico"></span>
      </div>
      <div class="icon-wraper" @click="toggleshowsetfontsize">
        <div class="div-a">A</div>
      </div>
    </div>
    <!-- 字体设置布局 -->
    <transition name="menu">
      <!-- ,gonow:isgonow&&lastcomponentactive==0 -->
    <div
      class="setfontsize"
      :class="{ showclass: isanyshow[0]}"
      v-if="isanyshow[0]"
      ref="setfontsize"
    >
    <div class="d1">
       <span class="icon-font_size_minus sizespan1"></span>
      <div class="block">
        <el-slider
          v-model="value2"
          @change="hideslibartip"
          v-if="isanyshow[0]"
          :step="1"
          :min="7"
          :max="30"
          show-stops
        >
        </el-slider>
      </div>
      <span class="icon-icon_font_size_plus sizespan2"></span>

    </div>
    <div class="d2">
      <span @click="showFontfamily">{{$store.state.book.fontfamilyselected}}</span><span class="icon-forward"></span>
    </div>
     
    </div>
    </transition>

    
    <!-- 背景设置布局 -->
    <transition name="menu">
      <!-- ,gonow:isgonow&&lastcomponentactive==1 -->
     <div
      class="setTheme"
      :class="{ showclass: isanyshow[1]}"
      v-if="isanyshow[1]"
      ref="settheme"
    >
      <!-- 预览区 -->
      <div class="setTheme-preview">
        <div
          v-for="(themlistitem, index) in themeslist"
          :key="themlistitem.name"
          class="setTheme-preview-item"
          :style="themlistitem.style.body"
          @click="setthem($event, themlistitem.name)"
          :data-index="index"
        ></div>
      </div>
      <!-- 标题区 -->
      <div class="setTheme-title">
        <div
          v-for="(themlistitem,index) in themeslist"
          :key="themlistitem.name"
          class="setTheme-title-item"
          :id="'d'+index"
          :class="{ 'setTheme-title-item-titlecurrent': themlistitem.selected }"
        >
          {{ themlistitem.name }}
        </div>
      </div>
    </div>
    </transition>


     <!-- 进度条布局 -->
   <transition name="menu">
     <!-- ,gonow:isgonow&&lastcomponentactive==2 -->
    <div class="setprogress" v-if="isanyshow[2]" ref="setprogress" :class="{ showclass: isanyshow[2]}">
     <!-- 章节目录提示 -->
      <div class="progresstip-wraper">
        {{ isbookprogressready === false ? "加载中..." : `${value1}%` }}
      </div>

      <!-- 进度条 -->
      <div class="progress-wraper">
        <!-- leftbutton -->
        <span class="icon-back"></span>
        <div class="block">
          <el-slider
            v-model="value1"
            @change="touchup"
            v-if="isanyshow[2]"
            :step="1"
            :show-tooltip="false"
            :disabled="!isbookprogressready"
          >
          </el-slider>
        </div>
        <!-- rightbutton -->
        <span class="icon-forward"></span>

      </div>

     <!-- 加载&进度提示 -->
      <div class="progresstip-wraper">
        {{ isbookprogressready === false ? "加载中..." : `${value1}%` }}
      </div>

    </div>
   </transition>
  
  <!-- 目录布局 -->
  <!-- <div class="capture"  :class="{capturepointevent:!isanyshow[3]}"  v-show="isanyshow[3]"> -->
    <!-- 给这个元素加上v-if子元素动画不正常显示 不加让他一直存在父元素的动画又会出问题。应该是父子元素的渲染规则和vue的过渡动画产生冲突 
    换成v-show就默认存在 v-enter就不会有问题  可是切换后该元素及其后代一直存在 v-leave的动画又监听不到了  总而言之对一个dom元素的的渲染规则
    影响了vue过渡类名的监听-动画元素即条件渲染不要设置父元素布局或者其他抢夺元素是否存在的控制权
     .这个只是起到子元素定位作用 -要不给子元素单独定位 -实现-->
    <transition name="capture-wraper">
     <div class="capture-wraper"  ref="captureWraper" v-show="isanyshow[3]">
      <li v-for="(item,index) in navigation.toc" :key="index" @click="jumpandhide(item.href)">
        {{index+1}}.{{item.label}}
      </li>
     </div>
    </transition>
   <transition name="fade">
       <div class="mask" v-if="isanyshow[3]" ref="mask" @click="hidecapture"></div>
   </transition>

  <!-- 字体样式布局 -->
  <transition name="fontfamily">
  <Fontfamily v-if="isshowFontfamily"></Fontfamily>
  </transition>
  <!-- </div> -->
   
  </div>
</template>

<script>
import mixin from '../../utils/mixin'
import {mapState} from 'vuex'
import Fontfamily from './bookmenuchildren/Fontfamily.vue'
import {getfontsize, setfontsize} from '../../utils/localstorage'
const vm = {
  name: "Bookmenu",
  mixins:[mixin],
  components:{
    Fontfamily
  },
  data() {
    return {
      isshowsetfontsize: false,
      value2: 20,
      value1: 0,
      remint: null,
      // 0为字体设置元素，1为背景设置元素,2为进度条元素,3为目录
      isanyshow: [false, false, false,false],
      //组件间动画过渡需求 不是原路返回直接消失没有动画 记录上一次用户单击了哪个 如果上次单击等于此次单击 那么当前直接消失。
      // 记录具体哪个
      lastcomponentactive:[10],
      // 是否原路返回 在每一个单击事件回调判断为上次=这次-true，不等于为false。条件类名为这两个变量
      isgonow:false
    };
  },
  computed: {
    ...mapState('book',['navigation']),
    // menubar是否应用阴影的条件
    isallfalse: {
      get() {
        return this.changeisanyshow();
      },
      set(newv) {},
    },
  },
  methods: {
    animatecontrol(){
      let lasttime=this.lastcomponentactive[this.lastcomponentactive.length-2];
      let thistime=this.lastcomponentactive[this.lastcomponentactive.length-1];
      if(thistime==lasttime)return
      switch(lasttime){
        case(0):
          if(this.$refs.setfontsize)this.$refs.setfontsize.classList+=" gonow";
          break;
        case(1):
          if(this.$refs.settheme)this.$refs.settheme.classList+=" gonow";
          break;
        case(2):
          if(this.$refs.setprogress)this.$refs.setprogress.classList+=" gonow";
          break;
       
      }
     
    },
    // 控制目录的显示
    showcapture(){
      this.lastcomponentactive.push(3);
      // this.animatecontrol();
      this.changeisanyshow(3);
    },
    // 控制目录的隐藏
    hidecapture(){
        this.changeisanyshow(3,false);
    },
    // 目录的跳转通知
    jumpandhide(href){
    this.$store.commit('book/setcapturehref',href)
    this.changeisanyshow(3,false);
    },
    // 移动端的chorme和safiry兼容 将innerheight给到capture-wraper
   captureheight(){
      this.$refs.captureWraper.style.height=`${global.innerHeight}px`;
   },
    // 字体元素控制组件是否显示-以及字体设置元素和菜单栏的阴影逻辑
    // 1 这个元素显示 menubar的阴影隐藏 size的阴影显示-所以干脆把这个样式抽出一个类名 去动态的添加删除类名
    toggleshowsetfontsize() {
      this.lastcomponentactive.push(0);
      this.animatecontrol();
      this.changeisanyshow(0);
    },
    // 单击字体样式按钮显示 字体组件
    showFontfamily(){
    this.setisshowFontfamily(true)
    },
    // 主题元素是否显示的事件回调
    toggleshowsettheme() {
       this.lastcomponentactive.push(1);
         this.animatecontrol();
      this.changeisanyshow(1);
    },
    // 进度条元素是否显示的事件回调
    toggleshowprogress() {
      this.lastcomponentactive.push(2);
         this.animatecontrol();
      this.changeisanyshow(2);
    },
    // 主题元素的选择方法
    setthem(e, themename) {
      this.SETTHEME(themename);
    },
    // 进度条事件
    // 松手将进度数据给到vuex 给到bookreader的跳转事件
    touchup() {
      this.setpgspercent(this.value1);
    },

    // 重写ele-slibar-提示框-松手隐藏  产生问题：单击一个地方会立马被change的以下回调隐藏 设定延时
    hideslibartip() {
      setTimeout(() => {
        if (document.querySelector(".el-tooltip__popper[x-placement^=top]")) {
          let slibartip = document.querySelector(
            ".el-tooltip__popper[x-placement^=top]"
          );
          slibartip.style.opacity = "0";
          slibartip.style.transition = "opacity .2s linear";

          //  此事件经过防抖 将fontsize值动态修改.mutaition和adction的读取与state不一样 state的模块指定在.后边，而这种事件type需要放在事件名前
          this.$store.commit("book/SETFONTSIZE", this.value2);
          // 并且将其存入缓存
          setfontsize(this.filename,this.value2)
        } else {
          return;
        }
      }, 700);
    },
    // 封装函数-设置组件状态数组 因为涉及数组的响应式修改和未来组件的增加 该函数功能的复用。 功能1指定index为一个状态2全部为假3单值 排他功能 该值取反其他直接为假
    //  4还有动态类名逻辑的处理 无值语法---menubar父组件只有在全部子元素为假时才会显示上方阴影 --让这个函数在数组都为假时返回假 真或者真真假假就返回true，成为父组件是否应用类名的条件.
    // 经过封装 所有处理显示 动态类名的逻辑就都在这了 其他地方只需要调用 极其的简洁可读易于维护和可复用
    changeisanyshow(i, state) {
      // instanceof用来判断一个对象是否属于右边的构造函数 1是基本数据类型  在此处不适用此关键字判断
      // console.log(i instanceof Number);false
      if (
        typeof i == "number" &&
        i < this.isanyshow.length &&
        typeof state === "boolean"
      ) {
        // 数组采用响应式修改
        this.isanyshow.splice(i, 1, state);
      } else if (i === "all") {
        this.isanyshow.forEach((item, index, arr) => {
          arr.splice(index, 1, false);
        });
        return false;
      } else if (
        arguments.length == 1 &&
        typeof i == "number" &&
        i < this.isanyshow.length
      ) {
        this.isanyshow.forEach((item, index, arr) => {
          i == index
            ? arr.splice(index, 1, !this.isanyshow[i])
            : arr.splice(index, 1, false);
        });
      } else if (arguments.length == 0) {
        // 无值语法-全部为假返回false
        let temp = false;
        // 算法：设置一个初始值为假变量 一旦遇到真赋值成真renturn掉 结束foreach循环他状态还是假-说明全部为假
        this.isanyshow.forEach((item, index, arr) => {
          if (item == true) return (temp = item);
        });
        //  class没法用函数 传入一个变量
        return temp == false ? false : (this.isallfalse = true);
      } else {
        return console.log(
          new Error(
            "changeisanyshow:传入双值分别传入下标和布尔值，传入all将所有赋值为假",
            "该数组最大长度为:",
            this.isanyshow.length
          )
        );
      }
    },
  },
  watch: {
    // 重写ele-slibar-提示框/提示框-内容显示
    // 按住显示 但是不让绑定事件 可以放在updated watch 但是是否显示是建立在该组件存在的条件下 不然会造成更新任何地方都会触发显示.
    // updated覆盖面太广了 还需要做判断区分 处理回调又是dom操作 放在watch
    value2: function (newv) {
      if (document.querySelector(".el-tooltip__popper[x-placement^=top]")) {
        // 功能-数值改变-用户滑动-提示框显示
        let slidertip = document.querySelector(
          ".el-tooltip__popper[x-placement^=top]"
        );
        slidertip.style.opacity = "1";
        // 功能-----数值改变-用户滑动-设置字号过小提示
        // 1生成字号提示元素并设置样式
        slidertip.querySelector("span").style.display = "block";
        slidertip.querySelector("span").style.textAlign = "center";
        // 如果不存在即第一次初始化渲染，如果存在就判断字号添加文本即可
        // this.remint===null第一次是渲染了 但是父元素消失了 reminte也不是null了--结果就是不再渲染了
        // 这个判断条件即什么时候渲染要判断出元素是否存在-直接去判断随着该元素消失渲染的数据-标签属性 自己再写状态数据去手动体现 分支太多，
        // 直接写一个类名 属性去自动体现的状态数据进而判断
        if (!slidertip.querySelector("[data-remint]")) {
          // 数值改变-用户开始滑动生成提示文本元素  必须加是否已经存在的判断 不然重复的追加
          this.remint = document.createElement("span");
          // vue属性不加data-
          this.remint.setAttribute("data-remint", "remint");
          slidertip.appendChild(this.remint);
        } else {
          // 具体字号对应文本的渲染
          if (newv <= 14) {
            this.remint.innerText = "!!!∑(ﾟДﾟノ)ノ-亲眼睛不要啦?";
          } else if (newv > 14 && newv < 25) {
            // querselctor里面[]代表标签属性判断
            this.remint.innerText = "";
          } else if (newv >= 25) {
            this.remint.innerText = "(●—●)-有点大...";
          }
        }
      }
    },
  },
  mounted() {
    
    // 字体大小的进度条的初始化读取
   this.value2=getfontsize(this.filename)
    // 字体设置元素和父组件isTitleAndMenuShow的显示和阴影的逻辑处理
    // 使用实例的watch可以传入函数去指定监听数据，但是在配置对象只能是. []的形式
    // 需求：展示字体设置有两个控制对象1A按钮2兄弟组件是否显示(上级组件都不展示 这个当然要隐藏)
    this.$watch(
      function () {
        return this.$store.state.book.isTitleAndMenuShow;
      },
      function (newv) {
        // 父组件状态为真分支
        if (newv === false) {
          this.changeisanyshow("all");
        }
      }
    );
    
    // 初始化调用以及窗口变动调用
    this.captureheight();
    window.addEventListener('resize',()=>{
      this.captureheight();
    })
    
  },
  updated() {
    
   
  },
};
export default vm;
</script>

<style lang="scss" scoped>
@import "../../assets/styles/global.scss";
// 各种条件类
.themezhuqingimage{
      background-image: url("../../assets/img/p243944566.jpg") !important;
  }
.capturepointevent{
   pointer-events: none;
}

.el-slider__button-wrapper{
display: flex;
align-items: center;
}
.gonow{
  display: none;
  // transition:all 0s;
}

// 顶级组件样式
.menubar {
  // 任何屏幕情况下宽度都是100%，但是高度自适应
  width: 100%;
  height: px2rem(43);

  // 需要在页面下方 设置浮动
  position: absolute;
  left: 0;
  bottom: 0;
  
 
  // 修饰样式 不重要
  background: white;
  

  .menu-wraper {
    // 任何屏幕情况下宽度都是100%，但是高度自适应
    width: 100%;
    height: 100%;
      position: absolute;

    z-index:20;
    background: white;
    // 使用flex布局排列左边的1个ico的div和右边三个ico的div
    display: flex;
    justify-content: space-around;
    align-items: center;

   
    .ico::before {
      color: #333;
      font-size: px2rem(28);
    }

    :last-child {
      height: 69%;
    }
    .div-a {
      padding-top: px2rem(3);
      height: 100%;

      font-family: emoji fangsong;
      color: #333;
      font-size: px2rem(33);
      margin-right: px2rem(3);
      font-weight: inherit；;
    }

  
    background-position-y: px2rem(250);
  
  }
  // 字体设置功能样式
  .setfontsize {
    // 任何屏幕情况下宽度都是100%，但是高度自适应
    width: 100%;
    height: px2rem(72);
    // 需要在页面下方 设置浮动
    position: absolute;
    left: 0;
    bottom: px2rem(42);
    z-index: 1;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .d1{
      width: 100%;

    display: flex;
    justify-content: space-between;
    align-items: center;
    }
    // 给到滚动条剩余空间
    .block {
      flex: 1;
      touch-action: none;
    }
    span {
      color: #333;
      font-size: px2rem(28);
      margin: 10px;
    }
    .sizespan1 {
      font-size: px2rem(24);
      margin-right: px2rem(20);
    }

    .d2{
      width:100%;
      height: 100%;
      @include center;
      span{
        display: block;
        box-sizing: border-box;
        margin: 0;
        font-size: px2rem(15);
        // 超出部分省略号
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        // width: 50px;
      }
          
        :first-child{
           width:px2rem(50);
          }  
         
    
    }

    // 修饰样式 不重要
    background-color: white;
  }

  // 主题功能样式
  .setTheme {
    // 任何屏幕情况下宽度都是100%，但是高度自适应
    width: 100%;
    height: px2rem(72);
    // 需要在页面下方 设置浮动
    position: absolute;
    left: 0;
    bottom: px2rem(42);
    z-index: 1;

    display: flex;
    flex-direction: column;
    justify-content: center;
    .setTheme-preview {
      @include center;

      width: 100%;
      height: px2rem(41);
      .setTheme-preview-item {
        flex: 1;
        //  margin不属于盒子模型 会影响flex布局 采用padding分隔 再使用box-sizing:border-box;
        margin: 0 px2rem(7);
        box-sizing: border-box;
        // height: px2rem(70);
        height: 100%;
        box-shadow: px2rem(0) px2rem(0) px2rem(3) px2rem(0) rgba(0, 0, 0, 10%);
      }
    }
    .setTheme-title {
      @include center;
      .setTheme-title-item {
        flex: 1;
        color: #ccc;
        text-align: center;
        font-size: px2rem(15);
      }

      width: 100%;
      height: px2rem(21);
    }

    // 修饰样式 不重要
    background-color: white;
  }

  // 进度条功能样式
  .setprogress {
    // 任何屏幕情况下宽度都是100%，但是高度自适应
    width: 100%;
    height: px2rem(72);
    // 需要在页面下方 设置浮动
    position: absolute;
    left: 0;
    bottom: px2rem(42);
    z-index: 1;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .progress-wraper {
      flex: 0 0 px2rem(20);
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      box-sizing: box-content;
      padding: 0 px2rem(15);
      // 进度条
    .block {
       flex:0 0 80%;
      //  不加会报不能添加事件的错误
      touch-action: none;
      width: 100%;
       padding: 0 px2rem(15);
       box-sizing: border-box;
    }
    span{
      font-size: px2rem(18);
      margin: px2rem(10);
    
    
    }
    }
    
    // 进度&加载提示
    .progresstip-wraper {
      flex: 0 0 px2rem(10);
      box-sizing:border-box;
      color: #333;
      text-align: center;
      font-size: px2rem(10);
       margin: px2rem(2) 0;
     
    }

    // 修饰样式 不重要
    background-color: white;
  }
// .capture{
 
//      // 任何屏幕情况下宽度都是100%，但是高度自适应
//     width: 100vw;
//     height: 100vh;
//     // 需要在页面下方 设置浮动 影响到父元素动画在chorme和safiry移动端 卡顿没有动画  capture元素默认显示挡住了？
//     position: absolute;
//     left: 0;
//     bottom: 0;

//     z-index: 20;
//     box-sizing: border-box;

    .mask{
      position: absolute;

      bottom: 0;

      z-index: 21;
      width: 100%;
      height: 100vh;
      background: rgba(51, 51, 51, 80%);
    }
    .capture-wraper{
      overflow: auto;
    width: 210px;
    // height: 100vh;
    position: absolute;
      
     bottom: 0;

    z-index: 22;
    box-sizing: border-box;
   
    background-color: white;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    // flex-wrap: wrap;

    li{
      // 没有分数 禁止缩进 内容决定主轴宽高
      flex:0 0 0;
      // 样式
      border-bottom: px2rem(1) solid rgb(244, 244, 244);
      box-sizing: border-box;
      padding: px2rem(5);
      margin: px2rem(12) 0;
      width: 85%;
      // height: px2rem(60);
      font-size: px2rem(15);
      list-style: none;
      cursor: pointer;
    }
    }
   
// }

}
</style>