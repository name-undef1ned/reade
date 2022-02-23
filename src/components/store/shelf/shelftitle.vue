<template>
    <div class="title-wraper">
        <div class="clear-wraper">
            <span class="iconfont icon-zuozhe" v-if="whatpage=='shelf'"></span>
            <span class="iconfont icon-back" @click="back" v-else></span>
        </div>

        <div class="contenttext-wraper">
            <span>{{title}}</span>
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
            return this.shelfselected.length?`已选择<span style="color:#2abbe7;font-family:'cursive,auto,monospace;'">${this.shelfselected.length}</span>本书籍`:`请单击以勾选书籍`
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
          this.$router.go(-1)
        }
       
    },

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
    }
      .contenttext-wraper{
          text-align: center;
          :nth-child(1){
            font-weight: bolder;
            font-size: px2rem(25);
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