
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
    // 书架数据
    SETSHELFLIST(state,newv){
        if(Boolean(newv.type)==false){
        state.shelflist=newv;
        }else{
        // 从书架页面移动书籍到分类
        if(newv.type=='shelfconfirmcategorymove'){
            let tempindex=0;
            // 1找到下标
            state.shelflist.forEach((item,index)=>{
            item.title==newv.text&&item.type==2?tempindex=index:''
            })
            // 2判断选中的并存入对应分类数组，且将书架页面数据删除
            state.shelflist.forEach((item,index)=>{
            if(state.shelfselected.indexOf(item.title)>=0&&item.type==1){
                state.shelflist[tempindex].itemList.unshift(item)
            }
            })
            state.shelflist=state.shelflist.filter(item=>{
                return item.type==2?item:state.shelfselected.indexOf(item.title)<0
            })
            // 3.清空shelfselected
            state.shelfselected=[];
        }else if(newv.type=='categoryconfirmcategorymove'){
        // 从分类页面移动书籍到分类
            let tempindex=0;
            let currentcategoryindex=0;
            // 1找到下标
            state.shelflist.forEach((item,index)=>{
                // 目标分类以及当前分类位置
            item.title==newv.text&&item.type==2?tempindex=index:''
            item.title==state.currentcategory&&item.type==2?currentcategoryindex=index:''
            })
            // 2.1判断当前分类选中的并存入目标分类数组
            state.shelflist[currentcategoryindex].itemList.forEach((item,index)=>{
            if(state.shelfselected.indexOf(item.title)>=0&&item.type==1){
                state.shelflist[tempindex].itemList.unshift(item)
            }
            })
            // 2.2删除当前分类中选中的数据
            state.shelflist[currentcategoryindex].itemList=state.shelflist[currentcategoryindex].itemList.filter(item=>{
                return item.type==2?item:state.shelfselected.indexOf(item.title)<0
            })
            // 3.清空shelfselected
            state.shelfselected=[];
        }else if(newv.type=='shelfconfirmcreatecategory'){
        // 从书架页面新增分类并移入
            let tempindex=0;
            // 1创建新分类
            state.shelflist.unshift({
                id:state.shelflist.length+1,
                isshow:true,
                itemList:[],
                selected:false,
                title:newv.text,
                type:2
            })
            // 2插入的新分类的下标
            state.shelflist.forEach((item,index)=>{
                // 新分类以及当前分类位置
            item.title==newv.text&&item.type==2?tempindex=index:''
            })
            // 2.1判断书架选中的并存入目标分类数组
            state.shelflist.forEach((item)=>{
            if(state.shelfselected.indexOf(item.title)>=0&&item.type==1){
                state.shelflist[tempindex].itemList.unshift(item)
            }
            })
            // 2.2删除书架选中的数据
            state.shelflist=state.shelflist.filter(item=>{
                return item.type==2?item:state.shelfselected.indexOf(item.title)<0
            })
            // 3.清空shelfselected
            state.shelfselected=[];
        }else if(newv.type=='categoryconfirmcreatecategory'){
        // 从分类页面新增分类并移入
            let tempindex=0;
            let currentcategoryindex=0;
            // 1创建新分类
            state.shelflist.unshift({
                id:state.shelflist.length+1,
                isshow:true,
                itemList:[],
                selected:false,
                title:newv.text,
                type:2
            })
            // 2当前分类和插入的新分类的下标
            state.shelflist.forEach((item,index)=>{
                // 新分类以及当前分类位置
            item.title==newv.text&&item.type==2?tempindex=index:''
            item.title==state.currentcategory&&item.type==2?currentcategoryindex=index:''
            // state.shelflist[currentcategoryindex].itemList
            })
            // 2.1判断当前分类选中的并存入目标分类数组
            state.shelflist[currentcategoryindex].itemList.forEach((item)=>{
            if(state.shelfselected.indexOf(item.title)>=0&&item.type==1){
                state.shelflist[tempindex].itemList.unshift(item)
            }
            })
            // 2.2删除当前分类选中的数据
            state.shelflist[currentcategoryindex].itemList=state.shelflist[currentcategoryindex].itemList.filter(item=>{
                return item.type==2?item:state.shelfselected.indexOf(item.title)<0
            })
            // 3.清空shelfselected
            state.shelfselected=[];
        }else if(newv.type=='confirmmoveoutcategory'){
            // 从分类页面将书籍移入书架
            let currentcategoryindex=0;
            // 2获取当前分类的下标
            state.shelflist.forEach((item,index)=>{
                // 当前分类位置
            item.title==state.currentcategory&&item.type==2?currentcategoryindex=index:''
            // state.shelflist[currentcategoryindex].itemList
            })
            // 2.1判断当前分类选中的并存入书架数组
            state.shelflist[currentcategoryindex].itemList.forEach((item)=>{
            if(state.shelfselected.indexOf(item.title)>=0&&item.type==1){
                state.shelflist.push(item)
            }
            })
            // 2.2删除当前分类选中的数据
            state.shelflist[currentcategoryindex].itemList=state.shelflist[currentcategoryindex].itemList.filter(item=>{
                return item.type==2?item:state.shelfselected.indexOf(item.title)<0
            })
            // 3.清空shelfselected
            state.shelfselected=[];
        }else if(newv.type=='shelfdel'){
        // 书架删除
        // 搜索结果更新-书架页面编辑模式下搜索并且删除图书就需要更新搜索结果列表。category页面没有功能所以不需要
            state.shelflist=state.shelflist.filter((item) => {
            return item.type == 1
            ? state.shelfselected.indexOf(item.title) < 0
            : item;
        })

        // 在删除selected前更新搜索结果
        state.shelfselected.forEach(i=>{
            state.searchindexlist.indexOf(i.title)>=0?state.searchindexlist.splice(state.searchindexlist.indexOf(i.title)):''
        })

        state.shelfselected=[];
        }else if(newv.type=='categorydel'){
              let currentcategoryindex=0;
            // 1找到下标
              state.shelflist.forEach((item,index)=>{
                // 当前分类位置
            item.title==state.currentcategory&&item.type==2?currentcategoryindex=index:''
            })
            // 2开始删除
            state.shelflist[currentcategoryindex].itemList=state.shelflist[currentcategoryindex].itemList.filter((item,index)=>{
            return item.type == 1
            ? state.shelfselected.indexOf(item.title) < 0
            : item;
            })

            state.shelfselected=[];
        }
    }
    },
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
    // 基于搜索结果的进一步筛选
    SEARCHLISTHOWSHOW(state,newv){
        // 按默认-即搜索结果不做筛选
    if(newv.type=='default'){
     state.shelflist.forEach(i=>{
        state.searchindexlist.indexOf(i.title)>=0?i.isshow=true:i.isshow=false;
    })
        // 按书籍-即搜索结果按照书籍筛选
    }else if(newv.type=='name'){
    state.shelflist.forEach(i=>{
        i.type==1&&state.searchindexlist.indexOf(i.title)>=0?i.isshow=true:i.isshow=false;
    })
        // 按分类-即搜索结果按照分类筛选
    }else if(newv.type=='category'){
     state.shelflist.forEach(i=>{
        i.type==2&&state.searchindexlist.indexOf(i.title)>=0?i.isshow=true:i.isshow=false;
    })
    }
    },
    SETSEARCHINDEXLIST(state,newv){
        typeof newv=='object'?state.searchindexlist=newv:state.searchindexlist.push(newv)
       
    },
    DELSEARCHINDEXLIST(state){
    state.searchindexlist.splice(0,state.searchindexlist.length)
        
    },
    SETCURRENTPAGE(state,newv){
        state.currentpage=newv;
    },
    SETCURRENTCATEGORY(state,newv){
        state.currentcategory=newv;
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
        searchindexlist:[], //搜索结果数组
        currentpage:'shelf',//当前所在是书架还是分类页面
        currentcategory:''//存储当前的分类
    }
}