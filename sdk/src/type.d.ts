/**
 * pageId：頁面標示,
 * projectId: 項目ID,
 * url：上報地址,
 * isPage：是否上報頁面性能數據,
 * isResource：是否上報頁面資源數據
 */
export interface PerformanceOptions {
  pageId: number
  projectId: number
  url: string
  isPage: boolean
  isResource: boolean
}
/**
 * pageId：頁面標示,
 * projectId: 項目ID,
 * url：上報地址,
 * capture：是否截圖,
 * extendsInfo： {} 附加數據
 */
export interface ErrorOptions {
  pageId: number
  projectId: number
  url: string
  capture: boolean
}

export interface ObjectKey {
  [key: string]: number | string
}

export interface Entry {
  initiatorType: string
  name: string
  nextHopProtocol: string
  domainLookupStart: number
  domainLookupEnd: number
  connectStart: number
  connectEnd: number
  responseStart: number
  responseEnd: number
  redirectStart: number
  redirectEnd: number
}
