import { brandUa } from './brand'
import { matchInfoMap } from './info'

interface commonNavigator extends Navigator {
  connection: {
    effectiveType: string
  }
}
export function deviceInfo () {
  const { userAgent, language, connection } = navigator as commonNavigator
  const matchInfo = matchInfoMap()
  const info = {
    deviceType: matchInfo.device, // 設備類型
    OS: matchInfo.os, // 操作系統
    OSVersion: getOSVersion(userAgent, matchInfo.os), // 操作系統版本
    screenHeight: window.screen.height, // 螢幕高
    screenWidth: window.screen.width, // 螢幕寬
    language: getLanguage(language), // 當前使用語言- 國家
    network: getNetwork(connection), // 網路類型
    browserInfo: getBrowserInfo(userAgent, matchInfo.browser, matchInfo.engine), // 瀏覽器訊息
    mobileBrand: brandUa.getBrand(userAgent), // 手機品牌訊息
    fringerprint: createFingerprint(), // 瀏覽器指紋
    userAgent
  }
  return info
}

function getOSVersion (userAgent: string, os: string) {
  const osVersion: { [key: string]: Function } = {
    Windows: function () {
      const version = userAgent.replace(/^.*Windows NT ([\d.]+);.*$/, '$1')
      const oldWindowsVersionMap: { [key: string]: string } = {
        6.4: '10',
        6.3: '8.1',
        6.2: '8',
        6.1: '7',
        '6.0': 'Vista',
        5.2: 'XP',
        5.1: 'XP',
        '5.0': '2000'
      }
      return oldWindowsVersionMap[version] || version
    },
    Android: function () {
      return userAgent.replace(/^.*Android ([\d.]+);.*$/, '$1')
    },
    iOS: function () {
      return userAgent.replace(/^.*OS ([\d_]+) like.*$/, '$1').replace(/_/g, '.')
    },
    Debian: function () {
      return userAgent.replace(/^.*Debian\/([\d.]+).*$/, '$1')
    },
    'Windows Phone': function () {
      return userAgent.replace(/^.*Windows Phone( OS)? ([\d.]+);.*$/, '$2')
    },
    'Mac OS': function () {
      return userAgent
        .replace(/^.*Mac OS X ([\d_]+).*$/, '$1')
        .replace(/_/g, '.')
    },
    WebOS: function () {
      return userAgent.replace(/^.*hpwOS\/([\d.]+);.*$/, '$1')
    }
  }
  if (osVersion[os]) {
    return osVersion[os]()
  }
}

function getLanguage (language: string) {
  let parse: string | string[] = language.split('-')
  if (parse[1]) {
    parse[1] = parse[1].toUpperCase()
  }
  parse = parse.join('_')
  return parse
}

function getNetwork (connection: { effectiveType: string }) {
  return connection?.effectiveType
}

function getBrowserInfo (userAgent: string, browser: string, engine: string) {
  const browerVersionMap: { [key: string]: Function } = {
    Safari: function () {
      return userAgent.replace(/^.*Version\/([\d.]+).*$/, '$1')
    },
    Chrome: function () {
      return userAgent
        .replace(/^.*Chrome\/([\d.]+).*$/, '$1')
        .replace(/^.*CriOS\/([\d.]+).*$/, '$1')
    },
    IE: function () {
      return userAgent
        .replace(/^.*MSIE ([\d.]+).*$/, '$1')
        .replace(/^.*rv:([\d.]+).*$/, '$1')
    },
    Edge: function () {
      return userAgent.replace(/^.*Edge\/([\d.]+).*$/, '$1')
    },
    Firefox: function () {
      return userAgent
        .replace(/^.*Firefox\/([\d.]+).*$/, '$1')
        .replace(/^.*FxiOS\/([\d.]+).*$/, '$1')
    },
    'Firefox Focus': function () {
      return userAgent.replace(/^.*Focus\/([\d.]+).*$/, '$1')
    },
    Chromium: function () {
      return userAgent.replace(/^.*Chromium\/([\d.]+).*$/, '$1')
    },
    Opera: function () {
      return userAgent.replace(/^.*Opera\/([\d.]+).*$/, '$1').replace(/^.*OPR\/([\d.]+).*$/, '$1')
    },
    Vivaldi: function () {
      return userAgent.replace(/^.*Vivaldi\/([\d.]+).*$/, '$1')
    },
    Yandex: function () {
      return userAgent.replace(/^.*YaBrowser\/([\d.]+).*$/, '$1')
    },
    Arora: function () {
      return userAgent.replace(/^.*Arora\/([\d.]+).*$/, '$1')
    },
    Lunascape: function () {
      return userAgent.replace(/^.*Lunascape[\/\s]([\d.]+).*$/, '$1')
    },
    QupZilla: function () {
      return userAgent.replace(/^.*QupZilla[\/\s]([\d.]+).*$/, '$1')
    },
    'Coc Coc': function () {
      return userAgent.replace(/^.*coc_coc_browser\/([\d.]+).*$/, '$1')
    },
    Kindle: function () {
      return userAgent.replace(/^.*Version\/([\d.]+).*$/, '$1')
    },
    Iceweasel: function () {
      return userAgent.replace(/^.*Iceweasel\/([\d.]+).*$/, '$1')
    },
    Konqueror: function () {
      return userAgent.replace(/^.*Konqueror\/([\d.]+).*$/, '$1')
    },
    Iceape: function () {
      return userAgent.replace(/^.*Iceape\/([\d.]+).*$/, '$1')
    },
    SeaMonkey: function () {
      return userAgent.replace(/^.*SeaMonkey\/([\d.]+).*$/, '$1')
    },
    Epiphany: function () {
      return userAgent.replace(/^.*Epiphany\/([\d.]+).*$/, '$1')
    },
    360: function () {
      return userAgent.replace(/^.*QihooBrowser\/([\d.]+).*$/, '$1')
    },
    Maxthon: function () {
      return userAgent.replace(/^.*Maxthon\/([\d.]+).*$/, '$1')
    },
    QQBrowser: function () {
      return userAgent.replace(/^.*QQBrowser\/([\d.]+).*$/, '$1')
    },
    QQ: function () {
      return userAgent.replace(/^.*QQ\/([\d.]+).*$/, '$1')
    },
    Baidu: function () {
      return userAgent.replace(/^.*BIDUBrowser[\s\/]([\d.]+).*$/, '$1')
    },
    UC: function () {
      return userAgent.replace(/^.*UC?Browser\/([\d.]+).*$/, '$1')
    },
    Sogou: function () {
      return userAgent
        .replace(/^.*SE ([\d.X]+).*$/, '$1')
        .replace(/^.*SogouMobileBrowser\/([\d.]+).*$/, '$1')
    },
    '2345Explorer': function () {
      return userAgent.replace(/^.*2345Explorer\/([\d.]+).*$/, '$1')
    },
    TheWorld: function () {
      return userAgent.replace(/^.*TheWorld ([\d.]+).*$/, '$1')
    },
    XiaoMi: function () {
      return userAgent.replace(/^.*MiuiBrowser\/([\d.]+).*$/, '$1')
    },
    Quark: function () {
      return userAgent.replace(/^.*Quark\/([\d.]+).*$/, '$1')
    },
    Qiyu: function () {
      return userAgent.replace(/^.*Qiyu\/([\d.]+).*$/, '$1')
    },
    Wechat: function () {
      return userAgent.replace(/^.*MicroMessenger\/([\d.]+).*$/, '$1')
    },
    Taobao: function () {
      return userAgent.replace(/^.*AliApp\(TB\/([\d.]+).*$/, '$1')
    },
    Alipay: function () {
      return userAgent.replace(/^.*AliApp\(AP\/([\d.]+).*$/, '$1')
    },
    Weibo: function () {
      return userAgent.replace(/^.*weibo__([\d.]+).*$/, '$1')
    },
    Douban: function () {
      return userAgent.replace(/^.*com.douban.frodo\/([\d.]+).*$/, '$1')
    },
    Suning: function () {
      return userAgent.replace(/^.*SNEBUY-APP([\d.]+).*$/, '$1')
    },
    iQiYi: function () {
      return userAgent.replace(/^.*IqiyiVersion\/([\d.]+).*$/, '$1')
    }
  }

  let browserVersion = ''
  if (browerVersionMap[browser]) {
    browserVersion = browerVersionMap[browser]()
    if (browserVersion === userAgent) {
      browserVersion = ''
    }
  }
  if (browser === 'Edge') {
    engine = 'EdgeHTML'
  }
  if (browser === 'Chrome' && parseInt(browserVersion) > 27) {
    engine = 'Blink'
  }
  if (browser === 'Opera' && parseInt(browserVersion) > 12) {
    engine = 'Blink'
  }
  if (browser === 'Yandex') {
    engine = 'Blink'
  }
  return `${browser} (版本: ${browserVersion}  內核:${engine})`
}

// use canvas to generate finger print
function createFingerprint () {
  function bin2hex (s: string) {
    let i; let l; let n; let o = ''
    s += ''
    for (i = 0, l = s.length; i < l; i++) {
      n = s.charCodeAt(i).toString(16)
      o += n.length < 2 ? '0' + n : n
    }
    return o
  }
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  const txt = window.location.host
  if (ctx) {
    ctx.font = "14px 'Arial'"
    ctx.textBaseline = 'top'
    ctx.fillStyle = '#f60'
    ctx.fillRect(125, 1, 62, 20)
    ctx.fillStyle = '#069'
    ctx.fillText(txt, 2, 15)
    ctx.fillStyle = 'rgba(102, 204, 0, 0.7)'
    ctx.fillText(txt, 4, 17)
  }
  const b64 = canvas.toDataURL().replace('data:image/png;base64,', '')
  const bin = atob(b64)
  const crc = bin2hex(bin.slice(-16, -12))
  const fingerprint = crc
  return fingerprint
}
