module.exports = (isDev) => {
  return {
    preserveWhitepace: true, // 去除空格
    extractCSS: !isDev, // 把css提取到单独的文件，而不是加载到html的style标签里
    cssModules: {
      localIdentName: isDev ? '[path]-[name]-[hash:base64:5]' : '[hash:base64:5]',
      camelCase: true // 驼峰命名
    }
  }
}
