import {
  log,
} from './utils'
const callapp = {}
const win = window

// Just for better debugging
let ua = win.navigator.userAgent
if (win.sessionStorage && win.sessionStorage.DEBUG_SCHEME_UA) {
  ua = win.sessionStorage.SCHEME_UA
}

// detect OS and it's version
let isAndroid = false
let isIOS = false
let osVersion = ''
let matched = ua.match(/Android[\s/]([\d.]+)/)
if (matched) {
  isAndroid = true
  osVersion = matched[1]
} else if (ua.match(/(iPhone|iPad|iPod)/)) {
  isIOS = true
  matched = ua.match(/OS ([\d_.]+) like Mac OS X/)
  if (matched) {
    osVersion = matched[1].split('_').join('.')
  }
}

// detect browser
let isChrome = false
let isSafari = false
if (ua.match(/\b(?:Chrome|CriOS|CrMo)\/([\d.\s]+Mobile)/)) {
  isChrome = true
} else if (ua.match(/iPhone|iPad|iPod/)) {
  if (ua.match(/Safari/) && ua.match(/Version\/([\d.]+)/)) {
    isSafari = true
  }
}

const doc = win.document

callapp.gotoPage = function gotoPage ({
  urlScheme,
  androidPackageName,
  androidIntentScheme,
  forceIntent = false,
}) {
  // intent https://developer.chrome.com/multidevice/android/intents
  // Android Chrome browser（include Android's build-in Chrome browser）use intent
  const isAndroidChrome = isAndroid && isChrome
  // iOS 9.0 and later, use href with a tag
  const ios9SafariFix = isIOS && verCompare(osVersion, '9.0') >= 0 && isSafari

  // Chrome or forseIntent
  if (isAndroidChrome || forceIntent) {
    // use intent if has androidIntentScheme option
    if (androidIntentScheme) {
      log(`use input intent scheme: ${androidIntentScheme}`)
      deferRedirect(androidIntentScheme)
      return
    }
    const protocol = urlScheme.substring(0, urlScheme.indexOf('://'))
    const hash = `#Intent;scheme=${protocol};package=${androidPackageName};end`
    let autoBuildIntent = urlScheme.replace(/.*?:\/\//, 'intent://')
    autoBuildIntent += hash
    log(`auto build intent scheme: ${autoBuildIntent}`)
    deferRedirect(autoBuildIntent)
    return
  }

  if (ios9SafariFix) {
    log(`iOS 9 and later use anchor link: ${urlScheme}`)
    setTimeout(() => {
      useAnchorLink(urlScheme)
    }, 100)
    return
  }

  // iOS9 and earlier, and other Android browsers
  // use location.href directly
  log(`redirect directly : ${urlScheme}`)
  deferRedirect(urlScheme)
}

// util functions
function useAnchorLink (url) {
  log(`redirect via anchor: ${url}`)
  const a = doc.createElement('a')
  a.setAttribute('href', url)
  a.style.display = 'none'
  doc.body.appendChild(a)

  const e = doc.createEvent('HTMLEvents')
  e.initEvent('click', false, false)
  a.dispatchEvent(e)
}

function verCompare (a, b) {
  const v1 = a.split('.')
  const v2 = b.split('.')

  for (let i = 0; i < v1.length || i < v2.length; i += 1) {
    const n1 = parseInt(v1[i], 10) || 0
    const n2 = parseInt(v2[i], 10) || 0

    if (n1 < n2) {
      return -1
    } else if (n1 > n2) {
      return 1
    }
  }

  return 0
}

function deferRedirect (url = '', ms = 100) {
  setTimeout(() => {
    win.location.href = url
  }, ms)
}

module.exports = callapp
