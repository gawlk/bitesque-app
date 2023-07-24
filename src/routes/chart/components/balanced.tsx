import { unwrap } from 'solid-js/store'

import { store } from '/src/store'

import { colors, mixColors } from '/src/scripts'

import { defaultChartLineOptionsWithAutoscale } from './scripts'

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

        const seriesOptions: Parameters<typeof chart.addLineSeries>[0] = {
          ...defaultChartLineOptionsWithAutoscale,
          color: mixColors(colors.black, colors.yellow),
        }

        const series = chart.addLineSeries(seriesOptions)

        props.onAdd()

        createEffect(() => {
          series.applyOptions({
            visible: true,
          })
        })

        createEffect(() =>
          series.setData(store.balancedPrices.map((v) => unwrap(v)))
        )
      }
    )
  )

  return () => <></>
}
