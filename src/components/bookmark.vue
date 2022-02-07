<template>
  <div class="bookmark-wraper">

      <div class="all" ref="all">
      <div class="icon-down-wraper">
          <span class="iconfont icon-down1" ref="icondown"></span>
      </div>
      <div class="text-wraper">
          <span v-if="islevel==3">{{mark==false?'松手添加书签':'松手删除书签'}}</span>
          <span v-else>{{mark==false?'下拉添加书签':'下拉删除书签'}}</span>
      </div>
      <div class="icon-mark-wraper" :class="{marktrue:mark&&ispedding==false,markfalse:!mark&&ispedding==false}" ref="mark">
      </div>

      </div>
  </div>
</template>

<script>

import { mapState,mapMutations } from 'vuex'
import {getmarklist,setmarklist} from '../utils/localstorage'

export default {
name:"bookmark",
computed:{
    ...mapState('book',['offsetY','rendition','isTitleAndMenuShow','isbookprogressready','hastouchup',
    'lastoffsetY','istouchdown','book','filename','marklist','mark'])
},
data() {
    return {
        islevel:0,
        ispedding:false
       
    }
},
watch:{
    offsetY(newv){
     
        // 确定用户手势不为下滑 退出mark逻辑
        if(!this.istouchdown) return

    
           //  判断是否已经添加了书签如果是就是删除的逻辑 否则就是添加逻辑
       if(this.mark){
           this.ispedding=true;
       this.delmark(newv);
       }else{
           this.ispedding=true;
           this.addmark(newv);
       }

    },
    // 最终删除/添加与否都是建立在用户松手(hastouchup状态数据)的情况之上 且 需要以当前mark是否存在 和 下拉量 为判断 去决定mark的定位和颜色
    hastouchup(newv){
        // 确定用户手势不为下滑 退出mark逻辑
        if(!this.istouchdown) return
        // 第三阶段数值且用户松手
        if(newv&&this.lastoffsetY>85&&!this.mark){
            // 第三阶段标签变色且变为fixed布局
        this.$refs.mark.style.position='fixed'
        this.$refs.mark.style.zIndex='18'
        this.$refs.mark.style.top='0px'
           setTimeout(() => {
               this.ispedding=false;
               this.SETMARK(true)
                // 在此处进行veux和localstorage的mark数组存储
               this.addbookmark()
                
            }, 250);
        }else if(newv&&this.lastoffsetY>85&&this.mark){
        this.$refs.mark.style.borderColor='white white transparent white'

        this.$refs.mark.style.position='absolute'
        this.$refs.mark.style.zIndex='2'
        this.$refs.mark.style.top='0px'
            setTimeout(() => {
               this.ispedding=false;

                this.SETMARK(false)
                // 在此处进行veux和localstorage的mark数组删除
                this.removebookmark()
            }, 250);
        }
    }
},
// 显示隐藏逻辑 每一次翻页跳转都将mixin的currentloaction的cfi与marklist的cfi对比决定mark显示状态 所以mark必须是vuex的数据
methods: {
    ...mapMutations('book',['SETMARKLIST','replacemarklist','DELAMRKLIST','SETMARK']),
    addmark(newv){
        // this.$refs.mark.style.borderColor='white white transparent white'

    if(newv<57){
        this.islevel=1;
        this.$refs.icondown.style.transform='rotate(360deg)'
        // 第一阶段让三个元素回到初始位置 并且需要延迟回去 不然在弹回去阶段就会看到，而且是为0的时候.
        if(newv==0){
          setTimeout(() => {
            this.$refs.all.style.bottom=`0px`;
              // 第一第二阶段书签是白色
        this.$refs.mark.style.borderColor='white white transparent white';
        }, 300);
        }
    }
    if(newv>57&&newv<85){
        this.islevel=2;
        this.$refs.icondown.style.transform='rotate(360deg)'
        // 第二阶段和第三阶段都吸顶 同步移动达到相对静止
        this.$refs.all.style.bottom=`${newv-57}px`
        // 第一第二阶段书签是白色
        this.$refs.mark.style.borderColor='white white transparent white'

    }
    if(newv<100&&newv>85){
        this.islevel=3;
        this.$refs.icondown.style.transform='rotate(180deg)'
           // 第二阶段和第三阶段都吸顶
        this.$refs.all.style.bottom=`${newv-57}px`;
        // 第三阶段标签变色
        this.$refs.mark.style.borderColor='#295a9d #295a9d transparent #295a9d'
    }
    },
    delmark(newv){
    if(newv<57){
        this.islevel=1;
        this.$refs.icondown.style.transform='rotate(360deg)'
        this.$refs.mark.style.borderColor='#295a9d #295a9d transparent #295a9d'
     this.$refs.mark.style.position='fixed'
        this.$refs.mark.style.zIndex='18'
        this.$refs.mark.style.top='0px'
        // 第一阶段让三个元素回到初始位置 并且需要延迟回去 不然在弹回去阶段就会看到，而且是为0的时候.
        if(newv==0){
          setTimeout(() => {
            this.$refs.all.style.bottom=`0px`;
           
        }, 300);
        }
    }
    if(newv>57&&newv<85){
        this.islevel=2;
        this.$refs.mark.style.position='absolute'
        this.$refs.mark.style.zIndex='2'
        this.$refs.mark.style.top=''
        this.$refs.mark.style.borderColor='#295a9d #295a9d transparent #295a9d'

        this.$refs.icondown.style.transform='rotate(360deg)'
        // 第二阶段和第三阶段都吸顶 同步移动达到相对静止
        this.$refs.all.style.bottom=`${newv-57}px`
        // 第一第二阶段书签是白色

    }
    if(newv<100&&newv>85){
        this.islevel=3;
        
        this.$refs.icondown.style.transform='rotate(180deg)'
           // 第二阶段和第三阶段都吸顶
        this.$refs.all.style.bottom=`${newv-57}px`;
        // 第三阶段标签变色
        this.$refs.mark.style.borderColor='white white transparent white'

    }
    },
    addbookmark(){
        const currentlocation=this.book.rendition.currentLocation();
        const cfi=currentlocation.start.cfi;
        const cfibase=currentlocation.start.cfi.replace(/!.*/,'');
        // 当前页开始位置cfi
        const cfistart=currentlocation.start.cfi.replace(/.*!/,'').replace(/\)$/, '')
        const cfiend=currentlocation.end.cfi.replace(/.*!/,'').replace(/\)$/, '')
        const cfirange=`${cfibase}!,${cfistart},${cfiend})`;
        //   拿到当前页文本
        this.book.getRange(cfirange).then(range=>{
                const text =range.toString().replace(/\s\s/g, '')
                if(text.length<8){
                    text='当前书签未成功获取到内容或页面无文字内容,如需跳转请单击!'
                }
                return text
          
        }).then(text=>{
            // 将当前页信息和文本存入localstorage vuex
            //    存在且为字符串类型
            if(text&&typeof text=='string'){
                // 去重的判断
                if(this.marklist.some(item=>item.cfi==cfi)){
                        console.log('存在');
                }else{
                    console.log('开始存储');
                    this.SETMARKLIST({cfi,text})
                    // local的存储
                    setmarklist(this.filename,this.marklist)
                }
            }
        }).catch(()=>{
            // 当epub获取失败
            const cfi=currentlocation.start.cfi;
            this.SETMARKLIST({cfi,text:'当前书签未成功获取到内容或页面无文字内容,如需跳转请单击!'})
        })
    },
    removebookmark(){
        const currentlocation=this.book.rendition.currentLocation();
        const cfi=currentlocation.start.cfi;
        let i;
        this.marklist.forEach((item,index)=>{
           if(item.cfi==cfi){
               i=index
               return 
           }
       })
       this.DELAMRKLIST(i)
    },
    // 初始化获取loacl的marklist数据存入vuex
    initlocalmarklist(){
        if(this.marklist[0]) return
        setTimeout(()=>{
            let temparr=getmarklist(this.filename);
            if(!temparr){
                return
            }else{
                temparr.forEach(item=>{
                    this.SETMARKLIST({cfi:item.cfi,text:item.text})
                })
            }
    },1000)
       
    }
},
    // 在组件加载时将local的数据存入vuex。项目运行过程使用vuex，每一次存储将vuex数据存储到local
mounted() {
    this.initlocalmarklist()
},
beforeDestroy() {
   
    
},
}
</script>

<style lang="scss" scoped>
@import '../assets/styles/global.scss';

.marktrue{
 border-color: #295a9d #295a9d transparent #295a9d!important;
position: fixed!important;
z-index: 18!important;
}
.markfalse{
border-color: white white transparent white!important;
position: absolute!important;
z-index: 2!important;
}

.icondown-roatate{
    transform: rotate(180deg);
}
.bookmark-wraper{
    width: 100%;
    height:98px;
    background:#686b70;
    position: absolute;
    top: -98px;
    box-sizing: border-box;
    // z-index: 99;
    .all{
        width: 50%;
        height: 57px;
        // border: 1px solid red;
        position: absolute;
        box-sizing: border-box;
        right: 0px;
        bottom: 0;
        // display: flex;
        // border: 1px solid white;
        // justify-content: flex-end;
        // align-items: flex-end;
        span{
            font-size: px2rem(16);
            color: white;
        }
        div{
            margin:0 px2rem(2);
        }
        .icon-down-wraper{
            position: absolute;
            right: 160px;
            bottom: 0px;
            .icon-down1{
            display: block;
            transform-origin: center;
            transition: all .2s linear;
            margin-bottom: px2rem(2);
        }
        }
        
        .text-wraper{
              position: absolute;
            right: 40px;
            bottom: 0px;

            span{
                display: block;
            margin-bottom: px2rem(2);

            }
        }
        .icon-mark-wraper{
              position: absolute;
            right: 10px;
            width: 0;
            height: 0;
            border-width: 45px 10px 10px 10px;
            border-style: solid;
            border-color: white white transparent white;
            
        }
    }
   

}
</style>