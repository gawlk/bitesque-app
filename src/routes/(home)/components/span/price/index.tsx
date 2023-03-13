import { A } from 'solid-start'

import { store } from '/src/store'

import { priceToUSLocale } from '/src/scripts'

import Span from '../base'

export default () => {
  return (
    <Span
      title="Price"
      icon={IconTablerTimeline}
      class="row-span-2 bg-green-600"
      cells={[]}
    >
      Btc vs dlr (live - 1h/4h/12h/1D/1W/1Y/EOY/All) price + temp
      <div class="flex h-full w-full items-center justify-center">
        <span class="text-4xl font-bold">
          {store.lastCandlestick
            ? priceToUSLocale(store.lastCandlestick.close)
            : ''}
        </span>
      </div>
      <A href="/chart">Go to chart</A>
      <A href="/simulation">Go to simulation</A>
    </Span>
  )
}
