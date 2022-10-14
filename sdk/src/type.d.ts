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