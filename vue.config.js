const path = require('path')
const FileManagerPlugin = require('filemanager-webpack-plugin')
const businessArray = [{
  chunk: 'draw',
  chunkName: '长江夺宝',
  zipName: 'draw'
}]

const pages = {}
businessArray.forEach(v => {
  pages[v.chunk] = {
    // page 的入口
    entry: `src/pages/${v.chunk}/index.js`,
    // 模板来源
    template: `src/pages/${v.chunk}/draw.html`,
    // 在 dist/index.html 的输出
    filename: `${v.chunk}.html`,
    // 当使用 title 选项时，
    // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
    title: v.chunkName,
    // 在这个页面中包含的块，默认情况下会包含
    // 提取出来的通用 chunk 和 vendor chunk。
    chunks: ['chunk-vendors', 'chunk-common', `${v.chunk}`]
  }
})
module.exports = {
  pages,
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      // 为生产环境修改配置...
      config.plugins.push(
        new FileManagerPlugin({ // 初始化 filemanager-webpack-plugin 插件实例
          onEnd: {
            delete: [ // 首先需要删除项目根目录下的dist.zip
              './dist.zip'
            ],
            archive: [ // 然后我们选择dist文件夹将之打包成dist.zip并放在根目录
              {
                source: './dist',
                destination: `./dist/${businessArray[0].zipName}-${new Date().toLocaleString().replace(/\//g, '-').replace(/:/g, '.')}.zip`
              }
            ]
          }
        })
      )
    } else {
      // 为开发环境修改配置...
    }
  },
  publicPath: './',
  productionSourceMap: false, // js.map文件
  devServer: {
    open: true, //  npm run serve 自动打开浏览器
    host: '0.0.0.0',
    port: 8088,
    compress: false, // 开启压缩
    useLocalIp: true,
    watchOptions: {
      ignored: '/node_modules/'
    },
    proxy: {
      '/tac': {
        // target: 'http://61.132.53.217:8086' // 测试环境1
        target: 'http://192.168.1.224:8086' // 测试环境2
        // target: 'http://192.168.0.102:3030' // 开发环境1
        // target: 'http://192.168.1.163:3030' // 开发环境2
        // target: 'http://192.168.8.134:3030' // 开发环境3
      }
    },
    before: app => {},
    index: `${businessArray[0].chunk}.html` //  默认启动页面
  },
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          require('postcss-plugin-px2rem')({
            rootValue: 75, // 换算基数， 默认100  ，这样的话把根标签的字体规定为1rem为50px,这样就可以从设计稿上量出多少个px直接在代码中写多上px了。
            // 如何把html表情的1rem规定为50px呢，请移步这个链接：https://github.com/Ta0hua/myCssRem
            // unitPrecision: 5, //允许REM单位增长到的十进制数字。
            // propWhiteList: [],  //默认值是一个空数组，这意味着禁用白名单并启用所有属性。
            // propBlackList: [], //黑名单
            exclude: /(node_module)/, // 默认false，可以（reg）利用正则表达式排除某些文件夹的方法，例如/(node_module)/ 。如果想把前端UI框架内的px也转换成rem，请把此属性设为默认值
            // selectorBlackList: [], //要忽略并保留为px的选择器
            // ignoreIdentifier: false,  //（boolean/string）忽略单个属性的方法，启用ignoreidentifier后，replace将自动设置为true。
            // replace: true, // （布尔值）替换包含REM的规则，而不是添加回退。
            mediaQuery: false, // 布尔值）允许在媒体查询中转换px。
            minPixelValue: 3 // 设置要替换的最小像素值(3px会被转rem)。 默认 0
          })
        ]
      }
    }
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        // 这个是加上自己的路径，
        // 注意：试过不能使用别名路径
        path.resolve(__dirname, './src/styles/global.less')
      ]
    }
  }
}
