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

    }
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
                        // 不能是-image 不然一直存在
                        // 'background': "url(https://static.iamflame.top/2021/12/26/p243944566.jpg)"
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
        navigation:{},
        rendition:{},
        capturehref:''

    },
    getters:{
    
    },
}