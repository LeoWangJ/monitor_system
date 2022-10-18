interface Match {
  [key: string]: {
    [key: string]: boolean
  }
}
export function getMatch (userAgent: string | string[]): Match {
  const match = {
    // 引擎核心
    engine: {
      Trident: userAgent.includes('Trident') || userAgent.includes('NET CLR'),
      Presto: userAgent.includes('Presto'),
      WebKit: userAgent.includes('AppleWebKit'),
      Gecko: userAgent.includes('Gecko/')
    },
    // 瀏覽器
    browser: {
      Safari: userAgent.includes('Safari'),
      Chrome: userAgent.includes('Chrome') || userAgent.includes('CriOS'),
      IE: userAgent.includes('MSIE') || userAgent.includes('Trident'),
      Edge: userAgent.includes('Edge'),
      Firefox: userAgent.includes('Firefox') || userAgent.includes('FxiOS'),
      'Firefox Focus': userAgent.includes('Focus'),
      Chromium: userAgent.includes('Chromium'),
      Opera: userAgent.includes('Opera') || userAgent.includes('OPR'),
      Vivaldi: userAgent.includes('Vivaldi'),
      Yandex: userAgent.includes('YaBrowser'),
      Arora: userAgent.includes('Arora'),
      Lunascape: userAgent.includes('Lunascape'),
      QupZilla: userAgent.includes('QupZilla'),
      'Coc Coc': userAgent.includes('coc_coc_browser'),
      Kindle: userAgent.includes('Kindle') || userAgent.includes('Silk/'),
      Iceweasel: userAgent.includes('Iceweasel'),
      Konqueror: userAgent.includes('Konqueror'),
      Iceape: userAgent.includes('Iceape'),
      SeaMonkey: userAgent.includes('SeaMonkey'),
      Epiphany: userAgent.includes('Epiphany'),
      360: userAgent.includes('QihooBrowser') || userAgent.includes('QHBrowser'),
      '360EE': userAgent.includes('360EE'),
      '360SE': userAgent.includes('360SE'),
      UC: userAgent.includes('UC') || userAgent.includes(' UBrowser'),
      QQBrowser: userAgent.includes('QQBrowser'),
      QQ: userAgent.includes('QQ/'),
      Baidu: userAgent.includes('Baidu') || userAgent.includes('BIDUBrowser'),
      Maxthon: userAgent.includes('Maxthon'),
      Sogou: userAgent.includes('MetaSr') || userAgent.includes('Sogou'),
      LBBROWSER: userAgent.includes('LBBROWSER'),
      '2345Explorer': userAgent.includes('2345Explorer'),
      TheWorld: userAgent.includes('TheWorld'),
      XiaoMi: userAgent.includes('MiuiBrowser'),
      Quark: userAgent.includes('Quark'),
      Qiyu: userAgent.includes('Qiyu'),
      Wechat: userAgent.includes('MicroMessenger'),
      Taobao: userAgent.includes('AliApp(TB'),
      Alipay: userAgent.includes('AliApp(AP'),
      Weibo: userAgent.includes('Weibo'),
      Douban: userAgent.includes('com.douban.frodo'),
      Suning: userAgent.includes('SNEBUY-APP'),
      iQiYi: userAgent.includes('IqiyiApp')
    },
    // 系统或平台
    os: {
      Windows: userAgent.includes('Windows'),
      Linux: userAgent.includes('Linux') || userAgent.includes('X11'),
      'Mac OS': userAgent.includes('Macintosh'),
      Android: userAgent.includes('Android') || userAgent.includes('Adr'),
      Ubuntu: userAgent.includes('Ubuntu'),
      FreeBSD: userAgent.includes('FreeBSD'),
      Debian: userAgent.includes('Debian'),
      'Windows Phone':
        userAgent.includes('IEMobile') || userAgent.includes('Windows Phone'),
      BlackBerry: userAgent.includes('BlackBerry') || userAgent.includes('RIM'),
      MeeGo: userAgent.includes('MeeGo'),
      Symbian: userAgent.includes('Symbian'),
      iOS: userAgent.includes('like Mac OS X'),
      'Chrome OS': userAgent.includes('CrOS'),
      WebOS: userAgent.includes('hpwOS')
    },
    // 設備
    device: {
      Mobile:
      userAgent.includes('Mobi') ||
      userAgent.includes('iPh') ||
      userAgent.includes('480'),
      Tablet: userAgent.includes('Tablet') || userAgent.includes('Nexus 7'),
      iPad: userAgent.includes('iPad'),
      PC: false
    }
  }

  match.device.PC = !(match.device.Mobile || match.device.Tablet || match.device.iPad)
  return match
}

// TODO: 複雜度看能不能變 O(n)
export function matchInfoMap () {
  const userAgent = navigator.userAgent
  const allInfo = getMatch(userAgent)
  const userInfo: { [key: string]: string } = {}
  for (const info in allInfo) {
    for (const match in allInfo[info]) {
      if (allInfo[info][match]) {
        userInfo[info] = match
      }
    }
  }
  return userInfo
}
