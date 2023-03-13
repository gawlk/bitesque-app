import { priceToUSLocale, sortWhitespaceDataArray } from '/src/scripts'

export const setMinMaxMarkers = (
  chart: LightweightCharts.IChartApi,
  series: LightweightCharts.ISeriesApi<any>,
  dataList: LightweightCharts.CandlestickData[]
) => {
  chart.timeScale().subscribeVisibleLogicalRangeChange((range) => {
    const slicedDataList = range
      ? dataList.slice(
          Math.ceil(range.from < 0 ? 0 : range.from),
          Math.floor(range.to) + 1
        )
      : []

    if (slicedDataList.length) {
      const markers: Parameters<typeof series.setMarkers>[0] = []

      ;[
        {
          mathFun: 'min' as const,
          valueAttribute: 'low' as const,
          markerOptions: {
            position: 'belowBar' as const,
            shape: 'arrowUp' as const,
          },
        },
        {
          mathFun: 'max' as const,
          valueAttribute: 'high' as const,
          markerOptions: {
            position: 'aboveBar' as const,
            shape: 'arrowDown' as const,
          },
        },
      ].map((params) => {
        const value = Math[params.mathFun](
          ...slicedDataList.map((data) => data[params.valueAttribute] || 0)
        )

        const candle = slicedDataList.find(
          (data) => data[params.valueAttribute] === value
        )

        return (
          candle &&
          markers.push({
            ...params.markerOptions,
            time: candle.time,
            color: '#fff',
            size: 0,
            text: priceToUSLocale(value),
          })
        )
      })

      series.setMarkers(sortWhitespaceDataArray(markers))
    }
  })
}
