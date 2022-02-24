<template>
  <transition name="menu">
    <div class="panel-wraper" v-show="iseditmode">
      <div
        class="span-wraper"
        :class="{ isselectedall: isselectAll }"
        @click="selectAll"
      >
        <span class="iconfont icon--_quanxuan"></span>
        <span>全选</span>
      </div>
      <div class="span-wraper" @click="unselectAll">
        <!-- :class="{'isselectedall':shelfselected.length==0}" -->
        <span class="iconfont icon-quanbuxuan"></span>
        <span>全不选</span>
      </div>
      <div class="span-wraper" @click="categorymove">
        <span class="iconfont icon-move"></span>
        <span>移动到...</span>
      </div>
      <div class="span-wraper" @click="bookmove">
        <span class="iconfont icon-shelf"></span>
        <span>移出书架</span>
      </div>
    </div>
  </transition>
</template>

<script>
import { storeshelfmixin } from "../../../utils/mixin";
export default {
  mixins: [storeshelfmixin],
  name: "shelflistpanel",
  data() {
    return {
      isselectAll: false,
    };
  },
  watch: {
    shelfselected: {
      immediate: true,
      deep: true,
      handler() {
            if(this.currentpage=='shelf'){

        let num = 0;
        this.shelflist.forEach((item) => {
          if (item.type == 1) {
            num++;
          } else {
            return;
          }
        });
        num == 0
          ? (this.isselectAll = false)
          : num == this.shelfselected.length
          ? (this.isselectAll = true)
          : (this.isselectAll = false);
            }else{
                    this.shelflist.forEach((item) => {
                    if (
                      item.type == 2 &&
                      item.title==this.currentcategory
                    ) {
                      // 开始勾选
                      item.itemList.length==this.shelfselected.length&&this.shelfselected.length!=0?(this.isselectAll = true): (this.isselectAll = false);
                    } else {
                      return;
                    }
      });
            }
      },
    },
  },
  computed:{
    categorytitlelist(){
      const temparr=[]
      this.shelflist.forEach(i=>{
        i.type==2?temparr.push(i.title):' '
      })
      return temparr
    }
  },
  methods: {
    categorymove(){
      if (this.shelfselected[0]) {
      this.shelfdialog({list:this.categorytitlelist}).show()
      }else{
      this.toast({ text: "勾选书籍才能设置分类哦!" }).show();
      }
    },
    confirmcategorymove(categorytitle){
       if(this.currentpage=='shelf'){
        //  从书架将书籍移入分类
         this.toast({
        text:
          "已将" +
          (this.shelfselected[1]
            ? `您选中的共计<span class="shelfsearch-tip-toast">${this.shelfselected.length}</span>本书成功移至<span class="shelfsearch-tip-toast">${categorytitle}</span>分类!`
            : `您选中的<span class="shelfsearch-tip-toast">${this.shelfselected[0]}</span>成功移至<span class="shelfsearch-tip-toast">${categorytitle}</span>分类!`),
      }).show();
        this.SETSHELFLIST({type:'shelfconfirmcategorymove',text:categorytitle})
        }else{
        //  从分类将书籍移入分类
        if(this.currentcategory!==categorytitle){
           this.toast({
          text:
          "已将" +
          (this.shelfselected[1]
            ? `您选中的共计<span class="shelfsearch-tip-toast">${this.shelfselected.length}</span>本书成功移至<span class="shelfsearch-tip-toast">${categorytitle}</span>分类!`
            : `您选中的<span class="shelfsearch-tip-toast">${this.shelfselected[0]}</span>成功移至<span class="shelfsearch-tip-toast">${categorytitle}</span>分类!`),
          }).show();
          this.SETSHELFLIST({type:'categoryconfirmcategorymove',text:categorytitle})
        }else{
        this.toast({ text: "不能移入当前分类哦" }).show();
        }
      }
    },
    confirmcreatecategory(newcategorytitle){
      if(this.categorytitlelist.indexOf(newcategorytitle)<0){
         if(this.currentpage=='shelf'){
        //  从书架将书籍移入新建分类
     
        this.toast({
          text:
          "已将" +
          (this.shelfselected[1]
            ? `您选中的共计<span class="shelfsearch-tip-toast">${this.shelfselected.length}</span>本书成功移至<span class="shelfsearch-tip-toast">${newcategorytitle}</span>新建分类!`
            : `您选中的<span class="shelfsearch-tip-toast">${this.shelfselected[0]}</span>成功移至<span class="shelfsearch-tip-toast">${newcategorytitle}</span>新建分类!`),
          }).show();
        this.SETSHELFLIST({type:'shelfconfirmcreatecategory',text:newcategorytitle})
        }else{
        //  从分类将书籍移入新建分类
        this.toast({
          text:
          "已将" +
          (this.shelfselected[1]
            ? `您选中的共计<span class="shelfsearch-tip-toast">${this.shelfselected.length}</span>本书成功移至<span class="shelfsearch-tip-toast">${newcategorytitle}</span>新建分类!`
            : `您选中的<span class="shelfsearch-tip-toast">${this.shelfselected[0]}</span>成功移至<span class="shelfsearch-tip-toast">${newcategorytitle}</span>新建分类!`),
          }).show();
        this.SETSHELFLIST({type:'categoryconfirmcreatecategory',text:newcategorytitle})
        }
      }else{
        this.toast({ text: "您已创建相同分类！请更换分类名称..." }).show();
      }
    },
    confirmmoveoutcategory(){
      // 从分类将书籍移回书架
       this.toast({
          text:
          "已将" +
          (this.shelfselected[1]
            ? `您选中的共计<span class="shelfsearch-tip-toast">${this.shelfselected.length}</span>本书成功移至书架!`
            : `您选中的<span class="shelfsearch-tip-toast">${this.shelfselected[0]}</span>成功移至书架`),
          }).show();
    this.SETSHELFLIST({type:'confirmmoveoutcategory'})
    },
    bookmove() {
      if (this.shelfselected[0]) {
        this.popup({
          title: this.shelfselected[1]
            ? `将所选共<span class="shelfpanel-popup-props-html">${this.shelfselected.length}</span>本书移出书架吗?`
            : `将所选书籍<span class="shelfpanel-popup-props-html">${this.shelfselected[0]}</span>移出书架吗?`,
          confirmText: "确认",
          isRemoveText: true,
          cancelText: "取消",
          confirmEvenName: "shelfpanelbookconfirmremove",
        }).show();
      } else {
        this.toast({ text: "勾选书籍才能移出书架哦!" }).show();
      }
    },
    // 得到对话框的确认，开始删除
    bookconfirmremove() {
      // 删除-start
      if(this.currentpage=='shelf'){
      this.toast({
        text:
          "已将" +
          (this.shelfselected[1]
            ? `您选中的共计<span class="shelfsearch-tip-toast">${this.shelfselected.length}</span>本书成功移出书架!`
            : `您选中的<span class="shelfsearch-tip-toast">${this.shelfselected[0]}</span>成功移出书架!`),
      }).show();
        this.SETSHELFLIST({type:'shelfdel'})
      }else{
      this.toast({
        text:
          "已将" +
          (this.shelfselected[1]
            ? `您选中的共计<span class="shelfsearch-tip-toast">${this.shelfselected.length}</span>本书成功移出书架!`
            : `您选中的<span class="shelfsearch-tip-toast">${this.shelfselected[0]}</span>成功移出书架!`),
          }).show();
        this.SETSHELFLIST({type:'categorydel'})
      
           
      }
      // 删除-end
    },
    // 全选和全不选的条件应该是用户看到的书籍才能加入选中/不选中数组.分支应该是书架页面和分类页面两个分支
    selectAll() {
      if(this.currentpage=='shelf'){
      this.shelflist.forEach((item) => {
        if (
          item.type == 1 &&
          this.shelfselected.indexOf(item.title) < 0 &&
          item.isshow
        ) {
          this.ADDSHELFSELECTED(item.title);
        } else {
          return;
        }
      });
      }else{
        // 分类的全选不需要基于搜索结果 所以不需要isshow为条件
           this.shelflist.forEach((item) => {
        if (
          item.type == 2 &&
          item.title==this.currentcategory
        ) {
          // 开始添加
          if(item.itemList.length>this.shelfselected.length){
          item.itemList.forEach((item2)=>{
            this.shelfselected.indexOf(item2.title)<0?this.ADDSHELFSELECTED(item2.title):''
          })
          }else{
            return
          }
        } else {
          return;
        }
      });
      }
   
    },
    unselectAll() {
      this.DELSHELFSELECTED("clear");
    
    },
  },
  mounted() {
    if(Boolean(this.$bus._events.confirmcategorymove)==false){
    this.$bus.$on("shelfpanelbookconfirmremove", this.bookconfirmremove);
    this.$bus.$on("confirmcategorymove", this.confirmcategorymove);
    this.$bus.$on("confirmcreatecategory", this.confirmcreatecategory);
    this.$bus.$on("confirmmoveoutcategory", this.confirmmoveoutcategory);
    }

  },
};
</script>

<style lang="scss" scoped>
@import "../../../assets/styles/global.scss";

.isselectedall {
  color: #2abbe7 !important;
}

.panel-wraper {
  position: fixed;
  bottom: 0;
  left: 0;
  background: linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%);

  width: 100%;
  height: px2rem(55);
  box-sizing: border-box;
  box-shadow: px2rem(0) px2rem(0) px2rem(3) px2rem(0) rgba(0, 0, 0, 10%);
  @include center;
  .span-wraper {
    flex: 0 0 25%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;

    span {
      display: block;
      color: currentcolor;
      text-align: center;
      margin: px2rem(2) 0;
    }
    :nth-child(1) {
      font-size: px2rem(20);
    }
    :nth-child(2) {
      font-size: px2rem(12);
      
    }
  }
}

</style>