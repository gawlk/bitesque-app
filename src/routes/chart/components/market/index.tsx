import { Title } from '@solidjs/meta'
import { LineStyle } from 'lightweight-charts'

import { store } from '/src/store'

import {
  colors,
  debounce,
  getCandleToColor,
  priceToUSLocale,
} from '/src/scripts'

import {
  getAverageVolume,
  getVolumeBlockColor,
  setMinMaxMarkers,
} from './scripts'

import { DialogSelect, Label } from '/src/components'

import { createAutoscaleInfoProvider } from '../scripts'

interface Props {
  chart: LightweightCharts.IChartApi | null
  setCandlesticksFetched: () => void
  setCrosshairCandlestick: (candle: CandlestickDataWithVolume | null) => void
  setVolumeMA: (dataList: LightweightCharts.LineData[]) => void
}

export default (props: Props) => {
  const [state, setState] = createStore({
    volumeMA: 21,
  })

  createEffect(
    on(
      () => props.chart,
      (chart) => {
        if (!chart) return

        console.log('market: setup')

        const priceSeries = chart.addCandlestickSeries({
          upColor: colors.green,
          downColor: colors.red,
          wickUpColor: colors.green,
          wickDownColor: colors.red,
          borderVisible: false,
          priceLineVisible: false,
          lastValueVisible: false,
          autoscaleInfoProvider: createAutoscaleInfoProvider(true),
        })

        const priceLineOptions: LightweightCharts.PriceLineOptions = {
          price: 0,
          color: 'transparent',
          lineVisible: true,
          lineWidth: 1,
          lineStyle: 3,
          axisLabelVisible: true,
          title: '',
        }

        const priceLine = priceSeries.createPriceLine(priceLineOptions)

        const updatePriceLine = (candlestick: CandlestickDataWithVolume) =>
          priceLine.applyOptions({
            price: candlestick.close,
            color: getCandleToColor(candlestick),
          })

        const volumeOptions: Parameters<typeof chart.addHistogramSeries>[0] = {
          priceFormat: {
            type: 'volume' as const,
          },
          priceLineVisible: false,
          priceScaleId: '',
          lastValueVisible: false,
        }

        const volumeSeries = chart.addHistogramSeries({
          ...volumeOptions,
        })

        const volumeMASeries = chart.addLineSeries({
          ...volumeOptions,
          color: colors.white,
          lineWidth: 2,
          lineStyle: LineStyle.SparseDotted,
          crosshairMarkerVisible: false,
        })

        ;[volumeSeries, volumeMASeries].map((series) =>
          series.priceScale().applyOptions({
            scaleMargins: {
              top: 0.9,
              bottom: 0,
            },
          })
        )

        createEffect(
          on(
            () => !!store.candlesticks.length,
            () => {
              const { candlesticks } = store

              priceSeries.setData(
                candlesticks.map((data) => ({
                  time: data.time,
                  open: data.open,
                  high: data.high,
                  low: data.low,
                  close: data.close,
                }))
              )

              const averageVolumeData = getAverageVolume(
                candlesticks,
                state.volumeMA
              )

              volumeMASeries.setData(averageVolumeData)

              volumeSeries.setData(
                candlesticks.map((data, index) => ({
                  time: data.time,
                  value: data.volume,
                  color: getVolumeBlockColor(
                    data,
                    averageVolumeData[index].value
                  ),
                }))
              )

              setMinMaxMarkers(chart, priceSeries, candlesticks)

              props.setCandlesticksFetched()

              props.setVolumeMA(averageVolumeData)

              return true
            }
          )
        )

        createEffect(() => {
          const { lastCandlestick } = store

          if (lastCandlestick) {
            priceSeries.update({ ...lastCandlestick })

            updatePriceLine(lastCandlestick)
          }
        })

        chart.subscribeCrosshairMove(
          debounce((event: LightweightCharts.MouseEventParams) => {
            return

            // const priceSeriesData = event.seriesPrices.get(priceSeries)

            // priceSeriesData &&
            //   props.setCrosshairCandlestick({
            //     ...(priceSeriesData as unknown as LightweightCharts.CandlestickData),
            //     time: '',
            //     volume: event.seriesPrices.get(volumeSeries) as number,
            //   })
          })
        )
      }
    )
  )

  return () => (
    <>
      <Title>
        {() =>
          `${
            store.lastCandlestick
              ? `${priceToUSLocale(store.lastCandlestick.close)} | `
              : ''
          }bittemp`
        }
      </Title>
      <Label label="Price">
        <DialogSelect
          id="price-series-kind"
          button={{
            leftIcon: IconTablerCalendar,
            label: 'Series',
            text: 'state.settings.price.type',
          }}
          title="Select a kind"
          list={{
            selected: null,
            values: [
              {
                value: 'line',
                label: 'Line',
                icon: IconTablerChartLine,
              },
              {
                value: 'candlestick',
                label: 'Candles',
                icon: IconTablerChartCandle,
              },
            ],
          }}
          onClose={(value?: string) => {
            if (value) {
              // setState('chart', 'series', )
              console.log(value)
            }
          }}
        />
      </Label>
    </>
  )
}
