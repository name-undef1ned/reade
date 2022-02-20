// book模块
export default{
    // 开启该模块的命名空间，以便于辅助函数定位  用法辅助函数的第一个参数写模块名即可
    namespaced:true,
    actions:{
    setfilename:({commit},newfilename)=>{
        // 某些异步逻辑。。。。
        return commit('SETFILENAME',newfilename);
       
    },
    // 按理说没有异步逻辑 数据处理 可以直接commit的
    setistitleandmenushow({ commit }){
    commit('SETISTITLEANDMENUSHOW')
    },
    settheme({commit},newv){
        // localstorage的读写占位
        commit('SETTHEME',newv);
    },
    setselected({commit},newv){
     
        commit('SETSELECTED',newv);

    },
    setaction(contenxt,newv){
        
        if(newv<contenxt.state.booksections.length&&newv>=0){
            console.log('newv',newv);
            
            return contenxt.commit('SETSECTION',newv)
        }else{

            Promise.reject('大与或小于图书章节长度')
        }
    },
    },
    mutations:{
    // action和mutaion大小写对照
    SETFILENAME:(state,newfilename)=>{
    state.filename=newfilename.replace('|','/');
    },
    SETISTITLEANDMENUSHOW:(state) =>{
     state.isTitleAndMenuShow=!state.isTitleAndMenuShow;
    },
    SETFONTSIZE(state,newv){
        state.bookFontSize=newv;
    },
    SETTHEME(state,newv){
        state.selecttheme=newv;
    },
    SETSELECTED(state,newv){
        // 遍历判断对应为真 且排他
        state.themeslist.forEach((item,index)=>{
        item.name===newv?item.selected=true:item.selected=false;
     
    })
    },
    setisbookprogressready(state){
    state.isbookprogressready=true;
    },
    setpgspercent(state,newv){
        state.pgspercent=newv;
    },
    setnavigation(state,newv){
        state.navigation=newv;
    },
    setcapturehref(state,newv){
        state.capturehref=newv;
    },
    setfontfamilyselected(state,newv){
        state.fontfamilyselected=newv;
    },
    setisshowFontfamily(state,newv){
       state.isshowFontfamily=newv;
    },
    setrendition(state,newv){
        state.rendition=newv;
    },
    SETBOOK(state,newv){
        state.book=newv;
    },
    SETSECTION(state,newv){
        console.log('成功触发');
        state.section=newv;
        console.log(state.section);
    },
    SETBOOKSECTIONS(state,newv){
        state.booksections=newv;
    },
    SETNOWSECTION(state,newv){
        state.nowsection=newv;
    },
    SETVALUE1(state,newv){
        state.value1=newv;
    },
    SETCOVERURL(state,newv){
        state.coverurl=newv;
    },
    SETBOOKMETADATA(state,newv){
        state.bookmetadata=newv;
    },
    SETOFFSETY(state,newv){
        state.offsetY=newv;
    },
    HASTOUCHUP(state,newv){
        state.hastouchup=newv;
    },
    SETLASTOFFSETY(state,newv){
        state.lastoffsetY=newv;
    },
    ISTOUCHDOWN(state,newv){
        state.istouchdown=newv;
    },
    SETMARKLIST(state,newv){
        console.log('cunchuyici');
            state.marklist.push({cfi:newv.cfi,text:newv.text});
    },
    replacemarklist(state,newv){
        state.marklist=newv;
    },
    DELAMRKLIST(state,index){
        state.marklist.splice(index,1)
    },
    SETMARK(state,newv){
        state.mark=newv;
    }
    },
    state:{
         // 字体样式组件是否显示
        isshowFontfamily:false,
        fontfamilyselected:'Default',
        fontfamilylist:[
            'Default',
            "Ma Shan Zheng",
            'Ubuntu Mono',
            "ZCOOL QingKe HuangYou",
            "Liu Jian Mao Cao",
            'Oooh Baby',
            "Pushster",
            "ZCOOL KuaiL",
        ],
        fontfamilylistlang:['','(中)','(中)','(中)','(英)','(英)','(英)','(英)','(英)'],
        filename:'',
        isTitleAndMenuShow:false,
        bookFontSize:18,
        themeslist:[
            {
                selected:false,
                name:'默认',
                style:{
                    body:{
                        'color':'#000',
                        'background':'#fff'
                    }
                }
            },
            {
                selected:false,
                name:'护眼',
                style:{
                    body:{
                        'color':'#000',
                        'background':'#ceeaba'
                    }
                }
            },
            {
                selected:false,
                name:'竹青',
                style:{
                    body:{
                        'color':'#000',
                        // 'background': "#b8d0b6"
                        'background': "#7fe69d"
                    }
                }
            },
            {
                selected:false,
                name:'夜间',
                style:{
                    body:{
                        'color':'#fff',
                        'background':'#000'
                    }
                }
            },
       
        ],

        selecttheme:'默认',
        isbookprogressready:false,
        // bookmenu的进度值
        pgspercent:0,
        booksections:{},
        nowsection:{},
        section:0,
        value1:0,
        book:{},
        navigation:{},
        rendition:{},
        capturehref:'',
        coverurl:null,
        bookmetadata:null,
        // 书签功能下拉手势偏移量
        offsetY:0,
        // 记录用户上一次的下拉量
        lastoffsetY:0,
        // 记录用户是否松手
        hastouchup:false,
        // 记录手势方向的状态变量
        istouchdown:false,
        // mark数组
        marklist:[],
        // mark是否显示
        mark:false

    },
    getters:{
    
    },
}
