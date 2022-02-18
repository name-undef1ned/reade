
// function mock(app, url, data) {
//   app.get(url, (request, response) => {
//     response.json(data)
//   })
// }

// 各个页面的mock模拟接口，除去reader页面（mock返回的资源链接read页面不能使用）所以发起请求前拦截这几个页面的请求
// const mockBookHomeData = require('./src/mock/bookHome')
// const mockBookShelfData = require('./src/mock/bookShelf')
// const mockBookList = require('./src/mock/bookCategoryList')
// const mockBookFlatList = require('./src/mock/bookFlatList')


module.exports = {
    // 禁用保存检查 包括声明但没有使用的变量
    lintOnSave:false,
    // devServer: {
    //   // proxy: 'http://172.20.10.2:8081/'
    //   before(app) {
    //     mock(app, '/book/home', mockBookHomeData)
    //     mock(app, '/book/shelf', mockBookShelfData)
    //     mock(app, '/book/list', mockBookList)
    //     mock(app, '/book/flat-list', mockBookFlatList)
    //   }

    // }
  }