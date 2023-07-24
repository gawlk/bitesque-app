import { A } from 'solid-start'

import { store } from '/src/store'

import {
  colors,
  dateToString,
  defaultChartLineOptions,
  findCurrency,
} from '/src/scripts'

import { Chart } from '/src/components'

import Fiat, {
  defaultCurrency,
  defaultInitialAmount,
  defaultRecurrentAmount,
} from './components/fiat'
import Frequency, { defaultIsDateAConversionDay } from './components/frequency'
import Interval, {
  defaultEnd as defaultEndDate,
  defaultStart as defaultStartDate,
} from './components/interval'

interface LineParameters {
  name: string
  color: string
  dataList: LineDataWithQuantity[]
  processRatio: (
    ratioData: RatioData,
    index: number,
    isTimeToBuy: boolean
  ) => void
}

export default () => {
  const [state, setState] = createStore({
    chart: null as LightweightCharts.IChartApi | null,
    fiat: {
      currency: defaultCurrency,
      initial: defaultInitialAmount,
      recurrent: defaultRecurrentAmount,
    },
    frequency: {
      isDateAConversionDay: defaultIsDateAConversionDay,
    },
    interval: {
      start: defaultStartDate,
      end: defaultEndDate,
    },
  })

  createEffect(() => {
    const { ratios } = store
    const { chart } = state
    const { start: startDate, end: endDate } = state.interval
    const { initial: initialAmount, recurrent: recurrentAmount } = state.fiat
    const { isDateAConversionDay } = state.frequency

    if (!chart || !ratios.length) return

    untrack(() => {
      const firstIndex = ratios.findIndex(
        (data) =>
          dateToString(new Date(String(data.time))) === dateToString(startDate)
      )

      if (firstIndex === -1) return

      const lastIndex = ratios
        .slice(firstIndex)
        .findIndex(
          (data) =>
            dateToString(new Date(String(data.time))) === dateToString(endDate)
        )

      if (lastIndex === -1) return

      const slicedRatios = ratios.slice(firstIndex, firstIndex + lastIndex + 1)

      const lines: LineParameters[] = [
        {
          name: 'FIAT invested',
          color: colors.emerald,
          dataList: [],
          processRatio(data, index, isTimeToBuy) {
            const { time } = data

            let fiatInvested =
              this.dataList.at(index - 1)?.value ?? initialAmount

            if (isTimeToBuy) {
              fiatInvested += recurrentAmount
            }

            this.dataList.push({
              time,
              value: fiatInvested,
              fiatQuantity: fiatInvested,
              bitcoinQuantity: 0,
            })
          },
        },
        {
          name: 'Regular DCA',
          color: colors.yellow,
          dataList: [],
          processRatio(data, index, isTimeToBuy) {
            const { time, value } = data

            let bitcoinQuantity =
              this.dataList.at(index - 1)?.bitcoinQuantity ??
              initialAmount / value

            if (isTimeToBuy) {
              bitcoinQuantity += recurrentAmount / value
            }

            this.dataList.push({
              time,
              value: bitcoinQuantity * value,
              fiatQuantity: 0,
              bitcoinQuantity,
            })
          },
        },
        {
          name: 'Weighted DCA',
          color: colors.orange,
          dataList: [],
          processRatio(data, index, isTimeToBuy) {
            const { time, value, cautiousRatio: multiplier } = data

            let fiatQuantity =
              this.dataList.at(index - 1)?.fiatQuantity ??
              (multiplier <= 0 ? initialAmount : 0)

            let bitcoinQuantity =
              this.dataList.at(index - 1)?.bitcoinQuantity ??
              (multiplier > 0 ? initialAmount / value : 0)

            if (isTimeToBuy) {
              fiatQuantity += recurrentAmount

              if (multiplier) {
                const minBuyDays = 1

                const finalMultiplier = Math.max(
                  Math.min(
                    fiatQuantity / recurrentAmount / minBuyDays,
                    multiplier
                  ),
                  1
                )

                const swapQuantity = recurrentAmount * finalMultiplier
                fiatQuantity -= swapQuantity
                bitcoinQuantity += swapQuantity / value

                if (fiatQuantity < 0) {
                  console.log('fiatQuantity ERROR')
                }
              }
            }

            this.dataList.push({
              time,
              value: bitcoinQuantity * value + fiatQuantity,
              fiatQuantity,
              bitcoinQuantity,
            })
          },
        },
      ]

      lines.forEach((line) => {
        slicedRatios.forEach((data, index) => {
          line.processRatio(
            data,
            index,
            isDateAConversionDay(new Date(String(data.time)))
          )
        })

        addSeriesToChart(chart, line)
      })

      addSeriesToChart(chart, {
        name: 'Remaining',
        color: colors.white,
        dataList: lines[2].dataList.map((data) => ({
          ...data,
          value: data.fiatQuantity,
        })),
        processRatio: () => {},
      })
    })
  })

  const addSeriesToChart = (
    chart: LightweightCharts.IChartApi,
    line: LineParameters
  ) => {
    const seriesOptions: Parameters<typeof chart.addLineSeries>[0] = {
      ...defaultChartLineOptions,
      color: line.color,
      visible: true,
    }

    const series = chart.addLineSeries(seriesOptions)

    series.setData(line.dataList)

    chart.timeScale().fitContent()

    onCleanup(() => {
      if (series) {
        chart.removeSeries(series)
      }
    })
  }

  onMount(() => {
    state.chart?.timeScale().fitContent()
  })

  return (
    <div class="flex h-screen max-h-screen">
      <div class="w-[500px] flex-none space-y-12 overflow-y-scroll p-4">
        <A href="/">Go home</A>
        <Fiat
          {...state.fiat}
          setter={(key, value) =>
            value !== undefined &&
            setState('fiat', {
              [key]: key === 'currency' ? findCurrency(value) : Number(value),
            })
          }
        />
        <Frequency
          setter={(isDateAConversionDay) =>
            setState('frequency', {
              isDateAConversionDay,
            })
          }
        />
        <Interval
          setter={(start, end) =>
            setState('interval', {
              start,
              end,
            })
          }
        />
      </div>
      <Chart
        class="flex-1"
        options={{
          timeScale: {
            minBarSpacing: 0.01,
          },
          // handleScale: false,
          // handleScroll: false,
        }}
        setChart={(chart) => setState({ chart })}
      />
    </div>
  )
}
