<template>
  <div id="read" ref="read">
    
    <div id="read1" ></div>
    
  </div>

</template>

<script>
import {mapActions, mapState} from 'vuex'
import Epub from 'epubjs'
// 挂载到顶层对象，通过es6的关键字global就可以访问当前顶层对象，此处通过global关键字挂载到顶层对象。epub需要挂载到
global.epub=Epub;

export default {
name:'Bookreader',
data() {
  return {
    nginxBaseUrl:'http://192.168.3.70:8081/',
    book:{}
  }
},
computed:{
  ...mapState('book',['filename'])
},
methods: {
  
  ...mapActions('book',['setfilename','setistitleandmenushow']),

  // 翻页功能具体实现 上翻 下翻 显示控制menu
prevPage(){
if(this.rendition) {
console.log('翻页成功1');
  this.rendition.prev()
}
},
nextPage(){
  if(this.rendition) {
    console.log('翻页成功2');

    this.rendition.next()
  }

},
toggleTitleAndMenu(){
this.setistitleandmenushow()
},  
    init(){
    
// epubjs解析渲染函数
// 1拼接完整的nginxresouceurl字符串 电子书url
    // 使用replace方法就要保证传过来的字符串不会有第二个|字符,所以|就是唯一标识符
    let temp=`${this.nginxBaseUrl}epub/${this.filename.replace('|','/')}.epub`;
// 2epub依据电子书路径实例化一个book对象
    this.book=new Epub(temp,{
      openAs:'epub'
    });
// 3开始渲染 book的renderto方法生成显然对象rendition  并配置翻页动画字段
    this.rendition=this.book.renderTo('read1',{
      // 指定宽高
      width:innerWidth,
      htight:innerHeight,
      // 微信兼容
      method:"default",

      // 翻页动画字段
      flow:"paginated",
      manager:"continuous",
      snap:true
    });
    
      // 4显示
    this.book.ready.then(()=>{
      this.rendition.display();
      this.bookReady=true;
    })
 
    
// 手势翻页功能
// 1提取用户手势关键信息 滑动时间 滑动距离
  // rendition渲染对象提供了移动端的这两个事件 按下抬起事件 其中包含了该事件的 手指数组 间隔时间等属性，因为渲染出的是独立页面的文档 使用epubapi
  // 注册事件
    this.rendition.on('touchstart',(event)=>{
     
      this.touchStartX=event.changedTouches[0].clientX
      this.touchStartTime=event.timeStamp
    })
    this.rendition.on('touchend',(event)=>{
      const offsetX=event.changedTouches[0].clientX-this.touchStartX;
      const time =event.timeStamp-this.touchStartTime;
    // 2指定基于信息的处理逻辑分支  制定了动画 翻页逻辑epub管理
    // if(time < 500 && offsetX > 50){
    //   console.log(1);
    //   this.prevPage()
    // }else if(time < 500 && offsetX < -50) {
    //    console.log(2);
    //   this.nextPage()
  
    //   }
      // else{
      //    console.log(3);
      //      this.toggleTitleAndMenu()
      //    }

// 如果移动距离为0 那么就执行菜单栏的显示隐藏. name按下去时间很长该不该显示那？-不显示 不符合操作直觉 限定时间为290
    if(offsetX===0 && time < 290)this.toggleTitleAndMenu()

    // event.preventDefault();
    // event.stopPropagation();
    
    })
 
    

},
},
mounted(){
  
  this.setfilename(this.$route.params.filename).then(res=>{
    // 数据处理规则很可能也是异步的 所以这里设计成可以链式调用
    this.init();
  });

}
}
</script>

<style>
#read1{
position: relative;
}


</style>