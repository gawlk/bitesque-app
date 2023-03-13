import { createAutoscaleInfoProvider } from '.'

export const defaultLineOptions: LightweightCharts.DeepPartial<
  LightweightCharts.LineStyleOptions & LightweightCharts.SeriesOptionsCommon
> = {
  lineWidth: 2,
  priceLineVisible: false,
  visible: false,
  lastValueVisible: false,
  autoscaleInfoProvider: createAutoscaleInfoProvider(),
}
