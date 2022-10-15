// 頁面性能監控

import { time } from 'console'

// FP FCP longtack 容器
const ttiTime = {}

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

interface PerformanceTimes {
  [key: string]: number
}

function getTiming () {
  try {
    if (!window.performance && !window.performance.timing) {
      console.log('該瀏覽器不支援 performance 操作')
    }
    const { timing } = window.performance
    const times: PerformanceTimes = {}
    const loadTime = timing.loadEventEnd - timing.loadEventStart
    if (loadTime < 0) {
      setTimeout(() => {
        getTiming()
      }, 200)
      return
    }

    // 上一個頁面卸載總耗時
    // times.prevPage = timing.
    // 上一個頁面卸載
    times.prevUnload = timing.unloadEventEnd - timing.unloadEventStart
    // 重定向時間
    times.redirectTime = timing.redirectEnd - timing.redirectStart
    // DNS 緩存時間
    times.appcacheTime = timing.domainLookupStart - timing.fetchStart
    // DNS 查詢時間
    times.dnsTime = timing.domainLookupEnd - timing.domainLookupEnd
    // 網路總耗時
    times.network = timing.connectEnd - timing.connectStart
    // 接收數據總耗時
    times.receive = timing.responseEnd - timing.responseStart
    // 請求頁面總耗時
    times.request = timing.responseEnd - timing.requestStart
  } catch (e) {
    console.log('performance error:', e)
  }
}

function getEntries () {

}

function clearPerformance () {

}

function measure () {

}

export {
  getTiming,
  getEntries,
  clearPerformance,
  measure

}
