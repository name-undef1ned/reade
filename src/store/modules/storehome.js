
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
        searchhistory:new Set([
            '三体',
            'javascript高级程序设计(第4版)',
            '思考快与慢',
            '原则',
            'node',
            '追风筝的少年',
            '人类简史:从动物到上帝',
            '金字塔原理:(麦肯锡经典40年培训教材)',
            '苏世民:我的经验与教训'
        ]),
        // 随机推荐组件card是否显示
        cardvisible:false,
        homebooklist:null,
       

    }
}