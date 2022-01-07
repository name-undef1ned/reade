<template>
  <div id="read" ref="read">
    <div id="read1" wraper="_"></div>
    <span v-if="isshowwindowchangetip" class="span1"
      >检测到窗口变化,正在重新加载图书...</span
    >
  </div>
</template>

<script>
import Epub from "epubjs";
import mixin from '../../utils/mixin'
import {setfontfamily,getfontfamily,getfontsize,setfontsize,gettheme,settheme} from '../../utils/localstorage'

  // console.log(process.env.VUE_APP_PREVIEW,process.env.NODE_ENV,process);

// 挂载到顶层对象，通过es6的关键字global就可以访问当前顶层对象，此处通过global关键字挂载到顶层对象。epub需要挂载到
global.epub = Epub;

const vm = {
  name: "Bookreader",
  mixins:[mixin],
  data() {
    return {
      nginxBaseUrl: "http://192.168.3.70:8081/",
      // nginxBaseUrl:'http://172.20.10.2:8081/',
      book: {},
      cursorefn: {},
      isshowwindowchangetip: false,
    };
  },
  computed: {
  
  },
  methods: {
   
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
      if( this.$store.state.book.isshowFontfamily){
         this.setisshowFontfamily(false)
      }else{
        this.setistitleandmenushow();
      }
     
    },
    jumpto(href) {
      this.rendition.display(href);
            this.setistitleandmenushow();

    },
    // },  除去初始化的窗口变化-重新渲染  残余bug--再次渲染后阅读进度丢失
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
         

          _that.initrendition().then((res) => {
            //  从新渲染结束 关闭提示
            _that.isshowwindowchangetip = false;
          });
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
    initfontsize(){
// 在此处进行 初始化时存入缓存 设置字体大小样式
            let fontsize=getfontsize(this.filename);
            if(!fontsize){
              setfontsize(this.filename,18)
            }else{
                this.rendition.themes.fontSize(fontsize + "px");
              this.$store.commit('book/SETFONTSIZE',fontsize)
            }
    },
    initfontfamily(){
       // 在此处进行 初始化时存入缓存 设置字体主题样式
            let fontfamily=getfontfamily(this.filename);
            if(!fontfamily){
              setfontfamily(this.filename,'Default')
            }else{
              this.rendition.themes.font(fontfamily)
              this.$store.commit('book/setfontfamilyselected',fontfamily)
            }
    },
    inittheme(){
      // 在此处进行 初始化时存入缓存 设置主题样式
           let theme=gettheme(this.filename);
           if(!theme){
             console.log('默认分支');
             settheme(this.filename,'默认')
           }else{
             
             this.$store.commit('book/SETTHEME',theme)
           }

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
      // 每次窗口变化重新渲染功能-执行之前先销毁以前的
      // document.querySelector('#read1').remove();
      let newread = document.createElement("div");
      newread.id = "read1";
      newread.setAttribute("wraper", "_");
      read.appendChild(newread);

      let readarr = document.querySelectorAll("div[wraper]");
      readarr[0].remove();

      // 3开始渲染 book的renderto方法生成显然对象rendition  并配置翻页动画字段
      this.rendition = this.book.renderTo("read1", {
        // 指定宽高
        width: innerWidth,
        height: innerHeight,
        // 微信safiry兼容 height写错了导致safiry渲染不出...
        method: "default",
        restore: true,
        // 翻页动画字段
        flow: "paginated",
        manager: "continuous",
        snap: true,
      });
      this.setrendition( this.rendition)
      // 4显示&目录舔砖 调用reandy钩子 如果book生成就返回正确promise
      this.book.ready
        .then(() => {
          let _that=this;
          // 重新渲染完毕 关闭提示
          this.isshowwindowchangetip = false;
          this.rendition.display().then(function(){
           
            _that.initfontfamily();
            _that.initfontsize();
           
          })
        
          //  拿到导航对象 传递给vuex
          this.navigation = this.book.navigation;
          this.setnavigation(this.book.navigation)
          // 生成目录信息 但是很慢
          return this.book.locations.generate();
        })
        .then((res) => {
          this.setisbookprogressready();
          this.locations = this.book.locations;
          let ClosureFn = function (newv) {
            this.progresschange(newv);
          };
          // watch回到若想访问到generate()生成的目录res 就必须把回到定义在外部。形成闭包 通过保存的作用域链才能访问到
          this.$watch(function () {
            return this.pgspercent;
          }, ClosureFn);
        });


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


    // 注册字体样式 样式表
    this.rendition.hooks.content.register(contents=>{
      // 只能是url路径 不可以是地址
      contents.addStylesheet("https://fonts.googleapis.com/css2?family=Liu+Jian+Mao+Cao&family=Ma+Shan+Zheng&family=Oooh+Baby&family=Pushster&family=Ubuntu+Mono:wght@700&family=ZCOOL+KuaiLe&family=ZCOOL+QingKe+HuangYou&family=Zhi+Mang+Xing&display=swap.css")
    })
    
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
    setglobalstyle(theme){
      // 获取head标签
      const head=document.querySelector('head');
      console.log(head);

      // 初始化删除以前添加的link逻辑...
      if(head.querySelector('link[data-style]'))head.querySelector('link[data-style]').remove();

      // 生成link标签
      const link = document.createElement('link');
      // 添加用于判断的自定义属性
      link.setAttribute('data-style','css');
      link.setAttribute('type','text/css');
      link.setAttribute('rel','stylesheet');
      switch(theme){
        case'默认':
        link.setAttribute('href',`${this.nginxBaseUrl}globalstyle/default.css`);
        break;
        case'护眼':
        link.setAttribute('href',`${this.nginxBaseUrl}globalstyle/eye.css`);
        break;
        case'竹青':
        link.setAttribute('href',`${this.nginxBaseUrl}globalstyle/green.css`);
        break;
        case'夜间':
        link.setAttribute('href',`${this.nginxBaseUrl}globalstyle/night.css`);
        break;
      }
      head.appendChild(link)
      


    },
    // 设置进度方法
    progresschange(progress) {
      const percentage = progress / 100;
      const location =
        percentage > 0 ? this.locations.cfiFromPercentage(percentage) : 0;
      this.rendition.display(location);
    },
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
    });

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
      settheme(this.filename,newv)
      // 阅读器iframe主题生效
        this.settheme();
        // 全局主题生效
        this.setglobalstyle(newv)
      },
      {
        // 初始化 主题生效
        immediate: true,
      }
    );

    // 监听vuex的目录数据变化
    this.$watch(function(){
      return this.capturehref
    },function(newv){
      this.jumpto(newv)
    })

    this.windowchange();

   
    
  },
  watch: {
    
  },
};
export default vm;
</script>

<style lang="scss" scoped>
@import "../../assets/styles/global.scss";
#read1 {
  position: relative;
}
#read {
  @include center;
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
}
</style>