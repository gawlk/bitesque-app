import { unwrap } from 'solid-js/store'

import { store } from '/src/store'

import { colors, mixColors } from '/src/scripts'

import { defaultLineOptions } from './scripts'

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
            storeKey: 'terminalPrice100' as const,
            color: colors.rose,
          },
          {
            storeKey: 'terminalPrice75' as const,
            color: colors.pink,
          },
          {
            storeKey: 'terminalPrice50' as const,
            color: colors.fuchsia,
          },
          {
            storeKey: 'terminalPrice25' as const,
            color: colors.purple,
          },
        ]

        parametersList.forEach((parameters) => {
          const seriesOptions: Parameters<typeof chart.addLineSeries>[0] = {
            ...defaultLineOptions,
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
