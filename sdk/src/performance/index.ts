import type { PerformanceOptions } from '../type'
import ttiPolyfill from 'tti-polyfill'

function monitorPerformance (options: PerformanceOptions): void {
  ttiPolyfill.getFirstConsistentlyInteractive().then(async (tti) => {
    const isPage = options.isPage || true
    const isResource = options.isResource || true
    const config = {
      resourceList = [],
      performance: {}
    }
    if (isPage) {
      config.performance = getTiming()
    }
    if (isResource) {
      config.resourceList = getEntries()
    }
  })
}

export { monitorPerformance }
