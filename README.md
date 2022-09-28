

<!-- mock模拟数据使用 -->
使用步骤：
  1，在项目中是src文件夹中创建mock文件夹
  2.第二步准备JSON数据（mock文件夹中创建JSON文件）
  3.吧mock数据需要的图片放置到public文件夹中，public文件夹在打包的时候，会把相应的资源原封不动的打包到dist文件夹中
  4，创建mockServe.js通过mockjs插件实现模拟数据
  5,mockServer.js文件在入口文件中映入（至少需要执行一次，才能模拟数据）