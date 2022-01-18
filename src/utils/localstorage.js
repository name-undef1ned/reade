// web-storage-cache实例化文件 分别暴露项目所需方法
import Storage from 'web-storage-cache'

const ls=new Storage();

export function setls(key,value){
return ls.set(key,value)
}

export function getls(key){
    return ls.get(key)
}

export function removels(key){
    return ls.delete(key)
}

// clear方法会删除包括不是由webstoragecache插入的缓存  本项目全部由此管理
export function cleanls(){
    return ls.clear()
}

// 每一本书都会开启一个webstoragecache的缓存对象-即需求为一本书一个样式缓存，对象标示就是每一本书的filename
export function setbookobj(filename,key,value){
    let book = getls(filename)
    if(!book){
        book={}
    }
    book[key]=value;
    setls(filename,book)
}
// 读取书籍的指定key 如果没有返回null
export function getbookobj(filename,key){
    let book = getls(filename)
        if(book){
            return book[key]
        }else{
            return null;
        }

}

// 获取字体样式值
export function getfontfamily(filename){
return getbookobj(filename,'fontfamily')
}
// 存入字体样式值
export function setfontfamily(filename,font){
return setbookobj(filename,'fontfamily',font)
}
// 获取字体大小值
export function getfontsize(filename){
return getbookobj(filename,'fontsize')
}
// 存入字体大小值
export function setfontsize(filename,size){
return setbookobj(filename,'fontsize',size)
}
// 获取主题值
export function gettheme(filename){
return getbookobj(filename,'theme')
}
// 存入主题值
export function settheme(filename,theme){
return setbookobj(filename,'theme',theme)
}
// 获取进度的startcfi值
export function getlocationcfi(filename){
return getbookobj(filename,'locationcfi')
}
// 存入进度的startcfi值
export function setlocationcfi(filename,locationcfi){
return setbookobj(filename,'locationcfi',locationcfi)
}


