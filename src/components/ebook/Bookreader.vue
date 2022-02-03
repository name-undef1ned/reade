<template>
  <div id="read" ref="read">
    <div id="read1" wraper="_"></div>
    <loading
      v-if="isshowwindowchangetip"
      :right="'12%'"
      :top="'10%'"
      :color="'black'"
      :backgroundColor="'rgba(135, 206, 235, 100%)'"
      :message="'检测到窗口变化,正在重新加载图书...'"
    >
    </loading>
  </div>
</template>

<script>
import Epub from "epubjs";
import mixin from "../../utils/mixin";
import { mapState, mapMutations } from "vuex";
import {
  setfontfamily,
  getfontfamily,
  getfontsize,
  setfontsize,
  gettheme,
  settheme,
  getlocationcfi,
} from "../../utils/localstorage";
// 引入通知组件
import loading from "../../components/ebook/Notice/loading.vue";
// console.log(process.env.VUE_APP_PREVIEW,process.env.NODE_ENV,process);

// 挂载到顶层对象，通过es6的关键字global就可以访问当前顶层对象，此处通过global关键字挂载到顶层对象。epub需要挂载到
global.epub = Epub;

const vm = {
  name: "Bookreader",
  mixins: [mixin],
  components: {
    loading,
  },
  data() {
    return {
      nginxBaseUrl: "http://192.168.3.70:8081/",
      // nginxBaseUrl:'http://172.20.10.2:8081/',
      book: {},
      cursorefn: {},
      isshowwindowchangetip: false,
      hasdisplay: false,
    
    };
  },
  computed: {
    ...mapState("book", ["value1"]),
  },
  methods: {
    ...mapMutations("book", ["SETCOVERURL", "SETBOOKMETADATA"]),
    // 主题功能-注册
    registerTheme() {
      this.themeslist.forEach((ele) => {
        this.rendition.themes.register(ele.name, ele.style);
      });
    },

    // 翻页功能具体实现 上翻 下翻 显示控制menu
    prevPage() {
      if (this.rendition) {
        this.rendition.prev();
      }
    },
    nextPage() {
      if (this.rendition) {
        this.rendition.next();
      }
    },
    toggleTitleAndMenu() {
      if (this.$store.state.book.isshowFontfamily) {
        this.setisshowFontfamily(false);
      } else {
        this.setistitleandmenushow();
      }
    },

    windowchange() {
      let timer;
      let _that = this;
      //  监听视窗变化重新渲染图书  防抖处理
      window.addEventListener("resize", function () {
        this.isshowwindowchangetip = true;
        if (timer) {
          clearTimeout(timer);
        }
        // 窗口变化触发提示
        _that.isshowwindowchangetip = true;
        timer = setTimeout(function () {
          //  调用resize方法
          let parentwidth = document.querySelector("#read").clientWidth;
          let parentheight = document.querySelector("#read").clientHeight;

          _that.rendition.resize(`${parentwidth}`, `${parentheight}`);
          //   //  从新渲染结束 关闭提示
          setTimeout(() => {
            _that.isshowwindowchangetip = false;
          }, 1100);
        }, 1000);
      });
    },
    IsPC() {
      var userAgentInfo = navigator.userAgent;
      var Agents = [
        "Android",
        "iPhone",
        "SymbianOS",
        "Windows Phone",
        "iPad",
        "iPod",
      ];
      var flag = true;
      for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
          flag = false;
          break;
        }
      }
      return flag;
    },
    initfontsize() {
      // 在此处进行 初始化时存入缓存 设置字体大小样式
      let fontsize = getfontsize(this.filename);
      if (!fontsize) {
        setfontsize(this.filename, 18);
      } else {
        this.rendition.themes.fontSize(fontsize + "px");
        this.$store.commit("book/SETFONTSIZE", fontsize);
      }
    },
    initfontfamily() {
      // 在此处进行 初始化时存入缓存 设置字体主题样式
      let fontfamily = getfontfamily(this.filename);
      if (!fontfamily) {
        setfontfamily(this.filename, "Default");
      } else {
        this.rendition.themes.font(fontfamily);
        this.$store.commit("book/setfontfamilyselected", fontfamily);
      }
    },
    inittheme() {
      // 在此处进行 初始化时存入缓存 设置主题样式
      let theme = gettheme(this.filename);
      if (!theme) {
        console.log("默认分支");
        settheme(this.filename, "默认");
      } else {
        this.$store.commit("book/SETTHEME", theme);
      }
    },
    // 设定书签功能下拉的偏移量
    setbookoffsetY(){
      this.rendition.on('touchmove',e=>{
        this.HASTOUCHUP(false)
      // 这一次减去上一次的就是偏移量
      if(this.firstoffsety){
        // 存在就是第二次 采用screen属性 clienty不会一直递增在这个程序逻辑，采用整数运算
        this.SETOFFSETY(parseInt(e.changedTouches[0].screenY)-parseInt(this.firstoffsety));
      }else{
        // 不存在就是第一次，存储到实例对象
        this.firstoffsety=e.changedTouches[0].screenY;
      }
      // e.preventDefault();
      e.stopPropagation();
      // console.log(this.firstoffsety,e.changedTouches[0].clientY);
      })
      this.rendition.on('touchend',()=>{
        this.HASTOUCHUP(true)
        // 重置之前记录这一次的下拉量
        console.log(this.offsetY);
        this.SETLASTOFFSETY(this.offsetY)
        // 每一次下拉动作结束清空数据 为下一次下拉做准备
        this.SETOFFSETY(0);
        this.firstoffsety=null;
      })
    },
    // 获取图书的基本元数据（出版社作者..）以及封面url方法
    parsebook() {
      this.book.loaded.cover.then((cover) => {
        this.book.archive.createUrl(cover).then((url) => {
          this.SETCOVERURL(url);
        });
      });
      this.book.loaded.metadata.then((metadata) => {
        this.SETBOOKMETADATA(metadata);
      });
    },
    initbook() {
      // epubjs解析函数
      // 1拼接完整的nginxresouceurl字符串 电子书url
      // 使用replace方法就要保证传过来的字符串不会有第二个|字符,所以|就是唯一标识符
      let temp = `${this.nginxBaseUrl}epub/${this.filename.replace(
        "|",
        "/"
      )}.epub`;
      // 2epub依据电子书路径实例化一个book对象
      this.book = new Epub(temp, {
        openAs: "epub",
      });
    },
    initrendition() {
      // resize方法覆盖原有逻辑
      // 每次窗口变化重新渲染功能-执行之前先销毁以前的
      // document.querySelector('#read1').remove();
      // let newread = document.createElement("div");
      // newread.id = "read1";
      // newread.classList+='wh'
      // newread.style.width='100%';
      // newread.style.height='100%';
      // newread.setAttribute("wraper", "_");
      // read.appendChild(newread);

      // let readarr = document.querySelectorAll("div[wraper]");
      // readarr[0].remove();

      // 3开始渲染 book的renderto方法生成显然对象rendition  并配置翻页动画字段
      //  选择屏幕宽度常量 如使用innerwidth页面可视区域edge firfox会有问题-一开始的值很大大到会双页显示.能否挑出这两个浏览器编程正常的节点赋值？
      const screenwidth = screen.width;
      // 谷歌内核即chorme safiry的横屏screenwidth属性不会变化，edge firefox内核对于innerwidth初始化值过大
      // 故而采用兼容性好一点的vw-但是又会影响到章节组件高度
      // 最终思路 width只接受number 所以采用动态获取父元素的宽度并赋值 图书渲染页面都没有问题了
      const parentwidth = this.$refs.read.clientWidth;
      this.rendition = this.book.renderTo("read1", {
        // 指定宽高
        width: parentwidth,
        height: innerHeight,
        // 微信safiry兼容 height写错了导致safiry渲染不出...
        method: "default",
        restore: true,
        // 翻页动画字段
        flow: "paginated",
        manager: "continuous",
        snap: true,
      });
      // 将rendition存入vuex
      this.setrendition(this.rendition);
      // 将book存入vuex
      this.$store.commit("book/SETBOOK", this.book);
      // 4显示&目录舔砖 调用reandy钩子 如果book生成就返回正确promise
      this.book.ready
        .then(() => {
          let _that = this;
          // 重新渲染完毕 关闭提示
          // this.isshowwindowchangetip = false;
          if (getlocationcfi(this.filename)) {
            this.rendition
              .display(getlocationcfi(this.filename))
              .then(function () {
                _that.initfontfamily();
                _that.initfontsize();
              });
          } else {
            this.rendition.display().then(function () {
              _that.initfontfamily();
              _that.initfontsize();
            });
          }

          //  拿到导航对象 传递给vuex
          this.navigation = this.book.navigation;
          this.setnavigation(this.book.navigation);
         

          // 生成书籍的位置数据 但是很慢   简单的分页逻辑 根据字体大小窗口大小决定一页显示多少字数 有多少页,生成的进度数组每一页都有一个cfi
          return this.book.locations.generate(
            750 * (window.innerWidth / 375) * (getfontsize(this.filename) / 16)
          );
        })
        .then((res) => {
          if (getlocationcfi(this.filename)) {
            this.rendition.display(getlocationcfi(this.filename)).then(() => {
              // 更新section 更新进度条
              this.setnowsection();
            });
          }
          // 位置数据生成后将章节信息当前章节等共享数据存储在vuex 进度条才可用
          this.setisbookprogressready();

          this.SETBOOKSECTIONS(this.flatten(this.book.navigation.toc));

          // this.SETBOOKSECTIONS(this.book.navigation.get());
        
          // this.SETNOWSECTION(this.book.navigation.get()[this.section]);
          // this.setnowsection()
        }).then(()=>{
            // 初始化存储当前章节信息
          // this.SETNOWSECTION(this.booksections[this.book.rendition.currentLocation().end.index]);
          // console.log(this.booksections,this.book.rendition.currentLocation().end.index);
          this.SETNOWSECTION(this.booksections[this.book.rendition.currentLocation().end.index]);
        })

      // 判断是移动端还是pc端"pc->单击左侧上一页 右侧下一页 中间切换显示，移动端->翻页由epub控制 点击不滑动切换
      if (this.IsPC()) {
        //  30 40 30    100
        // 单击不同位置翻页 隐藏显菜单栏功能
        this.rendition.on("click", (e) => {
          //  使用screenxx 相对于物理宽度 判断 pagex 是相对doucument 但是iframe的document很长 clientx
          if (e.screenX / window.innerWidth < 0.35) {
            this.prevPage();
          } else if (e.screenX / window.innerWidth > 0.65) {
            this.nextPage();
          } else {
            this.toggleTitleAndMenu();
          }
        });
      } else {
        this.rendition.on("touchstart", (event) => {
          this.touchStartX = event.changedTouches[0].clientX;
          this.touchStartTime = event.timeStamp;
        });
        this.rendition.on("touchend", (event) => {
          const offsetX = event.changedTouches[0].clientX - this.touchStartX;
          const time = event.timeStamp - this.touchStartTime;
          if (offsetX === 0 && time < 290) this.toggleTitleAndMenu();
        });
      }

      // 测试resize事件
      // this.rendition.resize('100','100')
      // 注册字体样式 样式表
      this.rendition.hooks.content.register((contents) => {
        // 只能是url路径 不可以是地址
        contents.addStylesheet(
          "https://fonts.googleapis.com/css2?family=Liu+Jian+Mao+Cao&family=Ma+Shan+Zheng&family=Oooh+Baby&family=Pushster&family=Ubuntu+Mono:wght@700&family=ZCOOL+KuaiLe&family=ZCOOL+QingKe+HuangYou&family=Zhi+Mang+Xing&display=swap.css"
        );
      });

      //  每次窗口变化在设置下主题，因为watch检测不到不会触发改变主题回调
      this.settheme();
      // 直接使用Promise类reslove 不用生成实例
      return Promise.resolve("成功返回");
    },
    // 页面读写主题名 主要是vuex的通信
    settheme() {
      // epub最终应用主题的api 要在注册后
      //  this.rendition.themes.select(this.selecttheme) 该api产生主题切换几次后失效的bug
      // bugfix
      //  const bodyObject = this.themeList[index].style.body
      const bodyarr = this.themeslist.filter((item) => {
        return item.name === this.selecttheme;
      });
      const bodyobj = bodyarr[0].style.body;

      for (let key in bodyobj) {
        this.rendition.themes.override(key, bodyobj[key], true);
      }
      // bugfix

      //  并对应修改主题vuex的title
      this.$store.dispatch("book/setselected", this.selecttheme);
    },
    // 全局主题设置方法
    setglobalstyle(theme) {
      // 获取head标签
      const head = document.querySelector("head");
      console.log(head);

      // 初始化删除以前添加的link逻辑...
      if (head.querySelector("link[data-style]"))
        head.querySelector("link[data-style]").remove();

      // 生成link标签
      const link = document.createElement("link");
      // 添加用于判断的自定义属性
      link.setAttribute("data-style", "css");
      link.setAttribute("type", "text/css");
      link.setAttribute("rel", "stylesheet");
      switch (theme) {
        case "默认":
          link.setAttribute(
            "href",
            `${this.nginxBaseUrl}globalstyle/default.css`
          );
          break;
        case "护眼":
          link.setAttribute("href", `${this.nginxBaseUrl}globalstyle/eye.css`);
          break;
        case "竹青":
          link.setAttribute(
            "href",
            `${this.nginxBaseUrl}globalstyle/green.css`
          );
          break;
        case "夜间":
          link.setAttribute(
            "href",
            `${this.nginxBaseUrl}globalstyle/night.css`
          );
          break;
      }
      head.appendChild(link);
    },
    // 设置进度方法
    // progresschange(progress) {
    //   const percentage = progress / 100;
    //   const location =
    //     percentage > 0 ? this.locations.cfiFromPercentage(percentage) : 0;
    //   this.rendition.display(location);
    // },
  },

  beforeMount() {},
  updated() {
    console.log("updated");
  },
  async mounted() {
    // 该事件向实例添加了book rendition大小 为异步的，下面同步代码访问不到 -需要保证同步执行  所以那这个函数放在beforemount钩子中-不行 beforemount不能提升他的优先级
    // 只不过是在较早的before时机把这个异步函数放在callbackstack中。在callstack中他还是在最后面  只能让init返回promise或者
    // 在mounted写async await语法 同步语法去执行异步代码. 注意点1async await必须在一个钩子函数中2await跟promise
    await this.setfilename(this.$route.params.filename).then((res) => {
      // 数据处理规则很可能也是异步的 所以这里设计成可以链式调用
      this.initbook();
      this.initrendition();
      //  样式背景色功能-注册函数调用
      this.registerTheme();
      this.parsebook();
    }).then(()=>{
      // 调用书签功能的手势方法
      this.setbookoffsetY();
    })

    // 字体大小功能监听兄弟组件设置的fontsize变化做出对应字号设置
    this.$watch(
      function () {
        return this.bookFontSize;
      },
      function (newv) {
        // themes下的api
        this.rendition.themes.fontSize(newv + "px");
      }
    );

    // 主题初始化前检查一下localstorage
    this.inittheme();
    //  用户选择或者本地存储的selecttheme变化时应用主题和对应title类名
    this.$watch(
      function () {
        return this.selecttheme;
      },
      function (newv) {
        // 同时存入localstorage
        settheme(this.filename, newv);
        // 阅读器iframe主题生效
        this.settheme();
        // 全局主题生效
        this.setglobalstyle(newv);
      },
      {
        // 初始化 主题生效
        immediate: true,
      }
    );

    this.windowchange();
 
  },
  watch: {},
};
export default vm;
</script>

<style lang="scss" scoped>
@import "../../assets/styles/global.scss";

#read1 {
  position: relative;
}
.bookwraper {
  width: 100%;
  height: 100%;
}
#read {
  position: relative;
  width: 100vw;
  height: 100vh;
  // @include center;
  
}

.span1 {
  width: px2rem(280);
  // height: px2rem(50);
  display: block;
  margin: 0 auto;
  position: absolute;
  top: px2rem(60);
  // left: 50%;
  z-index: 9;
  text-align: center;
  background: white;
  color: black;
  text-align: center;
  font-size: px2rem(15);
  box-shadow: px2rem(0) px2rem(0) px2rem(6) px2rem(0) rgba(0, 0, 0, 10%);
  border-radius: 5px;
  font-family: "Ubuntu Mono", monospace;
  // background: rgba(135, 206, 235, 10%);
}
</style>