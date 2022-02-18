<template>
<transition name="searchlist">

  <div class="searchlist-wraper">
    <div class="historysearch-wraper">
        <div class="historysearch-title-wraper">
            <span>搜索历史</span>
            <span @click="clearhistory">清空</span>
        </div>
        <div class="historysearch-list-wraper">
            <div class="historysearch-item-wraper" v-for="(item,index) in searchhistory" :key="'historysearch'+index">
                <span @click.stop="clickhistory(item)">{{item}}</span>
            </div>
        </div>
    </div>

    <!-- <div class="hotsearch-wraper">
        <div class="hotsearch-title-wraper">
            <span>热门搜索</span>
            <span>换一批</span>
        </div>
        <div class="hotsearch-list-wraper">
            <div class="hotsearch-list-item-wraper" v-for="(item,index) in hotsearch" :key="'hotsearch'+index">
                <span class="iconfont icon-book"></span>
                <div class="detail-wraper">
                    <span>{{item.bookname}}</span>
                    <span>{{item.searchtimes}}次搜索</span>
                </div>
            </div>
        </div>
    </div> -->
    <p v-if="!$store.state.storehome.homebooklist" >加载中...</p>
     <recommend :data="$store.state.storehome.homebooklist.recommend" :lefttext="'热门推荐'" :righttext="''" v-else></recommend>

      <p v-if="!$store.state.storehome.homebooklist" >加载中...</p>
      <guess-you-like :likelist="$store.state.storehome.homebooklist.guessYouLike" v-else></guess-you-like>
  </div>

</transition>

</template>

<script>
    import {mapState} from 'vuex'
    import guessYouLike from '../children/guessYouLike.vue'
    import recommend from './recommend.vue'
export default {
name:'searchlist',
components:{
    guessYouLike,
    recommend
},
computed:{
    ...mapState('storehome',['hotsearch','searchhistory'])
},
methods:{
    clearhistory(){
        this.$store.commit('storehome/CLEARSEARCHHISTORY')
    },
    clickhistory(item){
        this.$store.commit('storehome/SETHIESTORYCLICK',item)
    }
}
}
</script>
<style lang="scss" scoped>
@import '../../../../assets/styles/global.scss';
.searchlist-wraper{
    margin-top: px2rem(20);
}
.historysearch-wraper{
            width: 100%;
            box-sizing: border-box;
        .historysearch-title-wraper{
            display: flex;
           justify-content: space-between;
            :nth-child(1){
                font-size: px2rem(18);
                font-weight: bold;
            }
            :nth-child(2){
                font-size: px2rem(18);
                font-weight: bolder;
                color: #4b8cd5;
            }
        }
        .historysearch-list-wraper{
            width: 100%;
            box-sizing: border-box;
            display: flex;
            // flex-direction: column;
            flex-wrap: wrap;
            justify-content: flex-start;
            align-items: flex-start;
            margin:px2rem(15) 0;
            .historysearch-item-wraper{
                max-width: px2rem(130);
                max-height: px2rem(17);
                padding: px2rem(5) px2rem(11);
                margin: px2rem(7) px2rem(5);
                overflow: hidden;
                background: rgba(243, 243, 245, 100%);
                // border: 1px solid rgba(83, 107, 107, 0.2);
                border-radius: px2rem(25);
                span{
                    display: block;
                    font-size: px2rem(17);
                    // color: #ccc;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
            }
        }
    }

.searchlist-wraper{
    width: 100%;
    box-sizing: border-box;
    .hotsearch-wraper{
            width: 100%;
            box-sizing: border-box;
            padding:px2rem(10) 0;
        .hotsearch-title-wraper{
            display: flex;
            justify-content: space-between;
            :nth-child(1){
                font-size: px2rem(18);
                font-weight: bold;
            }
            :nth-child(2){
                font-size: px2rem(18);
                font-weight: bolder;
                color: #4b8cd5;
            }
        }
        .hotsearch-list-wraper{
            width: 100%;
            box-sizing: border-box;
             padding:0 px2rem(18);
            .hotsearch-list-item-wraper{
                 width: 100%;
                 height:px2rem(70);
                 padding: px2rem(5) 0;
                box-sizing: border-box;
                @include center;
                .icon-book{
                    font-size: px2rem(20);
                }
                .detail-wraper{
                    padding: px2rem(0) px2rem(15);
                    flex:1;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: flex-start;
                    span{
                        width: 100%;
                        display: block;
                        padding: px2rem(5) 0;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }
                    :nth-child(1){
                    font-size: px2rem(20);
                  
                    }
                    :nth-child(2){
                    font-size: px2rem(12);
                 
                    color: #ccc;
                    }
                }
            }
        }
    }
 
}
</style>