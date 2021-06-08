import html from './index.html'
import './style/ending.scss'

// 通用资源，必须引入
import '@/common/style/common.scss'
import { replaceResource, getElement, updateTextStyle, fullScreenClick, endingToInstall, endingRetryGame, endingToSendAction, getPlayAgain } from '@/utils'

/**
 * ending页入口
 * @param {boolean} isVictory 是否是胜利页面
 */
function showEnding (isVictory) {
  document.getElementById('endingContainer') && document.getElementById('endingContainer').remove()
  const endingContainer = document.createElement('div')
  const setting = {
    '.ending-title-KO': 'KO',
    '.ending-install-Download': 'Download',
    '.ending-install-Retry': 'Retry'
  }

  endingContainer.id = 'endingContainer'
  document.body.appendChild(endingContainer)
  getElement('#endingContainer')[0].innerHTML = html
  replaceResource()

  !isVictory ? getElement('.ending-container')[0].className += ' ending-defeat' : ''
  getElement('.ending-retry')[0].style.display = isVictory ? 'none' : 'flex'
  Object.keys(setting).map(key => updateTextStyle(getElement(key)[0], setting[key]))
  setTimeout(() => {
    getElement('.ending-title')[0].style.visibility = 'visible'
    getElement('.ending-title > span')[0].style.visibility = 'visible'
    getElement('.ending-btn').map(el => el.style.animation = 'enlarge_btn .5s infinite')
  }, 1000)

  getPlayAgain() == 0 && window.MW_CONFIG && window.MW_CONFIG.channel === 'pangle' && (getElement('.ending-retry')[0].style.display = 'none')

  getElement('#endingContainer')[0].onclick = function () {
    fullScreenClick(GAME_CFG.AllClick, () => { })
  }
  getElement('.ending-download > span')[0].onclick = function (e) {
    e.stopPropagation()
    endingToInstall()
  }
  getElement('.ending-retry > span')[0].onclick = function (e) {
    e.stopPropagation()
    if (getPlayAgain() > 0) {
      endingRetryGame(() => {
        endingToSendAction(7)
        console.log('%c 🍠 action&action=7 : ', 'font-size:20px;background-color: #42b983;color:#fff;', 'action&action=7')
      })
    } else {
      endingToInstall()
      endingToSendAction(9)
      console.log('%c 🍠 action&action=9 : ', 'font-size:20px;background-color: #42b983;color:#fff;', 'action&action=9')
    }
  }
}
window.showEnding = showEnding
