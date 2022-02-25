<template>
    <div class="title-wraper">
        <div class="clear-wraper">
            <span class="iconfont icon-zuozhe" v-if="whatpage=='shelf'"></span>
            <div class="categorypage-wraper" v-else>
            <span class="iconfont icon-back" @click="back" v-show="iseditmode==false"></span>
            <span class="editcategoryname" @click="editcategory" v-show="iseditmode">修改分类</span>
            </div>
        </div>

        <div class="contenttext-wraper">
            <span class="title-span">{{title}}</span>
            <span v-show="iseditmode" v-html="selecttext"></span>
        </div>

        <div class="edit-wraper" @click="togglemode">
            <span>{{iseditmode?'取消':'编辑'}}</span>
        </div>
    </div>
        

</template>

<script>
import {storeshelfmixin} from '../../../utils/mixin'
export default {
    name:'shelftitle',
    props:{
    // 判断是书架页面还是分类页面的渲染 有一些top之类的渲染差异
    whatpage:{
        type:String,
        default:'shelf'
    },
    title:{
      type:String,
      default:'书架'
    }
},
    mixins:[storeshelfmixin],
    data() {
        return {
            
        }
    },
    computed:{
        selecttext(){
            if(Boolean(this.shelfselected)==false) return '请单击以勾选书籍'
            return this.shelfselected.length?`已选择<span class="title-selected">${this.shelfselected.length}</span>本书籍`:`请单击以勾选书籍`
        }
    },
    methods: {
        togglemode(){
            if(this.iseditmode){
              this.DELSHELFSELECTED('clear');
            }
            this.SETISEDITMODE(!this.iseditmode)
        },
        back(){
          this.SETISEDITMODE(false);
          this.DELSHELFSELECTED("clear");
          this.$router.go(-1);
        },
        editcategory(){
          this.popup({
          title:`修改"${this.currentcategory}"分类`,
          confirmText: "删除分组",
          thirdText:'修改分类名',
          isRemoveText: true,
          cancelText: "取消",
          confirmEvenName: 'poppredelcategory',
          thirdTextconfirmEvenName:'popeditcategory'
        }).show();
        },
        predelcategory(){
          this.popup({
          title:`该分类含有书籍,删除后分类书籍移至书架,确定吗?`,
          confirmText: "确定删除",
          isRemoveText: true,
          cancelText: "取消",
          confirmEvenName: "popdelcategory",
        }).show();  
        },
        delcategory(){
          this.SETSHELFLIST({type:'delcategory'})
          this.toast({text:'删除成功！'}).show();
          this.$router.go(-1);
           this.SETISEDITMODE(false)
        },
        preeditcategory(){
        this.shelfdialog({editcategory:true}).show()
        },
        confirmeditcategory(editname){
        this.SETSHELFLIST({type:'editcategoryname',editname})
          this.toast({text:`成功修改为${this.currentcategory}`}).show();
           this.SETISEDITMODE(false)

        }
       
    },
    mounted(){
      if(Boolean(this.$bus._events.poppredelcategory)==false){
        this.$bus.$on('poppredelcategory',this.predelcategory)
        this.$bus.$on('popdelcategory',this.delcategory)
        this.$bus.$on('popeditcategory',this.preeditcategory)
        this.$bus.$on('dialogconfirmeditcategory',this.confirmeditcategory)
      }
    }

}
</script>

<style lang="scss" scoped>
@import '../../../assets/styles/global.scss';

  .title-wraper{
    // position: absolute;
    // left: 0;
    // top: 0;
    //   border: 1px dashed cyan;
   box-sizing: border-box;

    width: 100%;
    height: px2rem(55);
     display: flex;
  justify-content: space-between;
  align-items: center;
    span{
  display: block;
    }
    .clear-wraper{
      // font-weight: bold;
      width: px2rem(70);
      overflow: hidden;
      font-size: px2rem(22);
      color: rgba($color: #ad8585, $alpha: 0.7);
      .editcategoryname{
        font-size: px2rem(15);
      }
    }
      .contenttext-wraper{
          text-align: center;
            width: 70%;
            overflow: hidden;
          .title-span{
            font-weight: bolder;
            width: 100%;
            font-size: px2rem(20);
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            display: inline-block;
          }
          :nth-child(2){
            font-size: px2rem(15);
      color: rgba($color: #ad8585, $alpha: 0.7);
          // font-family: 'Courier New', Courier, monospace;
         
          }

    }
   .edit-wraper{
       text-align: right;
       width: px2rem(70);
      overflow: hidden;
      font-size: px2rem(16);
      color: rgba($color: #ad8585, $alpha: 0.7);
    
    }
  }

</style>