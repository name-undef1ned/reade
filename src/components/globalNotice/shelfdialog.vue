<template>
      <transition name="backtop">
            <div class="dialog-wraper" v-show="isshow">
                <div class="log-wraper">
                    <div class="title">
                        <span class="iconfont icon-back" v-show="iscreatemode" @click="modeback"></span>
                        <span>书籍分组</span>
                    </div>
                        
                        <div class="btn-wraper">
                                <div class="btn-normal-wraper" v-show="!iscreatemode">
                                    <div class="moveout-wraper"  v-if="$store.state.storehome.currentpage=='category'">
                                        <span class="iconfont icon-fanhui"></span><span>从分组中移出</span>
                                    </div>

                                     <div class="create-wraper" @click="createcategory">
                                        <span class="iconfont icon-add"></span><span>新建分组</span>
                                    </div>

                                    <div class="category-item-wraper" v-for="(item,index) in sortlist" :key="'category'+index">
                                        <!-- iconcheck条件 为 category页面且当前的分组 -->
                                        <span class="iconfont icon-24gl-folder"></span><span>{{item}}</span><span v-if="$store.state.storehome.currentcategory==item&&$store.state.storehome.currentpage=='category'" class="iconfont icon-check"></span>   
                                    </div>
                                </div>
                                <transition name="title-move">
                                <div class="btn-create-wraper" v-show="iscreatemode">
                                    <!-- 新建元素 -->
                                    <div class="create-title-wraper"><span>设置分组名称:</span></div>
                                    <input type="text" autofocus="autofocus" @blur="viewblur" ref="inp" v-model.trim="searhtext">
                                    <span class="iconfont icon-close-circle-fill" v-show="searhtext!==''" @click="cleartext"></span>
                                </div>
                                </transition>
                        </div>

                        <div class="cancle-wraper">
                            <div class="cancle-normal-wraper" @click="hide" v-if="!iscreatemode">
                                <span>取消</span>
                            </div>

                            <div class="cancle-create-wraper" v-if="iscreatemode">
                                <div class="left" @click="hide">
                                    <span>取消</span>
                                </div>
                                <div class="right" @click="addcategory">
                                    <span :class="{showtext:searhtext!==''}">确定</span>
                                </div>
                            </div>
                        </div>
                </div>
               
            </div>
      </transition>
</template>

<script>
export default {
name:'shelfdialog',
props:{
    list:{
        type:Array
    }
},
data() {
    return {
        isshow:false,
        iscreatemode:false,
        sortlist:[],
        searhtext:''
    }
},
methods:{
    show(){
        this.sortlistinit();
        this.searhtext='';
        this.iscreatemode=false;
        this.isshow=true;
    },
    hide(){
        this.isshow=false;
    },
    // 当前分类排在前边
    sortlistinit(){
        if(this.sortlist[0]){
            this.sortlist=[]
        }
        this.list.forEach(item=>item===this.$store.state.storehome.currentcategory?this.sortlist.unshift(item):this.sortlist.push(item))
    },
    modeback(){
        this.iscreatemode=false;
    },
    viewblur(){
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    },
    cleartext(){
        this.searhtext='';
    },
    // 新建分组功能
    createcategory(){
        this.iscreatemode=true;
        this.$nextTick(()=>{
        this.$refs.inp.focus();
        })
    },
    addcategory(){
        console.log(this.searhtext.length);
        if(this.searhtext.length>10||this.searhtext.length<3){
            this.toast({text:'最长不能超过十位，最短不能低于2位，请重新输入！'}).show()
        }
    }
},
mounted(){
},
activated(){
}
}
</script>


<style lang="scss"  scoped>
@import "../../assets/styles/global.scss";
.dialog-wraper{
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    width: 100%;
    height: 180%;
    background: rgba($color: #000000, $alpha: 0.1);
    z-index: 999;
    @include center;
    .log-wraper{

        z-index: 999999;
        max-width: px2rem(240);
        width: 75%;
        border-radius: 7%;
        min-height: px2rem(200);
        max-height: 30%;
        backdrop-filter: blur(px2rem(50));
        display: flex;
        flex-direction: column;
        justify-content: flex-start;

        .title{
            width: 100%;
            flex:0 0 px2rem(70);
            height: px2rem(70);
            font-size: px2rem(19);
            border-bottom: px2rem(0.5) solid #ccc;
            @include center;
            position: relative;
            .icon-back{
                position: absolute;
                left: 5%;
            }
            span{
                display: block;
            }
        }

        .btn-wraper{
            width: 100%;
            flex: 1;
            max-height: px2rem(300);
        overflow: auto;

            box-sizing: border-box;
            padding: px2rem(3) px2rem(12);
            .btn-normal-wraper{

                .moveout-wraper{
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    box-sizing: border-box;
                    padding: px2rem(10) 0;
                    :nth-child(1){
                        margin-right: px2rem(8);
                    }
                    span{
                        color: #333680;
                        font-size: px2rem(18);
                        display: block;
                    }
                }

                .create-wraper{
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    box-sizing: border-box;
                    padding: px2rem(10) 0;
                    :nth-child(1){
                        margin-right: px2rem(8);
                    }
                    span{
                        color: #333680;
                        font-size: px2rem(18);
                        display: block;
                    }
                }

                .category-item-wraper{
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    box-sizing: border-box;
                    padding: px2rem(10) 0;
                    position: relative;
                    :nth-child(1){
                        margin-right: px2rem(8);
                    }
                    span{
                        color: #12121b;
                        font-size: px2rem(18);
                        display: block;
                    }
                    .icon-check{
                        color: #333680;
                        position: absolute;
                        right: 0;
                    }
                }
            }
            .btn-create-wraper{
                width: 100%;
                height: px2rem(50);
                margin-top: px2rem(10);
                display: flex;
                flex-direction: column;
                justify-content: center;
                position: relative;
                .create-title-wraper{
        
                    span{
                        color: #333680;
                        font-size: px2rem(18);
                    }
                    padding-bottom: px2rem(8);
                }
                input{
                    background: transparent;
                    border: none;
                    // border-bottom: px2rem(0.5) solid black;
                    font-size: px2rem(18);
                     &:focus {
                    outline: none;
                    }
                     width: 80%;
                     height: 80%;
                }
                 .icon-close-circle-fill{
                    font-size: px2rem(20);
                    color: rgba($color: #706060, $alpha: 0.8);
                    position: absolute;
                    right: px2rem(5);
                    bottom: px2rem(-5);
                    }
            }
        }

        .cancle-wraper{
              width: 100%;
              height: px2rem(52);
            flex:0 0 px2rem(52);
              overflow: hidden;
              border-radius: 1%;
              box-sizing: border-box;
              padding-top: px2rem(10);
            border-top: px2rem(0.5) solid #ccc;
            .cancle-normal-wraper{
              width: 100%;
              height: 100%;
            font-size: px2rem(15);
            // background-image: linear-gradient(to right, #4facfe 0%, #00f2fe 100%);

            // background:linear-gradient(to right,#3d94fe,#59bae9);
            @include center;
            span{
                display: block;
                color: #333680;
               
            }
            }
            .cancle-create-wraper{
                 width: 100%;
              height: 100%;
              font-size: px2rem(15);
              display: flex;
              justify-content: flex-start;
              align-items: center;
              box-sizing: border-box;
              .left{
              flex:0 0 50%;
              width: 50%;
              height: 100%;
               @include center;
                span{
                display: block;
                color: #333680;
            }
              }
              .right{
              flex:0 0 50%;
              width: 50%;
              height: 100%;
               @include center;
                span{
                display: block;
                color: rgb(182, 161, 161);
                &.showtext{
                color: #333680;
                }
                }
              }

            }
        }
    }

}
</style>