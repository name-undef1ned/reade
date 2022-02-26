import axios from 'axios'
// const baseurl='http://192.168.3.70:8081/';

const baseurl='http://124.221.107.109/';
// const baseurl='https://book.youbaobao.xyz:18081/';
// home页面 mock接口
export function home(){
    return axios({
        method:'get',
        url:`${baseurl}mock/bookHome.JSON`
    })
} 

// 英文书detail页面接口
export function detail(book) {
    return axios({
      method: 'get',
      url: `https://book.youbaobao.xyz:18081/book/detail`,
      // url: `http://47.99.166.157:3030/book/detail`,
      params: {
        fileName: book.fileName
      }
    })
  }

  // 中文书detail页面接口
export function chenesebookdetail(book) {
  return axios({
    method: 'get',
    url:`${baseurl}mock/bookDetail.JSON`,
    params: {
      fileName: book.fileName
    }
  })
}

export function list() {
  return axios({
    method: 'get',
    url:`${baseurl}mock/bookList.JSON`
  })
}

 
export function bookShelf() {
  return axios({
    method: 'get',
    url:`${baseurl}mock/bookShelf.JSON`
  })
}
  
