# EndingSmart 无引擎结束页面开发框架文档

## 流程： 技术发起需求 --- 前端拿到设计资源 -- 确认需求后跟技术确定接口参数 -- 开始制作 -- 跟设计调试效果 -- 输出js给技术

## 研发调用时
```js
/**
 * ending页入口函数
 * @param {boolean} isVictory 是否为胜利页，不传默认为true
 * @param {object} {globalClick, autoClick} 可选，后续有参数就添加只这个对象中，其中globalClick: 全屏可点阀值，默认值为false； autoClick: 自动跳转阀值，默认值为false，默认值为false
 */
showEnding(isVictory = true, { globalClick, autoClick } = { globalClick: false, autoClick: false })
调用例如：
 需要传参时 showEnding(false, { globalClick: true, autoClick: false, score:2333, name:"Hugo" })
 不传参时：showEnding()

/**
 * 移除ending页
 */
closeEnding()
```

## 前端开发时
```
1、开发

在终端运行 yarn serve --entry [入口文件路径] 或者 如果 yarn serve 这样默认入口为projects/test/app.js

2、构建

在终端运行 yarn build --entry [入口文件路径]，如 yarn build --entry projects/test/app.js
最终压缩产出的js文件可在终端运行 yarn build:prod --entry [入口文件路径]，如 yarn build:prod --entry projects/test/app.js

3、测试*

目前主要测试iPhone 6/7/8(375*667)、iPhone 6/7/8 Plus、iPhone X(375*812)、iPad(768*1024)的横竖屏，同时需要对其他端进行很好的兼容适配；同时也要对全屏点击、下载按钮、重玩、多语言等测试。
需要在开发环境和发布环境进行测试。发布环境测试先下载工具包AsstesPackage.zip，目前只支持windows电脑，解压后打开AssetesPackage.exe，把测试的基础包（即EndingSmart/dist/TestEnding）拖进去，产出的data.js放在基础包最外层，和html同一层级，最后用浏览器打开基础包的入口html文件即可测试发布环境。
如果遇到不能解决的问题，及时抛出来大家一起解决，唯一一点就是要准时把制作的ending交付给研发
测试时及时与设计、研发和跟小组反馈结果，保证需求准时交付

4、提交

注意不要把dist目录下的文件提交到EndingSmart项目中，只需要将你创建出来的整个文件夹提交就行
提交文件时请先参考 前端相关规范

5、制作规范*

调用ending页统一的方法为 showEnding，ending页的容器名为endingContainer
所有ending页制作都在projects文件夹下并创建新的文件来制作，创建文件名和入口文件名建议以需求ID名_项目名称一致，如：


注意：
项目中要用到背景图或者图片标签时，一定要把图的宽度定死，防止后面仓库等比压缩时导致ending页效果呈现失效
如果要动态用到图片时必须先用getAssestByUrl方法，调用时必须要判断此方法是否存在，如：img.src = window.hasOwnProperty('getAssestByUrl') ? getAssestByUrl('图片引入路径') : '图片引入路径'
写媒体查询时不要用device属性
如果要用到html文件时，文件只需要创建body下的结构，如下图

在dist/TestEnding要求把所需的资源替换掉，替换资源如下：
                 -- resource 资源
                 ----------- config
                 ------------------ gameConfig.json 玩法配置，没有玩法也需要增加这个文件，文件内容是空的对象
                 ------------------ language.json 代码字配置
                 ----------- ending 游戏结束阶段所需资源

而在创建出来的文件目录要求：
                 -- js 脚本
                 -- resource 资源
                 ----------- config
                 ------------------ gameConfig.json 玩法配置，没有玩法也需要增加这个文件，文件内容是空的对象
                 ------------------ language.json 代码字配置
                 ----------- ending 游戏结束阶段所需资源
                 -- style 样式
                 -- 入口文件
```
通用模块必须导入创建的入口文件中*

通用模块引用要求：
```js
// 通用资源，必须引入
import '@/common/style/common.scss'
import { replaceResource, getElement, fullScreenClick, updateTextStyle, updateImgByLanguage, endingToInstall } from '@/utils'

// 引入xtween,cssbinder用于做css动画
import { XTween, xtween } from '../../utils/XTween'
import CSSBinder from '../../utils/CSSBinder'

/**
 * ending页入口函数
 * @param {boolean} isVictory 是否为胜利页，不传默认为true
 * @param {object} {globalClick, autoClick} 可选，后续有参数就添加只这个对象中，其中globalClick: 全屏可点阀值，默认值为false； autoClick: 自动跳转阀值，默认值为false，默认值为false
 */
function showEnding (isVictory = true, { globalClick, autoClick } = { globalClick: false, autoClick: false }) {
  closeEnding()
  // 全屏可点默认值
  globalClick = Boolean(globalClick)
  // 自动跳转默认值
  autoClick = Boolean(autoClick)
  // 更多代码...

  // 容器要替换的html结构内容，如需导入art或html都可以用此变量做拼接即可
  let html
  const container = document.createElement('div')
  container.id = 'endingContainer'
  document.body.appendChild(container)
  const endingContainer = getElement('#endingContainer')[0]
  endingContainer.innerHTML = html

  // 提供代码字多语言替换模版，后续可根据项目具体改变
  const lang = {
    '.install-btn-text': 'Download'
  }
  Object.keys(lang).map(key => updateTextStyle(getElement(key)[0], lang[key]))

  // 替换资源
  replaceResource()
  // 多语言图片字,需要放在replaceResource后面
  updateImgByLanguage(getElement('.logo')[0])
  // 如果全屏点击后，需要回调，则调用fullScreenClick时，加回调函数作为第二个参数传进去
  fullScreenClick(globalClick)
  // 自动跳转商店
  autoClick && window.MW_CONFIG && !window.MW_CONFIG['disable_auto_click'] && endingToInstall()
  // 初始化xtween,cssbinder
  setInterval(XTween.intialize(), 1)
  CSSBinder.initialize()
  // 更多代码...
}

/**
 * 移除ending页
 */
function closeEnding () {
  getElement('#endingContainer')[0] && getElement('#endingContainer')[0].remove()
}

window.endingSmart = {
  showEnding,
  closeEnding
}
window.showEnding = showEnding
window.closeEnding = closeEnding
```

## 6、api接口
```js
/**
 * ending页入口函数
 * @param {boolean} isVictory 是否为胜利页，不传默认为true
 * @param {object} {globalClick, autoClick} 可选，后续有参数就添加只这个对象中
 */
showEnding(isVictory = true, { globalClick, autoClick } = { globalClick: false, autoClick: false })
调用例如：showEnding(false, { globalClick: true, autoClick: true, score:2333, name:"Hugo" })

/**
 * 移除ending页
 */
closeEnding()
调用例如：closeEnding()

/**
 * 替换资源 说明 data-path是默认的图片资源，data-l-path是横屏资源替换，data-p-path是竖屏资源替换，如果有img、audio、video这些标签会替换成src，其他替换成背景图
 */
replaceResource()
调用例如：replaceResource()

/**
 * 更新多语言文字 说明 如果标签已经有用背景图的话会将background-image替换掉
 * @param {HTMLElement} el DOM元素
 * @param {string} languageKey 多语言包的key
 */
updateTextStyle(el, languageKey)
调用例如：let endingDownload = document.querySelector('.ending-download')
        updateTextStyle(endingDownload, 'Download')

/**
 * 跳转游戏页
 * @param {Function} callback 回调，可不传
 */
endingRetryGame(callback)
调用例如：不传参 endingRetryGame() 传参 endingRetryGame(()=>{console.log('retry')})

/**
 * 跳往商店
 */
endingToInstall()
调用例如：endingToInstall()

/**
 * 发送埋点
 * @param {number | string} action 埋点
 */
endingToSendAction(action)
调用例如：endingToSendAction(7)

/**
 * 获取重玩次数
 * returns {number} 重玩次数
 */
getPlayAgain()
调用例如：let playAgain = getPlayAgain()

/**
 * 对有多语言图片的DOM元素进行更换, 必须放在replaceResource()后面
 * @param {HTMLElement} el DOM元素
 */
updateImgByLanguage(el)
调用例如：let logo = document.querySelector('.logo')
        updateImgByLanguage(logo)

/**
 * css xtween动画用法
 */
  const box = document.getElementById('box')
  let boxStyle = CSSBinder.bind(box.style, box)
  xtween(boxStyle)
    .to(1000, { scaleX: 1.2, scaleY: 1.2 }, { easing: XTween.Easing.Linear.Node })
    .call(() => {
      xtween(boxStylea).to(500, { marginLeft: 10 }).start()
    })
    .start()
```

## 7、当前问题
```
无法使用龙骨
无法使用粒子
无法使用颜色滤镜
无法使用遮罩
```
