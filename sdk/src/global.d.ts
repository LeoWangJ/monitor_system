declare global {
  interface Window {
    Monitor: {
      startPerformance
      startErrorMonitor
    }
  }
}

export {}
