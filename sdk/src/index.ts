import { monitorError } from './error'
import { monitorPerformance } from './performance'
import type { ErrorOptions, PerformanceOptions } from './type'

const Monitor = {
  startPerformance (options: PerformanceOptions) {
    monitorPerformance(options)
  },
  startErrorMonitor (options: ErrorOptions) {
    monitorError(options)
  }
}

window.Monitor = Monitor
export { Monitor }
