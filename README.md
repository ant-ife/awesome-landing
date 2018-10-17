# awesome-link

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/awesome-link.svg?style=flat-square
[npm-url]: https://npmjs.org/package/awesome-link
[travis-image]: https://img.shields.io/travis/ant-ife/awesome-link.svg?style=flat-square
[travis-url]: https://travis-ci.org/ant-ife/awesome-link
[coveralls-image]: https://img.shields.io/coveralls/ant-ife/awesome-link.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/ant-ife/awesome-link?branch=master
[download-image]: https://img.shields.io/npm/dm/awesome-link.svg?style=flat-square
[download-url]: https://npmjs.org/package/awesome-link

---

## How to use

### **open** and **download** all in one

```javascript
import commonLanding from 'awesome-link'

// for open app
const urlScheme = 'appscheme://app.scheme'
const androidIntentScheme = 'intent://app.intent/#Intent;scheme=appscheme;package=app.package;action=app.action;end'

// for download app
const iosDownloadUrl = 'https://itunes.apple.com/us/app/appid'
const androidDownloadUrl = 'https://play.google.com/store/apps/details?id=app.id'
const androidPackageName = 'app.package.name'
const androidIntentDownloadScheme = 'intent://app.intent/#Intent;scheme=appScheme;end'

commonLanding({
  urlScheme,
  iosDownloadUrl,
  androidPackageName,
  androidIntentScheme,
  androidDownloadUrl,
  androidIntentDownloadScheme,
  forceIntent, // force Android to use intent
})
```

Theses params are optional:

- `androidIntentScheme`
- `androidIntentDownLoadScheme`
- `forceIntent`

### separate **open** and **download**

```javascript
import {
  openApp,
  download,
} from 'awesome-link'

// for open app
const urlScheme = 'appscheme://app.scheme'
const androidIntentScheme = 'intent://app.intent/#Intent;scheme=appscheme;package=app.package;action=app.action;end'

// for download app
const iosDownloadUrl = 'https://itunes.apple.com/us/app/appid'
const androidDownloadUrl = 'https://play.google.com/store/apps/details?id=app.id'
const androidPackageName = 'app.package.name'
const androidIntentDownloadScheme = 'intent://app.intent/#Intent;scheme=appScheme;end'

// openApp() returns a Promise
openApp({
  urlScheme,
  androidPackageName,
  androidIntentScheme,
}).then(res => {
  console.log('open app res:', res)
}).catch(e => {
  console.log('open app failed:', e)
})


download({
  iosDownloadUrl,
  androidDownloadUrl,
  androidIntentDownloadScheme,
})
```

## How to debug

- add query in url **`__landingDebug__=1`**

## How to mock userAgent

```javascript
window.sessionStorage.DEBUG_SCHEME_UA = YOUR_MOCK_UA_STRING
```
