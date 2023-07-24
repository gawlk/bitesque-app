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

        const parametersList = [
          {
            storeKey: 'terminal100Prices' as const,
            color: colors.rose,
          },
          {
            storeKey: 'terminal75Prices' as const,
            color: colors.pink,
          },
          {
            storeKey: 'terminal50Prices' as const,
            color: colors.fuchsia,
          },
          {
            storeKey: 'terminal25Prices' as const,
            color: colors.purple,
          },
        ]

        parametersList.forEach((parameters) => {
          const seriesOptions: Parameters<typeof chart.addLineSeries>[0] = {
            ...defaultChartLineOptionsWithAutoscale,
            color: mixColors(colors.black, parameters.color),
          }

          const series = chart.addLineSeries(seriesOptions)

          createEffect(() => {
            series.applyOptions({
              visible: true,
            })
          })

          createEffect(() =>
            series.setData(store[parameters.storeKey].map((v) => unwrap(v)))
          )
        })

        props.onAdd()
      }
    )
  )

  return () => <></>
}
