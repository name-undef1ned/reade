
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
    }

    },
    state:{
        // homecontent滚动位置
        offsetY:0,
        // 用户单击search？
        issearch:false,
        // 热门搜索数据
        hotsearch:[
            {
                bookname:'米格尔街',
                searchtimes:999
            },{
                bookname:'番茄工作法图解',
                searchtimes:555
            },{
                bookname:'围城',
                searchtimes:1500
            },{
                bookname:'三体',
                searchtimes:10000
            },
        ],
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
        historyclick:''
       
       

    }
}