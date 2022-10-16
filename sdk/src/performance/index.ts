import type { PerformanceOptions, ObjectKey } from '../type'
import ttiPolyfill from 'tti-polyfill'
import { clearPerformance, getEntries, getTiming, measure } from './performance'
import { getDeviceId, markUv } from '../utils'

function monitorPerformance (options: PerformanceOptions): void {
  ttiPolyfill.getFirstConsistentlyInteractive().then(async (tti) => {
    const isPage = options.isPage || true
    const isResource = options.isResource || true
    const config: { resourceList: ObjectKey[], performance: ObjectKey } = {
      resourceList: [],
      performance: {}
    }
    if (isPage) {
      config.performance = getTiming()
    }
    if (isResource) {
      config.resourceList = getEntries()
    }
    const report = {
      time: new Date().getTime(),
      performance: Object.assign(config.performance, { tti }),
      resourceList: config.resourceList,
      markUv: await markUv(),
      did: await getDeviceId(),
      pageId: options.pageId || '',
      projectId: options.projectId || 0,
      pageUrl: location.href,
      type: 'performance'
    }
    console.log(report)
    clearPerformance()
  }).catch(e => console.log(e))
}

export { monitorPerformance, measure }
