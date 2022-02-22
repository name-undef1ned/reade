
// 书城模块
export default{
    namespaced:true,
    actions:{},
    mutations:{
        SETOFFSETY(state,newv){
            state.offsetY=newv;
        },
    SETISSEARCH(state,newv){
    state.issearch=newv;
    },
    SETCARDVISIBLE(state,newv){
        state.cardvisible=newv;
    },
    SETHOMEBOOKLIST(state,newv){
        state.homebooklist=newv;
    },
    ADDSEARCHHISTORY(state,newv){
        if (state.searchhistory.includes(newv)) return
        if(state.searchhistory.length>=10){
            state.searchhistory.pop()
            state.searchhistory.unshift(newv)
        }else{
            state.searchhistory.unshift(newv)
        }
    },
    CLEARSEARCHHISTORY(state){
        state.searchhistory=[]
    },
    SETHIESTORYCLICK(state,newv){
        state.historyclick=newv;
    },
    SETISEDITMODE(state,newv){
        state.iseditmode=newv;
    },
    SETTITLEVISBLE(state,newv){
        state.shelftitlevisble=newv;
    },
    // 书架初始赋值
    SETSHELFLIST(state,newv){
        state.shelflist=newv;
    },
   test(state,newv){
       state.shelflist.unshift(state.shelflist[1])
   },
    // // 书架初始删除：newv为数组即用户选择的shelfselected
    // DELSHELFLIST(state,newv){
    //     state.shelflist.forEach((item,index)=>{
    //         // item与shelfselected的每个元素比对
    //         if(item.type==1){
    //             for(let i=0;i<newv.length;i++){
    //                 newv[i]==item.fileName?state.shelflist.splice(index,1):''
    //             }
    //         }else{return}
    //     })
    // },
    ADDSHELFSELECTED(state,newv){
    state.shelfselected.push(newv)
    },
    DELSHELFSELECTED(state,newv){
        if(newv=='clear'){
            state.shelfselected.splice(0,state.shelfselected.length)
        }else{
        state.shelfselected.splice(state.shelfselected.indexOf(newv),1)
        }
    },
    SETSEARCHINDEXLIST(state,newv){
        console.log(typeof newv=='object',newv);
        typeof newv=='object'?state.searchindexlist=newv:state.searchindexlist.push(newv)
       
    },
    DELSEARCHINDEXLIST(state){
    
            state.searchindexlist.splice(0,state.searchindexlist.length)
        
    }
    },
    state:{
        // 书城数据
        // homecontent滚动位置
        offsetY:0,
        // 用户单击search？
        issearch:false,
        // 搜索历史数据
        searchhistory:[
            '番茄工作法图解 v1.0',
            '米格尔街',
            '诡案追踪',
            '说服力',
            '围城-钱钟书',
            '我的大明王朝',
            '论语、老子、孟子、庄子、孙子兵法',
            '羊皮卷',
            '鬼吹灯（完美全集）'
        ],
        // 随机推荐组件card是否显示
        cardvisible:false,
        homebooklist:null,
        historyclick:'',
        // 书架相关数据
        iseditmode:false,//是否进入编辑模式
        shelflist:[],//书架图书列表
        shelfselected:[],//书架图书选中列表
        shelftitlevisble:true,//书架搜索框可见？
        searchindexlist:[] //搜索结果数组
       

    }
}