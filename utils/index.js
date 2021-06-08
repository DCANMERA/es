import { config, tagUtils } from './config'

/**
 * 窗口重置
 * @param {Function} recalc 窗口重置回调
 */
export function windowResize(recalc) {
  (function (doc, win) {
    const resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize'
    if (!doc.addEventListener && !recalc) return
    if (win) {
      return win.addEventListener(resizeEvt, () => recalc(), false)
    }
    doc.addEventListener('DOMContentLoaded', () => recalc(), false)
  })(document, window)
}

/**
 * 获取DOM元素
 * @param {selector} 选择器
 * @returns {array} DOM元素
 */
export function getElement(selector) {
  return [...document.querySelectorAll(selector)]
}

/**
 * 替换资源
 */
export function replaceResource() {
  function replace(attr) {
    const els = getElement('[' + attr + ']')
    els.map(el => {
      const resource = window.hasOwnProperty('getAssestByUrl') ? getAssestByUrl(el.getAttribute(attr)) : el.getAttribute(attr)
      if (resource) {
        const tagName = el.tagName.toLowerCase()
        tagUtils[tagName] ? tagUtils[tagName](el, resource) : tagUtils.default(el, resource)
      } else {
        console.warn('没有找到' + resource + '资源')
      }
    })
  }

  // 默认资源替换
  replace('data-path')
  if (getOrientation() === 'portrait') {
    // 竖屏资源替换
    replace('data-p-path')
  } else {
    // 横屏资源替换
    replace('data-l-path')
  }
}

/**
 * 判断横竖屏
 * @returns 'portrait' | 'landscape'
 */
export function getOrientation() {
  if (window.innerHeight > window.innerWidth) {
    return 'portrait'
  }
  return 'landscape'
}

/**
 * 给元素添加动画
 * @param {HTMLElement} el DOM元素
 * @param {object} animationInfo 动画配置(具体参考动画属性)
 */
export function addAnimation(el, animationInfo) {
  const {
    animationName,
    animationDuration,
    animationTimingFunction,
    animationDelay,
    animationIterationCount,
    animationDirection,
    animationFillMode,
    animationPlayState,
  } = animationInfo
  const animationMode = `${animationName} ${animationDuration} ${animationTimingFunction} ${animationDelay} ${animationIterationCount} ${animationDirection} ${animationFillMode} ${animationPlayState}`.replaceAll(
    'undefined',
    ''
  )
  el.style.animation = animationMode
}

/**
 * 监听DOM元素动画结束
 * @param {HTMLElement} el DOM元素
 * @param {Function} callback 动画结束回调函数
 */
export function monitorAnimationEnd(el, callback) {
  el.addEventListener('animationend', function () {
    callback(...arguments)
  })
}

/**
 * 获取多语言信息
 * @param {string} key 对应多语言key值
 * @returns {object} 包含多语言值和对应样式的对象
 */
export function getTextInfo(key) {
  try {
    return languagesMgr.getCfg(key)
  } catch (e) { }
}

/**
 * 添加样式
 * @param {string} selector 选择器
 * @param {string} style 样式：`font-size: 40px; color: #FFF`
 */
export function addStyle(selector, style) {
  document.styleSheets[0].addRule(selector, style)
}

/**
 * 更新多语言文字
 * @param {HTMLElement} el DOM元素
 * @param {string} languageKey 多语言包的key
 */
export function updateTextStyle(el, languageKey) {
  const setting = getTextInfo(languageKey)
  const name = setting.name ? setting.name : ''
  const value = setting.value ? setting.value : ''
  const styles = setting.style ? JSON.parse(JSON.stringify(setting.style)) : {}
  const className = `languages-${languageKey.replace(/\s+/gi, '')}`

  if (styles) {
    Object.keys(styles).map(key => {
      return Array.isArray(styles[key]) && (styles[key] = `rgba(${styles[key].join(',')})`)
    })
  }

  el.innerText = value
  el.className += ` languages ${className}`
  el.setAttribute('data-name', name)
  el.setAttribute('data-key', languageKey)
  el.setAttribute('data-text', value)

  const browserPrefixList = ['-webkit-', '-ms-', '-moz-', '-o-']
  const styleUtils = {
    font: function (params) {
      return {
        before: false, // 是否追加到伪类上 false：不追加，反之
        key: 'font-family',
        value: params.font
      }
    },

    fontSize: function (params) {
      const size = params.fontSize / config.designWidth * 100
      const lh = el.clientHeight
      return {
        before: false,
        key: ['font-size', 'line-height'],
        value: [size + 'vmin', lh + 'px']
      }
    },

    color: function (params) {
      return {
        before: false,
        key: 'color',
        value: params.color
      }
    },

    alpha: function (params) {
      return {
        before: false,
        key: 'opacity',
        value: params.alpha
      }
    },

    bold: function (params) {
      return {
        before: false,
        key: 'font-weight',
        value: params.bold ? 'bold' : 'normal'
      }
    },

    italic: function (params) {
      return {
        before: false,
        key: 'font-style',
        value: params.italic ? 'italic' : 'normal'
      }
    },

    gradient: function (params) {
      if (!params.gradient) {
        return {
          before: false,
          key: '',
          value: ''
        }
      }
      const defaultKey = 'background-image'
      const clipKey = 'background-clip'
      const fillKey = 'text-fill-color'
      const gradientKey = [clipKey, fillKey]
      const keyList = [...gradientKey]
      const startColor = params.startColor
      const endColor = params.endColor

      browserPrefixList.map(prefix => {
        keyList.unshift(defaultKey)
        gradientKey.map(key => keyList.push(prefix + key))
      })
      keyList.unshift(defaultKey)

      return {
        before: false,
        key: keyList,
        value: keyList.map((key, index) => {
          if (key === defaultKey) {
            return `${index < browserPrefixList.length ? browserPrefixList[index] : ''}linear-gradient(${startColor} 0%, ${endColor} 100%) !important`
          }
          if (key.includes(clipKey)) {
            return 'text'
          }
          if (key.includes(fillKey)) {
            return 'transparent'
          }
        })
      }
    },

    enableShadow: function (params) {
      if (!params.enableShadow) {
        return {
          before: false,
          key: '',
          value: ''
        }
      }
      const shadowOffsetX = params.shadowOffsetX ? params.shadowOffsetX : 0
      const shadowOffsetY = params.shadowOffsetY ? params.shadowOffsetY : 0
      const shadowBlur = params.shadowBlur ? params.shadowBlur : 0
      const shadowColor = params.shadowColor ? params.shadowColor : '#fff'
      return {
        before: false,
        key: 'filter',
        value: `drop-shadow(${shadowOffsetX}px ${shadowOffsetY}px ${shadowBlur}px ${shadowColor})`
      }
    },

    stroke: function (params) {
      // css 是居中描边，游戏引擎是外描边
      let defaultKey = 'text-stroke'
      let keyList = [defaultKey]
      let stroke = params.stroke ? params.stroke : 0
      let strokeColor = params.strokeColor ? params.strokeColor : 'transparent'

      browserPrefixList.map(prefix => {
        keyList.push(prefix + defaultKey)
      })

      return {
        before: true,
        key: keyList,
        value: keyList.map(() => {
          const isLandscape = document.documentElement.clientWidth > document.documentElement.clientHeight
          const size = isLandscape ? stroke / config.designHeight * 100 : stroke / config.designWidth * 100
          return `${size}vw ${strokeColor}`
        })
      }
    },

    enableGlow: function (params) {
      if (!params.enableGlow) {
        return {
          before: true,
          key: '',
          value: ''
        }
      }
      const glowBlur = params.glowBlur ? params.glowBlur : 0
      const glowColor = params.glowColor ? params.glowColor : 'transparent'
      return {
        before: true,
        key: 'text-shadow',
        value: `0.5vw 0.5vw ${glowBlur}vw ${glowColor}`
      }
    }
  }

  function setStyle(key) {
    if (key in styles) {
      const res = styleUtils[key](styles)
      if (res.before) {
        el.setAttribute('data-before', '')
        Array.isArray(res.key)
          ? addStyle(`.${className}::before`, res.key.map((props, index) => `${props}: ${res.value[index]};`).join(' '))
          : addStyle(`.${className}::before`, `${res.key}: ${res.value};`)
      } else {
        Array.isArray(res.key)
          ? addStyle(`.${className}`, res.key.map((props, index) => `${props}: ${res.value[index]};`).join(' '))
          : el.style[res.key] = res.value
      }
    }
  }

  Object.keys(styleUtils).map(key => setStyle(key))
  windowResize(() => ['fontSize', 'stroke'].map(key => setStyle(key)))
}

/**
 * 全屏可点
 * @param {boolean} isAllClick 是否全局可点
 * @param {Function} callback 全屏可点回调
 */
export function fullScreenClick(isAllClick, callback) {
  document.getElementById('endingContainer').onclick = function (e) {
    e.stopPropagation()
    if (isAllClick && (!window.MW_CONFIG || !window.MW_CONFIG["disable_global_click"])) {
      console.log('全屏可点')
      endingToInstall()
      callback && callback()
      return
    }
    console.log('全屏不可点')
  }
}

/**
 * 跳往商店
 */
export function endingToInstall() {
  try {
    if (window['ps'] && ps.install) {
      ps.install()
      return true
    }
    if (window['pl'] && pl.install) {
      pl.install()
      return true
    }
    if (window['Mapi'] && Mapi.install) {
      Mapi.install()
      return true
    }
    if (window['install']) {
      window.install()
      return true
    }
    return false
  } catch (e) { }
}


const actionRecord = {}
/**
 * 发送埋点
 * @param {number | string} action 埋点
 */
export function endingToSendAction(action, once = true) {
  const sendPoint = action => window['HttpAPI'] && window['HttpAPI'].sendPoint('action&action=' + action)

  try {
    if (window['ps'] && ps.sendAction) {
      ps.sendAction(action, once)
    } else if (window['pl'] && pl.sendAction) {
      pl.sendAction(action, once)
    } else if (window['Mapi'] && Mapi.sendAction) {
      Mapi.sendAction(action, once)
    } else if (window['sendAction']) {
      window.sendAction(action, once)
    } else {
      if (once && actionRecord[action]) return
      else {
        sendPoint(action)
      }
      actionRecord[action] = true
    }
  } catch (e) { }
}

/**
 * 跳转游戏页
 * @param {Object} param 传入对象，回调和手动移除结束界面   {callback:()=>{},manualRemove:boolean}
 */
export function endingRetryGame(param) {
  try {
    if (window['ps']) {
      ps.retry && ps.retry()
    } else if (window['pl']) {
      pl.retry && pl.retry()
    } else if (window['Mapi']) {
      Mapi.gameRetry && Mapi.gameRetry()
    } else {
      window.gameRetry && window.gameRetry()
    }
    if (GAME_CFG) {
      ps && (ps.playerRetry = true)
      GAME_CFG.playAgain--
    }
    param && param.callback && param.callback()
    if (!param || !param.manualRemove) {
      document.getElementById('endingContainer') && document.getElementById('endingContainer').remove()
    }

  } catch (e) { }
}

/**
 * 获取重玩次数
 */
export function getPlayAgain() {
  try {
    if (GAME_CFG) {
      return GAME_CFG.playAgain
    }
    if (GameMgr) {
      return GameMgr.getConfig('playAgain')
    }
  } catch (e) { }
}

/**
 * 对有多语言图片的DOM元素进行更换
 * @param {HTMLElement} el DOM元素
 */
export function updateImgByLanguage(el) {
  let lang = languagesMgr.language;
  const properties = ["data-p-path", "data-l-path", "data-path"]
  let url = properties.map((prop) => {
    return el.getAttribute(prop)
  })

  if (url.some((val) => {
    if (typeof (val) === 'string') return true
  })) {
    var relativeAddr = url.map((val) => {
      if (val) {
        var addrIdx = val.lastIndexOf("/")
        return val.slice(0, addrIdx + 1)
      } else {
        return void 0
      }
    })
    var filename = url.map((val) => {
      if (val) {
        var addrIdx = val.lastIndexOf("/")
        return val.slice(addrIdx + 1, val.length)
      } else {
        return void 0
      }

    })

    if (window["assetsPackage"]) {
      ((filename) => {
        var before = filename.map((val) => { //计算文件名中语言前面的部分
          if (val) {
            var key = val.replace(".", "_");
            var beforeIdx = key.indexOf("-");
            if (beforeIdx !== -1) return key.slice(0, beforeIdx);
          } else return void 0
        })

        var after = filename.map((val) => {//计算文件名中语言后面的部分
          if (val) {
            var afterIdx = val.lastIndexOf(".");
            if (afterIdx !== -1) return val.slice(afterIdx, val.length).replace(".", "_");
          } else return void 0
        })

        function replace(file, index) {
          let newUrl = relativeAddr[index] + file
          el.setAttribute(properties[index], newUrl.includes('data:image') ? newUrl : getAssestByUrl(newUrl));
        }

        before.forEach((beforeVal, index) => {//对每一条记录进行处理
          if (!beforeVal) return
          var key = beforeVal + "-" + lang + after[index];
          var file = beforeVal + "-" + lang + after[index].replace("_", ".");
          if (!window["assetsPackage"][key]) {
            key = beforeVal + "-" + languagesMgr.fallbackLocale + after[index];
            file = beforeVal + "-" + languagesMgr.fallbackLocale + after[index].replace("_", ".");
            console.warn("没有找到“" + lang + "”语言对应图片资源(base64) " + key);
            if (!window["assetsPackage"][key]) {
              console.warn("没有找到兜底语言对应图片资源(base64) " + key);
            } else {
              replace(file, index)
            }
          } else {
            replace(file, index)
          }
        })
      })(filename);
    } else {
      ((url) => {
        var before = url.map((val) => {
          if (val) {
            var beforeIdx = val.indexOf("-");
            if (beforeIdx !== -1) {
              return val.slice(0, beforeIdx);
            }
          } else return void 0
        })

        var after = url.map((val) => {
          if (val) {
            var afterIdx = val.lastIndexOf(".");
            if (afterIdx !== -1) {
              return val.slice(afterIdx, val.length)
            }
          } else return void 0
        })

        function localResult(url) {
          var xmlHttp;
          if (window.ActiveXObject) {
            xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
          } else if (window.XMLHttpRequest) {
            xmlHttp = new XMLHttpRequest();
          }
          xmlHttp.open("get", url, false);
          xmlHttp.send();
          if (xmlHttp.readyState == 4) {
            if (xmlHttp.status == 200) {
              return true; //url存在
            } else return false; //其他状态
          }
          return false;
        }
        before.map((beforeVal, index) => {
          if (!beforeVal) return
          url = beforeVal + "-" + lang + after[index];

          if (!localResult(url)) {
            console.warn("没有找到“" + lang + "”语言对应图片资源 " + url);
            url = beforeVal + "-" + languagesMgr.fallbackLocale + after[index];
            if (!localResult(url)) {
              console.warn("没有找到兜底语言对应图片资源 " + url);
              return;
            } else {
              el.setAttribute(properties[index], url);
            }
          } else {
            el.setAttribute(properties[index], url);
          }
        })
      })(url);
    }
  }
  replaceResource()
}

/**
 * 播放音效
 */
export function playSound(url, playtime) {
  if (!window.playSoundEff) return
  window.playSoundEff(url, playtime);
}
