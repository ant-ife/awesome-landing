import {
  log,
  getOSType,
} from './utils'
const callApp = require('./callApp')
const win = window

async function commonLanding ({
  urlScheme,
  iosDownloadUrl,
  androidPackageName,
  androidIntentScheme = '',
  androidDownloadUrl,
  androidIntentDownloadScheme = '',
  forceIntent = false,
}) {
  if (typeof urlScheme !== 'string' ||
      typeof iosDownloadUrl !== 'string' ||
      typeof androidPackageName !== 'string' ||
      typeof androidIntentScheme !== 'string' ||
      typeof androidDownloadUrl !== 'string' ||
      typeof androidIntentDownloadScheme !== 'string' ||
      typeof forceIntent !== 'boolean') {
    log('arguments is invaild')
    return
  }

  const result = await openApp({
    urlScheme,
    androidPackageName,
    androidIntentScheme,
    forceIntent,
  })

  if (!result) {
    download({
      iosDownloadUrl,
      androidDownloadUrl,
      androidIntentDownloadScheme,
    })
  }
}

function openApp ({
  urlScheme,
  androidPackageName,
  androidIntentScheme,
  forceIntent = false,
}) {
  log(navigator.userAgent)
  return new Promise(function (resolve) {
    callApp.gotoPage({
      urlScheme,
      androidPackageName,
      androidIntentScheme,
      forceIntent,
    })
    win.setTimeout(function () {
      if (document.hasFocus()) {
        return resolve(false)
      }
      resolve(true)
    }, 1000)
  })
}

// fix for browsers in old Android
// redirect to itunes for macOS
function download ({
  iosDownloadUrl,
  androidDownloadUrl,
  androidIntentDownloadScheme = '',
}) {
  const OSType = getOSType()

  if (OSType === 'iOS') {
    log(`download iOS: ${iosDownloadUrl}`)
    win.location.href = iosDownloadUrl
    return
  }

  if (OSType === 'macOS') {
    log(`download macOS: ${iosDownloadUrl}`)
    win.location.href = iosDownloadUrl
    return
  }

  // won't use market://
  // market:// is hijacked by most Android vendor and redirect to the vendor's market
  // const androidMarketDownloadUrl = 'market://details?id=' + androidPackageName
  // win.location.href = androidDownloadUrl
  //
  // first try intent to google play
  // then redirect to http url
  if (androidIntentDownloadScheme) {
    log(`download Android intent: ${androidIntentDownloadScheme}`)
    win.location.href = androidIntentDownloadScheme
    win.setTimeout(() => {
      if (document.hasFocus()) {
        log(`download Android url: ${androidDownloadUrl}`)
        win.location.href = androidDownloadUrl
      }
    }, 1000)
    return
  }
  log(`download Android url: ${androidDownloadUrl}`)
  win.location.href = androidDownloadUrl
}

module.exports = commonLanding
module.exports.openApp = openApp
module.exports.download = download

