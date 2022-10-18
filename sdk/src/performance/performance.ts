// 頁面性能監控

import type { Entry, ObjectKey } from '../type'

// FP FCP longtack 容器
const ttiTime: { [key: string]: number } = {}

// FP FCP
const observerPaint = new PerformanceObserver(list => {
  for (const entry of list.getEntries()) {
    ttiTime[entry.name] = entry.startTime - entry.duration
  }
})

observerPaint.observe({
  entryTypes: ['paint']
})

const observerLongTask = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    ttiTime[entry.name] = entry.startTime + entry.duration
  }
})

observerLongTask.observe({
  entryTypes: ['longtask']
})

// 獲取時間
function getTiming (): ObjectKey {
  try {
    const { timing } = window.performance
    const times: ObjectKey = {}

    // 上一個頁面卸載總耗時
    times.prevPage = timing.fetchStart - timing.navigationStart
    // 上一個頁面卸載
    times.prevUnload = timing.unloadEventEnd - timing.unloadEventStart
    // 重定向時間
    times.redirectTime = timing.redirectEnd - timing.redirectStart
    // DNS 緩存時間
    times.appcacheTime = timing.domainLookupStart - timing.fetchStart
    // DNS 查詢時間
    times.dnsTime = timing.domainLookupEnd - timing.domainLookupEnd
    // tcp 連接耗時
    times.tcpTime = timing.connectEnd - timing.connectStart
    // 網路總耗時
    times.network = timing.connectEnd - timing.connectStart
    // 網路接收數據，前端從發送請求到接收請求的時間
    times.send = timing.responseStart - timing.requestStart
    // 接收數據總耗時
    times.receive = timing.responseEnd - timing.responseStart
    // 請求頁面總耗時
    times.request = timing.responseEnd - timing.requestStart
    // 讀取頁面第一個字節的時間
    times.ttfbTime = timing.responseStart - timing.navigationStart
    // 前端渲染，解析dom樹耗時
    times.analysisTime = timing.domComplete - timing.domInteractive
    // 執行 onload 回調函數的時間
    times.onload = timing.loadEventEnd - timing.loadEventStart
    // 前端總時間
    times.frontend = timing.loadEventEnd - timing.domLoading
    // 白屏時間
    times.blankTime = timing.domLoading - timing.navigationStart
    // domReadyTime
    times.domReadyTime = timing.domContentLoadedEventEnd - timing.navigationStart
    // 頁面加載完成時間
    times.loadPage = timing.loadEventEnd - timing.navigationStart
    // 可操作時間
    times.domInteractive = timing.domInteractive - timing.navigationStart

    const perEntries = performance.getEntriesByType('mark')
    for (const entry of perEntries) {
      ttiTime[entry.name] = entry.startTime + entry.duration
      performance.clearMarks(entry.name)
    }

    return Object.assign(times, ttiTime)
  } catch (e) {
    console.log('performance error:', e)
    return {}
  }
}

// 獲取加載資源時間
function getEntries () {
  const entryTimeList: ObjectKey[] = []
  const entryList = window.performance.getEntries() as unknown as Entry[]
  const type = ['script', 'css', 'fetch', 'xmlhttprequest', 'link', 'img']
  entryList.forEach(item => {
    const resource: ObjectKey = {}
    if (type.includes(item.initiatorType)) {
      // 請求資源路徑
      resource.name = item.name
      // 發起資源類型
      resource.initiatorType = item.initiatorType
      // http協議版本
      resource.nextHopProtocol = item.nextHopProtocol
      // dns 查詢耗時
      resource.dnsTime = item.domainLookupEnd - item.domainLookupStart
      // tcp 連接
      resource.tcpTime = item.connectEnd - item.connectStart
      // 請求時間
      resource.reqTime = item.responseEnd - item.responseStart
      // 重定向時間
      resource.redirectTime = item.redirectEnd - item.redirectStart
      entryTimeList.push(resource)
    }
  })
  return entryTimeList
}

function clearPerformance () {
  performance.clearResourceTimings()
}

// 獲取函式運行時長
function measure (fn: () => void) {
  const startTime = performance.now()
  fn()
  const endTime = performance.now()
  return endTime - startTime
}

export {
  getTiming,
  getEntries,
  clearPerformance,
  measure

}
