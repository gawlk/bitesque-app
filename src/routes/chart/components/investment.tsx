import { LineType } from 'lightweight-charts'
import { unwrap } from 'solid-js/store'

import { store } from '/src/store'

import { colors, mixColors } from '/src/scripts'

import { createAutoscaleInfoProvider } from './scripts'

interface Props {
  chart: LightweightCharts.IChartApi | null
  onAdd: () => void
}

export default (props: Props) => {
  createEffect(
    on(
      () => props.chart,
      (chart) => {
        if (!chart) return

        const seriesOptions: Parameters<typeof chart.addAreaSeries>[0] = {
          lastValueVisible: false,
          priceLineVisible: false,
          lineType: LineType.WithSteps,
          lineColor: 'transparent',
          topColor: 'transparent',
          bottomColor: 'transparent',
          autoscaleInfoProvider: createAutoscaleInfoProvider(),
        }

        const series = chart.addAreaSeries(seriesOptions)

        props.onAdd()

        createEffect(() => {
          series.applyOptions({
            visible: true,
          })
        })

        createEffect(
          on(
            () => store.ratios,
            (ratios) =>
              series.setData(
                ratios.map((data, index) => {
                  const { time, color } = unwrap(data)

                  return {
                    time,
                    value: store.candlesticks[index].close || 0,
                    topColor: color,
                    bottomColor:
                      color !== 'transparent' && color !== colors.black
                        ? mixColors(colors.black, color, 0.05)
                        : color,
                  }
                })
              )
          )
        )
      }
    )
  )
  return <div></div>
}
