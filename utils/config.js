export const config = {
  designWidth: 750,
  designHeight: 1334
}
export const tagUtils = {
  img: function (el, resource) {
    el.setAttribute('src', resource)
  },
  audio: function (el, resource) {
    el.setAttribute('src', resource)
  },
  video: function (el, resource) {
    el.setAttribute('src', resource)
  },
  default: function (el, resource) {
    el.setAttribute('style', 'background-image: url(' + resource + ')')
  }
}
