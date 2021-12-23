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
    }
    },
    mutations:{
    // action和mutaion大小写对照
    SETFILENAME:(state,newfilename)=>{
    state.filename=newfilename.replace('|','/');
    },
    SETISTITLEANDMENUSHOW:(state) =>{
     state.isTitleAndMenuShow=!state.isTitleAndMenuShow;
    }
    },
    state:{
        filename:'',
        isTitleAndMenuShow:false
    },
    getters:{
    
    },
}