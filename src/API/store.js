import axios from 'axios'

// home页面 mock接口
export function home(){
    return axios({
        method:'get',
        // url:`http://home页面线上地址(暂时使用mock模拟)/book/home`
        url:`http://192.168.3.70:8081/mock/bookHome.JSON`
    })
} 
export function home2(){
  return axios({
      method:'get',
      url:`http://192.168.3.70:8081/mock/bookHome.JSON`
  })
} 
// 英文书detail页面接口
export function detail(book) {
    return axios({
      method: 'get',
      url: `https://book.youbaobao.xyz:18081/book/detail`,
      // url: `http://47.99.166.157:3030/book/detail`,
      // url: `${process.env.VUE_APP_BOOK_URL}/book/detail`,
      params: {
        fileName: book.fileName
      }
    })
  }

  // 中文书detail页面接口
export function chenesebookdetail(book) {
  return axios({
    method: 'get',
    url:`http://192.168.3.70:8081/mock/bookDetail.JSON`,
    params: {
      fileName: book.fileName
    }
  })
}

export function list() {
  return axios({
    method: 'get',
    url:`http://192.168.3.70:8081/mock/bookList.JSON`
  })
}

 
export function bookShelf() {
  return axios({
    method: 'get',
    url:`http://192.168.3.70:8081/mock/bookShelf.JSON`
  })
}
  
//   export function flatList() {
//     return axios({
//       method: 'get',
//       url: `${process.env.VUE_APP_BOOK_URL}/book/flat-list`
//     })
//   }
  