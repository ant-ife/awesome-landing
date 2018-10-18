# awesome-landing

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/awesome-landing.svg?style=flat-square
[npm-url]: https://npmjs.org/package/awesome-landing
[travis-image]: https://img.shields.io/travis/ant-ife/awesome-landing.svg?style=flat-square
[travis-url]: https://travis-ci.org/ant-ife/awesome-landing
[coveralls-image]: https://img.shields.io/coveralls/ant-ife/awesome-landing.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/ant-ife/awesome-landing?branch=master
[download-image]: https://img.shields.io/npm/dm/awesome-landing.svg?style=flat-square
[download-url]: https://npmjs.org/package/awesome-landing

---

## How to use

### **open** and **download** all in one

```javascript
import commonLanding from 'awesome-landing'

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
} from 'awesome-landing'

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
<!-- GITCONTRIBUTOR_START -->

## Contributors

|[<img src="https://avatars0.githubusercontent.com/u/13585043?v=4" width="100px;"/><br/><sub><b>yangmingshan</b></sub>](https://github.com/yangmingshan)<br/>|[<img src="https://avatars1.githubusercontent.com/u/2139038?v=4" width="100px;"/><br/><sub><b>zhangyuheng</b></sub>](https://github.com/zhangyuheng)<br/>|[<img src="https://avatars1.githubusercontent.com/u/1011681?v=4" width="100px;"/><br/><sub><b>xudafeng</b></sub>](https://github.com/xudafeng)<br/>
| :---: | :---: | :---: |


This project follows the git-contributor [spec](https://github.com/xudafeng/git-contributor), auto upated at `Thu Oct 18 2018 11:07:22 GMT+0800`.

<!-- GITCONTRIBUTOR_END -->
