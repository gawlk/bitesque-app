let autoScaleInfo: LightweightCharts.AutoscaleInfo | null = null

export const createAutoscaleInfoProvider =
  (override: boolean = false) =>
  (getInfo: () => LightweightCharts.AutoscaleInfo | null) => {
    if (override) {
      autoScaleInfo = getInfo()
    }

    return autoScaleInfo || getInfo()
  }
