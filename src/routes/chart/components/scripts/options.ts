import { defaultChartLineOptions } from '/src/scripts'

import { createAutoscaleInfoProvider } from '.'

export const defaultChartLineOptionsWithAutoscale: typeof defaultChartLineOptions =
  {
    ...defaultChartLineOptions,
    autoscaleInfoProvider: createAutoscaleInfoProvider(),
  }
