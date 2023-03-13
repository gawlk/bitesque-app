import { A } from 'solid-start'

import { findCurrency } from '/src/scripts'

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
    const { start: startDate, end: endDate } = state.interval
    console.log(startDate, endDate)

    const currentDate = new Date(startDate)

    while (currentDate <= endDate) {
      currentDate.setDate(currentDate.getDate() + 1)
    }

    console.log(currentDate)
  })

  return (
    <div class="flex h-full">
      <div class="w-[500px] space-y-12 overflow-y-scroll p-4">
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
      <Chart setChart={(chart) => setState({ chart })} class="flex-1" />
    </div>
  )
}
