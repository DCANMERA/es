module.exports = {
  plugins: {
    'autoprefixer': {
      overrideBrowserslist: [
        "last 2 version",
        "> 0.2%",
        "> 0.2% in CN",
        "maintained node versions",
        "not dead",
        "iOS >= 7",
        "Android >= 4.1",
        "Chrome > 31",
        "ff > 31",
        "IE >= 8"
      ],
      grid: true
    },
    'postcss-px-to-viewport': {
      viewportWidth: 750, //视窗的宽度，对应我们设计稿的宽度，一般指retina（一个点两个像素），宽度750
      viewportHeight: 1334, //视窗的高度，对应我们设计稿的高度，可以不配置
      unitPrecision: 2, //指定`px`转化成视窗单位值的小数位数（很多时候不能整除）
      viewportUnit: 'vmin', //指定需要转换的视窗单位 建议'vw'
      fontViewportUnit: 'vmin', //字体
      selectorBlackList: ['ignore'], //指定不需要转换的类
      exclude: [], //指定不要转换的文件，数组内应该是正则表达式
      minPixelVaule: 1, //小于或者等于1px不转换为视窗单位
      mediaQuery: false, //允许在媒体查询中转换'px'
      landscape: false,  // 是否添加根据landscapeWidth生成的媒体查询条件 @media (orientation: landscape)
      landscapeUnit: "vw", // 横屏时使用的视窗单位
      landscapeWidth: 1334 // 横屏时使用的视窗宽度
    }
  }
}
