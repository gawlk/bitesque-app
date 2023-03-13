import { createResizeObserver } from '@solid-primitives/resize-observer'
import { CrosshairMode, PriceScaleMode, createChart } from 'lightweight-charts'

import { priceToUSLocale } from '/src/scripts'

interface Props {
  setChart: (chart: LightweightCharts.IChartApi | null) => void
  class?: string
}

export const Chart = (props: Props) => {
  let chart: LightweightCharts.IChartApi | undefined
  let div: HTMLDivElement | undefined

  const computeChartDimensions = () => ({
    width: div?.clientWidth || 0,
    height: div?.clientHeight || 0,
  })

  onMount(() => {
    if (div) {
      const dimensions = computeChartDimensions()

      chart = createChart(div, {
        ...dimensions,
        layout: {
          fontFamily: window
            .getComputedStyle(document.body)
            .getPropertyValue('font-family'),
          background: { color: '#00000000' },
          textColor: '#ddd',
        },
        grid: {
          vertLines: { color: 'transparent' },
          horzLines: { color: 'transparent' },
        },
        rightPriceScale: {
          scaleMargins: { bottom: 0.2, top: 0.2 },
          mode: PriceScaleMode.Logarithmic,
          // borderVisible: false,
        },
        // timeScale: {
        //   borderVisible: false,
        // },
        crosshair: {
          mode: CrosshairMode.Normal,
          horzLine: {
            color: '#ffffff99',
            // labelBackgroundColor: '#fff',
          },
          vertLine: {
            color: '#ffffff99',
            labelBackgroundColor: '#fff',
          },
        },
        localization: {
          priceFormatter: priceToUSLocale,
          locale: 'en-us',
        },
      })

      props.setChart(chart)

      createResizeObserver(
        () => div as HTMLDivElement,
        () => {
          const chartDimensions = computeChartDimensions()

          chart?.resize(chartDimensions.width, chartDimensions.height)
        }
      )
    }
  })

  onCleanup(() => {
    chart?.remove()

    props.setChart(null)
  })

  return (
    <div
      ref={div}
      class={[
        'h-full transition-opacity duration-300 ease-out',
        props.class || '',
      ]
        .join(' ')
        .trim()}
    />
  )
}
