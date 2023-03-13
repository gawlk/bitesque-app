declare namespace LightweightCharts {
  export type IChartApi = import('lightweight-charts').IChartApi
  export type ISeriesApi<T> = import('lightweight-charts').ISeriesApi<T>
  export type SeriesOptionsMap = import('lightweight-charts').SeriesOptionsMap
  export type ISeriesApiAny = ISeriesApi<keyof SeriesOptionsMap>
  export type IPriceLine = import('lightweight-charts').IPriceLine
  export type ChartOptions = import('lightweight-charts').ChartOptions
  export type DeepPartial<T> = import('lightweight-charts').DeepPartial<T>
  export type SeriesOptionsCommon =
    import('lightweight-charts').SeriesOptionsCommon
  export type AreaStyleOptions = import('lightweight-charts').AreaStyleOptions
  export type BarStyleOptions = import('lightweight-charts').BarStyleOptions
  export type BaselineStyleOptions =
    import('lightweight-charts').BaselineStyleOptions
  export type CandlestickStyleOptions =
    import('lightweight-charts').CandlestickStyleOptions
  export type HistogramStyleOptions =
    import('lightweight-charts').HistogramStyleOptions
  export type LineStyleOptions = import('lightweight-charts').LineStyleOptions
  export type SeriesStylesOptions = LightweightCharts.DeepPartial<
    (
      | LightweightCharts.AreaStyleOptions
      | LightweightCharts.BarStyleOptions
      | LightweightCharts.BaselineStyleOptions
      | LightweightCharts.CandlestickStyleOptions
      | LightweightCharts.HistogramStyleOptions
      | LightweightCharts.LineStyleOptions
    ) &
      LightweightCharts.SeriesOptionsCommon
  >
  export type SingleValueData = import('lightweight-charts').SingleValueData
  export type WhitespaceData = import('lightweight-charts').WhitespaceData
  export type LineData = import('lightweight-charts').LineData
  export type HistogramData = import('lightweight-charts').HistogramData
  export type AreaData = import('lightweight-charts').AreaData
  export type Time = import('lightweight-charts').Time
  export type BusinessDay = import('lightweight-charts').BusinessDay
  export type SeriesMarker<T> = import('lightweight-charts').SeriesMarker<T>
  export type TimeRange = import('lightweight-charts').TimeRange
  export type LogicalRange = import('lightweight-charts').LogicalRange
  export type AutoscaleInfo = import('lightweight-charts').AutoscaleInfo
  export type CandlestickData = import('lightweight-charts').CandlestickData
  export type BarPrice = import('lightweight-charts').BarPrice
  export type MouseEventHandler = import('lightweight-charts').MouseEventHandler
  export type MouseEventParams = import('lightweight-charts').MouseEventParams
  export type PriceLineOptions = import('lightweight-charts').PriceLineOptions
}
