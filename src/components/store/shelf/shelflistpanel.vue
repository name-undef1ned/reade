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
        console.log(123);
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
      },
    },
  },
  methods: {
    categorymove(){
      const temparr=[1,2,2,2,2,2,2,5,6,5,6]
      this.shelflist.forEach(i=>{
        i.type==2?temparr.push(i.title):' '
      })
      this.shelfdialog({list:temparr}).show()
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
      //    编辑模式下删除需要更新搜索结果数据  更新-1
      let tempsearchlist = [];
      this.searchindexlist.forEach((i) => {
        tempsearchlist.push(this.shelflist[i].title);
      });

      // 更新-2 :把选中的排除并转化成书架列表的下标
      let tempsearchlist2 = tempsearchlist.filter((indxtitle) => {
        return this.shelfselected.indexOf(indxtitle) < 0;
      });

      // 删除
      // 1type不为1的直接返回,为1的判断是否存在于用户选中的2用户选择数组清空
      // *不直接重新赋值新数组否则会全部重新加载（需要变化的数据才变化-才会通知需要更新的依赖）
      this.SETSHELFLIST(
        this.shelflist.filter((item) => {
          return item.type == 1
            ? this.shelfselected.indexOf(item.title) < 0
            : item;
        })
      );
      this.toast({
        text:
          "已将" +
          (this.shelfselected[1]
            ? `您选中的共计<span class="shelfsearch-tip-toast">${this.shelfselected.length}</span>本书成功移出书架!`
            : `您选中的<span class="shelfsearch-tip-toast">${this.shelfselected[0]}</span>成功移出书架!`),
      }).show();

      //    更新3：删除之后下标变化 开始转化
      let tempindexlist = [];
      this.shelflist.forEach((item, index) => {
        tempsearchlist2.indexOf(item.title) < 0
          ? ""
          : tempindexlist.push(index);
      });
      this.SETSEARCHINDEXLIST(tempindexlist);

      this.DELSHELFSELECTED("clear");
    },
    // 全选和全不选的条件应该是用户看到的书籍才能加入选中/不选中数组
    selectAll() {
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
      // this.shelflist.reverse()
    },
    unselectAll() {
      this.DELSHELFSELECTED("clear");
    },
  },
  mounted() {
    this.$bus.$on("shelfpanelbookconfirmremove", this.bookconfirmremove);
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