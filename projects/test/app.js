import art from './app.art'
import h from './app.html'
import './style/app.css'
import './style/app.scss'

// 引入xtween,cssbinder用于做css动画
import { XTween, xtween } from '../../utils/XTween'
import CSSBinder from '../../utils/CSSBinder'

// 通用资源，必须引入
import '@/common/style/common.scss'
import { replaceResource, getElement, fullScreenClick, updateTextStyle, updateImgByLanguage, endingToInstall } from '@/utils'

function getEndingContainer () {
  const endingContainer = getElement('#endingContainer')[0]
  if (endingContainer) return endingContainer
  return null
}

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

  let html = art({
    imgSrc: './resource/ending/p_bg.jpg',
    msg: '调试ending页'
  })
  html += h
  const container = document.createElement('div')
  container.id = 'endingContainer'
  document.body.appendChild(container)
  const endingContainer = getElement('#endingContainer')[0]
  endingContainer.innerHTML = html
  // 代码字多语言
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
  autoClick && window.MW_CONFIG && !window.MW_CONFIG["disable_auto_click"] && endingToInstall()

  // 初始化xtween,cssbinder，具体用法移步开发文档
  setInterval(XTween.intialize(), 1)
  CSSBinder.initialize()

  // 更多代码...
}

function closeEnding () {
  const ending = getEndingContainer()
  if (ending) {
    ending.remove()
  }
}

window.endingSmart = {
  showEnding,
  closeEnding
}
window.showEnding = showEnding
window.closeEnding = closeEnding
