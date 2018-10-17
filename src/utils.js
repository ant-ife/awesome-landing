const UA = window.navigator.userAgent

const queryParse = exports.queryParse = (search = '') => {
  const qs = {}
  search.replace(/([^?=&]+)(=([^&]*))?/g, ($0, $1, $2, $3) => {
    if ($3 === undefined) {
      return
    }
    qs[$1] = decodeURIComponent($3)
  })
  return qs
}
const { __landingDebug__ } = queryParse(location.search)

exports.getOSType = () => {
  if (/\b(?:iPhone|iPad|iPod)[a-zA-Z ;]+([\d._]+)/.test(UA)) {
    return 'iOS'
  } else if (/\b(?:Android|Adr) ([\d.]+)/.test(UA)) {
    return 'Android'
  } else if (/\bMacintosh[a-zA-Z ;]+([\d._]+)/.test(UA)) {
    return 'macOS'
  } else {
    return '-'
  }
}

exports.log = message => {
  if (__landingDebug__) {
    alert(JSON.stringify(message, null, 2))
    return
  }
  console.log(message)
}

