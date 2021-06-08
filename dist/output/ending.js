/*! For license information please see ending.js.LICENSE.txt */
!function(){var t={521:function(t,n,e){var i=e(779);t.exports=function(t){"use strict";t=t||{};var n="",e=i.$escape,r=t.imgSrc,o=t.msg;return n+='<div class="a2" data-path="',n+=e(r),n+='">\n  ',(n+=e(o))+"\n</div>\n"}},585:function(t,n,e){"use strict";var i="undefined"!=typeof self?self:"undefined"!=typeof window?window:void 0!==e.g?e.g:{},r=Object.create(i),o=/["&'<>]/;function a(t){return"string"!=typeof t&&(t=null==t?"":"function"==typeof t?a(t.call(t)):JSON.stringify(t)),t}r.$escape=function(t){return function(t){var n=""+t,e=o.exec(n);if(!e)return t;var i="",r=void 0,a=void 0,c=void 0;for(r=e.index,a=0;r<n.length;r++){switch(n.charCodeAt(r)){case 34:c="&#34;";break;case 38:c="&#38;";break;case 39:c="&#39;";break;case 60:c="&#60;";break;case 62:c="&#62;";break;default:continue}a!==r&&(i+=n.substring(a,r)),a=r+1,i+=c}return a!==r?i+n.substring(a,r):i}(a(t))},r.$each=function(t,n){if(Array.isArray(t))for(var e=0,i=t.length;e<i;e++)n(t[e],e);else for(var r in t)n(t[r],r)},t.exports=r},779:function(t,n,e){"use strict";t.exports=e(585)},281:function(t,n,e){"use strict";e.d(n,{Z:function(){return o}});var i=e(645),r=e.n(i)()((function(t){return t[1]}));r.push([t.id,'*{margin:0;padding:0;box-sizing:border-box}body,html{width:100%;height:100%;overflow:hidden;font-family:SimHei Arial SimSun Micrasoft YaHei Helvetica}*[class="language-"]{text-align:center}*[data-before]{text-align:center;z-index:unset !important;-webkit-background-clip:text;background-clip:text;position:relative}*[data-before]::before{width:100%;height:100%;text-align:center;content:attr(data-text);position:absolute;left:0;top:0;right:0;bottom:0;margin:auto;z-index:-10 !important}#endingContainer{width:100vw;height:100vh;position:fixed;left:0;top:0;right:0;bottom:0;z-index:2000}.ctat{width:82.67vmin;height:33.33vmin;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;background-size:contain;background-repeat:no-repeat;position:relative;z-index:1}.ctat .ctat_text{width:66.67vmin;height:20vmin;text-align:center;line-height:20vmin}.center-layout{position:absolute;top:0;left:0;bottom:0;right:0;margin:auto}\n',""]);const o=r},446:function(t,n,e){"use strict";e.d(n,{Z:function(){return o}});var i=e(645),r=e.n(i)()((function(t){return t[1]}));r.push([t.id,".test{width:13.33vmin;height:13.33vmin;background-color:white;border:1px solid black;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center}\n",""]);const o=r},121:function(t,n,e){"use strict";e.d(n,{Z:function(){return o}});var i=e(645),r=e.n(i)()((function(t){return t[1]}));r.push([t.id,"#endingContainer {\n  width: 100vw;\n  height: 100vh;\n  position: absolute;\n  top: 0;\n  left: 0;\n  bottom: 0;\n  right: 0;\n  z-index: 2000;\n}\n\n.a1 {\n  width: 82.67vmin;\n  height: 33.33vmin;\n  background-size: contain;\n  text-align: center;\n  line-height: 33.33vmin;\n  font-size: 10.67vmin;\n}\n\n.a2 {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background-size: cover;\n}\n\n.c1 {\n  -webkit-transform: translateY(-33.33vmin);\n      -ms-transform: translateY(-33.33vmin);\n          transform: translateY(-33.33vmin);\n}\n.c3 {\n  -webkit-transform: translateY(33.33vmin);\n      -ms-transform: translateY(33.33vmin);\n          transform: translateY(33.33vmin);\n}\n",""]);const o=r},645:function(t){"use strict";t.exports=function(t){var n=[];return n.toString=function(){return this.map((function(n){var e=t(n);return n[2]?"@media ".concat(n[2]," {").concat(e,"}"):e})).join("")},n.i=function(t,e,i){"string"==typeof t&&(t=[[null,t,""]]);var r={};if(i)for(var o=0;o<this.length;o++){var a=this[o][0];null!=a&&(r[a]=!0)}for(var c=0;c<t.length;c++){var s=[].concat(t[c]);i&&r[s[0]]||(e&&(s[2]?s[2]="".concat(e," and ").concat(s[2]):s[2]=e),n.push(s))}},n}},379:function(t,n,e){"use strict";var i,r=function(){var t={};return function(n){if(void 0===t[n]){var e=document.querySelector(n);if(window.HTMLIFrameElement&&e instanceof window.HTMLIFrameElement)try{e=e.contentDocument.head}catch(t){e=null}t[n]=e}return t[n]}}(),o=[];function a(t){for(var n=-1,e=0;e<o.length;e++)if(o[e].identifier===t){n=e;break}return n}function c(t,n){for(var e={},i=[],r=0;r<t.length;r++){var c=t[r],s=n.base?c[0]+n.base:c[0],l=e[s]||0,u="".concat(s," ").concat(l);e[s]=l+1;var d=a(u),f={css:c[1],media:c[2],sourceMap:c[3]};-1!==d?(o[d].references++,o[d].updater(f)):o.push({identifier:u,updater:v(f,n),references:1}),i.push(u)}return i}function s(t){var n=document.createElement("style"),i=t.attributes||{};if(void 0===i.nonce){var o=e.nc;o&&(i.nonce=o)}if(Object.keys(i).forEach((function(t){n.setAttribute(t,i[t])})),"function"==typeof t.insert)t.insert(n);else{var a=r(t.insert||"head");if(!a)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");a.appendChild(n)}return n}var l,u=(l=[],function(t,n){return l[t]=n,l.filter(Boolean).join("\n")});function d(t,n,e,i){var r=e?"":i.media?"@media ".concat(i.media," {").concat(i.css,"}"):i.css;if(t.styleSheet)t.styleSheet.cssText=u(n,r);else{var o=document.createTextNode(r),a=t.childNodes;a[n]&&t.removeChild(a[n]),a.length?t.insertBefore(o,a[n]):t.appendChild(o)}}function f(t,n,e){var i=e.css,r=e.media,o=e.sourceMap;if(r?t.setAttribute("media",r):t.removeAttribute("media"),o&&"undefined"!=typeof btoa&&(i+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(o))))," */")),t.styleSheet)t.styleSheet.cssText=i;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(i))}}var p=null,g=0;function v(t,n){var e,i,r;if(n.singleton){var o=g++;e=p||(p=s(n)),i=d.bind(null,e,o,!1),r=d.bind(null,e,o,!0)}else e=s(n),i=f.bind(null,e,n),r=function(){!function(t){if(null===t.parentNode)return!1;t.parentNode.removeChild(t)}(e)};return i(t),function(n){if(n){if(n.css===t.css&&n.media===t.media&&n.sourceMap===t.sourceMap)return;i(t=n)}else r()}}t.exports=function(t,n){(n=n||{}).singleton||"boolean"==typeof n.singleton||(n.singleton=(void 0===i&&(i=Boolean(window&&document&&document.all&&!window.atob)),i));var e=c(t=t||[],n);return function(t){if(t=t||[],"[object Array]"===Object.prototype.toString.call(t)){for(var i=0;i<e.length;i++){var r=a(e[i]);o[r].references--}for(var s=c(t,n),l=0;l<e.length;l++){var u=a(e[l]);0===o[u].references&&(o[u].updater(),o.splice(u,1))}e=s}}}}},n={};function e(i){var r=n[i];if(void 0!==r)return r.exports;var o=n[i]={id:i,exports:{}};return t[i](o,o.exports,e),o.exports}e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,{a:n}),n},e.d=function(t,n){for(var i in n)e.o(n,i)&&!e.o(t,i)&&Object.defineProperty(t,i,{enumerable:!0,get:n[i]})},e.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"==typeof window)return window}}(),e.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},function(){"use strict";var t=e(521),n=e.n(t);const i='<div class="center-layout a1 c1" data-path="./resource/ending/group_cta/ctat_btn.png"> Download </div> <div class="center-layout a1" data-path="./resource/ending/group_cta/ctat_btn.png"> Download </div> <div class="center-layout a1 c3" data-path="./resource/ending/group_cta/ctat_btn.png"> Download </div> ';var r=e(379),o=e.n(r),a=e(121);o()(a.Z,{insert:"head",singleton:!1}),a.Z.locals;var c=e(446);o()(c.Z,{insert:"head",singleton:!1}),c.Z.locals;var s=e(281);function l(t,n){(null==n||n>t.length)&&(n=t.length);for(var e=0,i=new Array(n);e<n;e++)i[e]=t[e];return i}function u(t){return function(t){if(Array.isArray(t))return l(t)}(n=document.querySelectorAll(t))||function(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}(n)||function(t,n){if(t){if("string"==typeof t)return l(t,n);var e=Object.prototype.toString.call(t).slice(8,-1);return"Object"===e&&t.constructor&&(e=t.constructor.name),"Map"===e||"Set"===e?Array.from(t):"Arguments"===e||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e)?l(t,n):void 0}}(n)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}();var n}function d(){var t={img:function(t,n){t.setAttribute("src",n)},audio:function(t,n){t.setAttribute("src",n)},vedio:function(t,n){t.setAttribute("src",n)},default:function(t,n){t.setAttribute("style","background-image: url("+n+")")}};function n(n){u("["+n+"]").map((function(e){var i=window.hasOwnProperty("getAssestByUrl")?getAssestByUrl(e.getAttribute(n)):e.getAttribute(n);if(i){var r=e.tagName.toLowerCase();t[r]?t[r](e,i):t.default(e,i)}else console.warn("没有找到"+i+"资源")}))}n("data-path"),"portrait"==(window.innerHeight>window.innerWidth?"portrait":"landscape")?n("data-p-path"):n("data-l-path")}function f(t,n){document.getElementById("endingContainer").onclick=function(e){if(e.stopPropagation(),t&&window.hasOwnProperty("MW_CONFIG")&&!window.MW_CONFIG.disable_global_click)return console.log("全屏可点"),function(){try{window.ps&&ps.install?ps.install():window.pl&&pl.install?pl.install():window.Mapi&&Mapi.install?Mapi.install():window.install&&window.install()}catch(t){}}(),void(n&&n());console.log("全屏不可点")}}o()(s.Z,{insert:"head",singleton:!1}),s.Z.locals,window.showEnding=function(){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{globalClick:!1,autoClick:!1},e=t.globalClick,r=t.autoClick;u("#endingContainer")[0]&&u("#endingContainer")[0].remove(),e=Boolean(e),r=Boolean(r);var o=n()({imgSrc:"./resource/ending/p_bg.jpg",msg:"调试ending页"});o+=i;var a=document.createElement("div");a.id="endingContainer",document.body.appendChild(a);var c=u("#endingContainer")[0];c.innerHTML=o,d(),f(r)}}()}();