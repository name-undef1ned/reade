module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  // 配置emementui插件--引入elementui的组件和样式
  "plugins": [
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ]
  ]

}
