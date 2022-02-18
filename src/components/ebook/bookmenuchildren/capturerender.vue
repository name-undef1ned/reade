<template>
  <div class="li-wraper">
            <li
              v-for="(item, index) in arr"
              :key="index+item.label"
              
              :class="{'level1':item.level==1,'level2':item.level==2,'level3':item.level==3}"
              @click.stop="jumpandhide(item.href)"
            >
              <div class="li-mes-wraper">
              <span :class="{'nowsectioncolor':item.href==$store.state.book.nowsection.href}">{{ item.label }}</span>
              <span class="iconfont icon-back" v-if="item.subitems[0]" @click.stop="isshowson"></span>
              </div>
                    <div class="son" v-if="item.subitems[0]">
                        <capturerender :arr="item.subitems" :allowdisplay="allowdisplay"></capturerender>
                    </div>
            </li>
          </div>
</template>

<script>
import mixin from "../../../utils/mixin";
import { mapState } from "vuex";

export default {
name:'capturerender',
props:{
  arr:Array,
   allowdisplay:{
     type:Boolean,
     default:true
   }
},
mixins: [mixin],
computed:{
    ...mapState("book", ["navigation", "book"]),

},
methods: {
    isshowson(e){
       const son=e.target.parentNode.nextSibling;
      //获取没有子级目录的高度
      const fatherli=son.parentNode;
      const nosonliheight=fatherli.offsetHeight-son.offsetHeight;
      // 获取有子级目录高度
    //  const sonheight=son.firstChild.childElementCount * nosonliheight;
    const sonheight=son.firstChild.offsetHeight;
    
    //  根据高度动态设置过渡时间 在各种高度下让动画曲线一致.1兼容各高度思路 在过渡前统一变成700 以这个高度值进行过度动画 因为是瞬间变化 用户是感知不到的
    // 2过渡时间的计算-假设400的高度 0.5的过渡时间下的动画速率曲线是平滑的-那么之歌速度值就是800. 800除以700就是700高度下的过渡时间即0.875s 
    
     if(sonheight<700){ 
       son.style.transition="max-height 0.5s cubic-bezier(0.39, 0.58, 0.57, 1)";
       }else if(sonheight>700){
        son.style.maxHeight='700px'
         son.style.transition="max-height 0.875s cubic-bezier(0.39, 0.58, 0.57, 1)";
       }
  
         //将这个高度赋值给maxheight 让他们的height和maxheight高度变化曲线尽可能一致.这两个值尽可能缩小差 曲线就会越平滑
     if(son.clientHeight==0){
       e.target.classList="iconfont icon-back"
       son.style.maxHeight=`${sonheight}px`

     }else{
       e.target.classList="iconfont icon-down"
       son.style.maxHeight='0px'

     }
   
    },
    jumpandhide(href){
      if(this.allowdisplay==false){return}
 this.$store.state.book.rendition.display(href).then(() => {
        // 更新当前章节信息
        // console.log(this);
        this.setnowsection();
      });

      this.setistitleandmenushow();
      //   隐藏通知父组件更改状态数据
      this.$bus.$emit("capturehide");
    }
},

}
</script>

<style lang="scss" scoped>
@import '../../../assets/styles/global.scss';
.son{
  // 数值与元素的height太大 出现时就会有延迟。
  max-height: 2000px;
  overflow: auto;
  // 采用平均曲线
  // transition:max-height 0.5s cubic-bezier(0.39, 0.58, 0.57, 1);

  will-change: max-height;
}

.nowsectioncolor{
  color: cornflowerblue;

}
.level1{
  padding-left: px2rem(5)!important;
  .li-mes-wraper{
    margin:px2rem(5) 0;
  }
}
.level2{
  padding-left: px2rem(10)!important;
  margin: 0 0!important;
}
.level3{
  padding-left: px2rem(26)!important;
   margin: 0 0!important;


}
      .li-wraper {
        width: 100%;
        li {
          position: relative;
          border-bottom: px2rem(1) solid rgba(83, 107, 107, 0.2);
          box-sizing: border-box;
          padding: px2rem(12) 0;
          width: 85%;
          margin: 0 auto;
          // height: px2rem(60);
          font-size: px2rem(15);
          list-style: none;
          cursor: pointer;

          overflow: hidden;
          text-overflow: ellipsis;
          white-space: normal;

          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          //   align-items: center;
          .li-mes-wraper{
            display: flex;
            justify-content: space-between;
            
            .icon-down{
              display: inline-block;
              height: 100%;
              
            }
          }

        }
      }
</style>