<template>
   <!-- <transition name="routerpage-list"> -->
   

  <div class="storelist-wraper">
      <div class="title-wraper">
      <span class="iconfont icon-back" @click="back"></span>
      <span>共检索到{{bookcounts}}本书籍</span>
      <span class="iconfont icon-shelf"></span>
    </div>

    <loading :left='"35%"' :top="'30%'"  v-if="!list"></loading>
    <div class="listscroll-wraper" v-else>
      <div class="bookcatgory-wraper" v-for="(val,key,index) in list" :key="'list'+index" v-if="val[0]">
        <!-- <div class="title-wraper">
            <span>{{}}</span>
        </div> -->
      <recommend :data="val" :lefttext="getCategoryName(val[0].category)" :righttext="''"></recommend>
      </div>
    </div>
  </div>


   <!-- </transition> -->
</template>

<script>
import loading from '../../components/ebook/Notice/loading.vue'
import {list} from '../../API/store.js'
import recommend from '../../components/store/home/children/recommend.vue';
import {getCategoryName} from '../../utils/book';
export default {
name:'storelist',
data() {
  return {
    list:null,
    total:0,
    // bookcounts:0
  }
},
components:{
  loading,
  recommend
},
computed:{
  bookcounts(){
    let a=0;
    for(let key in this.list){
      console.log(this.list[key].length);
      a+=this.list[key].length
    }
    return a
  }
},
methods:{
  getCategoryName(id){
    return getCategoryName(id)
  },
  back(){
    this.$router.go(-1)
  },
  // 无参数list即所有图书，一个即指定分类，keyword存在即搜索
      getList() {
        list().then(response => {
          // console.log(response);
          this.list = response.data.data
          this.total = response.data.total
          const categoryText = this.$route.query.categoryText
          const keyword = this.$route.query.keyword
          if (categoryText) {
            const key = Object.keys(this.list).filter(item => item === categoryText)[0]
            const data = this.list[key]
            this.list = {}
            this.list[key] = data;
       
          } else if (keyword) {
            // 遍历每个类别数组并返回符合关键字的书籍
             Object.keys(this.list).filter(key => {
               this.list[key] = this.list[key].filter(book => book.fileName.indexOf(keyword) >= 0)
              return this.list[key].length > 0
            })

          }
          Promise.resolve()
        }).then(()=>{
              //  console.log(this.list);

        })
      }
},
  mounted(){
    console.log('list页面从新加载');
        this.getList()
      }
}
</script>

<style lang="scss" scoped>
@import '../../assets/styles/global.scss';
.storelist-wraper{
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 0 px2rem(12);
   .title-wraper{
   box-sizing: border-box;

    width: 100%;
    height: px2rem(45);
     display: flex;
  justify-content: space-between;
  align-items: center;
    span{
  display: block;
    }
    :nth-child(1){
      // font-weight: bold;
      font-size: px2rem(20);

    }
      :nth-child(2){
      font-weight: bold;
      font-size: px2rem(20);

    }
    :nth-child(3){
      font-size: px2rem(20);
      color: black;
    }
  }


.listscroll-wraper{
width: 100%;
height: 100%;
box-sizing: border-box;
overflow: auto;
}

}


</style>