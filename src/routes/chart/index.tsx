import { A } from 'solid-start'

import { store } from '/src/store'

import { Chart, Dialog } from '/src/components'

import Balanced from './components/balanced'
import CVDD from './components/cvdd'
import Investment from './components/investment'
import Market from './components/market'
import Realized from './components/realized'
import Terminals from './components/terminals'

// Show nostr/SN/blogs/podcasts history on chart

export default () => {
  const [state, setState] = createStore({
    chart: null as LightweightCharts.IChartApi | null,
    seriesAdded: 0,
  })

  const incrementSeriesAdded = () => setState('seriesAdded', (n) => n + 1)

  return (
    <div class="relative flex h-screen max-h-screen flex-col pb-2">
      <Chart
        setChart={(chart) => setState('chart', chart)}
        class={store.candlesticks.length ? 'opacity-100' : 'opacity-0'}
      />
      <div class="absolute top-0 left-0 z-10 m-4">
        <A href="/" class="text-sky-600 hover:underline">
          Home {state.seriesAdded}
        </A>
        <Dialog
          button={{
            icon: IconTablerSettings,
          }}
          title="Settings"
        >
          <Show when={state.seriesAdded >= 5}>
            <Market
              chart={state.chart}
              setCandlesticksFetched={
                () => {}
                // setState('candlesticksFetched', true)
              }
              setCrosshairCandlestick={
                (candle) => {}
                // setState('crosshairCandle', candle)
              }
              setVolumeMA={
                (dataList) => {}
                // setState('series', 'market', 'volumeMA', dataList)
              }
            />
          </Show>
          <Show when={state.seriesAdded >= 4}>
            <Realized chart={state.chart} onAdd={incrementSeriesAdded} />
          </Show>
          <Show when={state.seriesAdded >= 3}>
            <Balanced chart={state.chart} onAdd={incrementSeriesAdded} />
          </Show>
          <Show when={state.seriesAdded >= 2}>
            <CVDD chart={state.chart} onAdd={incrementSeriesAdded} />
          </Show>
          <Show when={state.seriesAdded >= 1}>
            <Terminals chart={state.chart} onAdd={incrementSeriesAdded} />
          </Show>
          <Show when={state.seriesAdded >= 0}>
            <Investment chart={state.chart} onAdd={incrementSeriesAdded} />
          </Show>
        </Dialog>
      </div>
    </div>
  )
}
