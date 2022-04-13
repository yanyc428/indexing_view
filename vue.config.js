const {defineConfig} = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    publicPath: "./",
    // 输出文件目录
    outputDir: "dist",
    // 静态资源存放的文件夹(相对于outputDir)
    assetsDir: "static",
    devServer:{
        hot: true,
        port: 8080,
        proxy: 'http://172.24.44.4:5000'
    }
})