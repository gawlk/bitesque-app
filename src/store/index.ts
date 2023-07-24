import server$ from 'solid-start/server'

import { colors, mixColors } from '/src/scripts'

import { fetchCandlesticks, lookIntoBitcoinFetcher } from './scripts'

export const [store, setStore] = createStore({
  candlesticks: [] as CandlestickDataWithVolume[],
  realizedPrices: [] as LightweightCharts.SingleValueData[],
  balancedPrices: [] as LightweightCharts.SingleValueData[],
  cvddPrices: [] as LightweightCharts.SingleValueData[],
  terminal100Prices: [] as LightweightCharts.SingleValueData[],
  terminal75Prices: [] as LightweightCharts.SingleValueData[],
  terminal50Prices: [] as LightweightCharts.SingleValueData[],
  terminal25Prices: [] as LightweightCharts.SingleValueData[],
  ratios: [] as RatioData[],
  lastCandlestick: null as CandlestickDataWithVolume | null,
  init: async () => {
    console.log('init global store')

    const candlesticks = await fetchCandlesticks()

    setStore({
      candlesticks,
    })

    createEffect(() => {
      setStore('lastCandlestick', candlesticks.at(-1) || null)
    })

    const tuples: {
      fetcherKey: keyof typeof lookIntoBitcoinFetcher
      storeKey: keyof typeof store
    }[] = [
      {
        fetcherKey: 'fetchRealizedPrice',
        storeKey: 'realizedPrices',
      },
      {
        fetcherKey: 'fetchBalancedPrice',
        storeKey: 'balancedPrices',
      },
      {
        fetcherKey: 'fetchCVDDPrice',
        storeKey: 'cvddPrices',
      },
      {
        fetcherKey: 'fetchTerminalPrice',
        storeKey: 'terminal100Prices',
      },
    ]

    tuples.forEach((obj) => {
      const [_priceList, { refetch }] = createResource(
        obj.fetcherKey,
        // Sadly those 2 `key`s don't have the same type
        server$((key) => (lookIntoBitcoinFetcher as any)[key]())
      )

      createEffect(() => {
        const priceList = _priceList()

        if (priceList) {
          setStore({
            [obj.storeKey]: priceList,
          })
        }
      })
    })

    createEffect(() => {
      const { terminal100Prices } = store

      const parametersList: {
        storeKey: keyof typeof store
        multiplier: number
      }[] = [
        {
          storeKey: 'terminal75Prices',
          multiplier: 0.75,
        },
        {
          storeKey: 'terminal50Prices',
          multiplier: 0.5,
        },
        {
          storeKey: 'terminal25Prices',
          multiplier: 0.25,
        },
      ]

      parametersList.forEach((parameters) =>
        setStore({
          [parameters.storeKey]: terminal100Prices.map((data) => ({
            time: data.time,
            value: data.value ? data.value * parameters.multiplier : data.value,
          })),
        })
      )
    })

    createEffect(() => {
      const {
        realizedPrices,
        balancedPrices,
        cvddPrices,
        terminal100Prices,
        terminal75Prices,
        terminal50Prices,
        terminal25Prices,
      } = store

      if (
        !realizedPrices.length ||
        !balancedPrices.length ||
        !cvddPrices.length ||
        !terminal100Prices.length ||
        !terminal75Prices.length ||
        !terminal50Prices.length ||
        !terminal25Prices.length
      )
        return

      untrack(() => {
        const ratios: typeof store.ratios = []

        const colorBuy = colors.sky

        let top: number | null = null

        candlesticks.slice(0, -1).forEach((candlestick, index) => {
          const { low, high, close } = candlestick

          if (close < realizedPrices[index].value) {
            top = null
          }

          if (high > terminal100Prices[index].value) {
            top = terminal100Prices[index].value
          }

          let data: (typeof store.ratios)[number] = {
            time: candlestick.time,
            value: close,
            cautiousRatio: 0,
            agressiveRatio: null,
            color: colorBuy,
          }

          if (
            low < cvddPrices[index].value &&
            low < balancedPrices[index].value
          ) {
            data.cautiousRatio = 12
            data.color = colorBuy
          } else if (
            low < cvddPrices[index].value ||
            low < balancedPrices[index].value
          ) {
            data.cautiousRatio = 6
            data.color = mixColors(colors.black, colorBuy, 0.88)
          } else if (low < realizedPrices[index].value) {
            data.cautiousRatio = 3
            data.color = mixColors(colors.black, colorBuy, 0.66)
          } else if (!top && low < terminal25Prices[index].value) {
            data.cautiousRatio = 2
            data.color = mixColors(colors.black, colorBuy, 0.44)
          } else if (!top && low < terminal50Prices[index].value) {
            data.cautiousRatio = 1.5
            data.color = mixColors(colors.black, colorBuy, 0.22)
          } else if (!top && low < terminal75Prices[index].value) {
            data.agressiveRatio = 1
            data.color = mixColors(colors.black, colors.yellow, 0.22)
          } else if (!top) {
            data.agressiveRatio = -3
            data.color = mixColors(colors.black, colors.amber, 0.33)
          } else if (top && close > top) {
            data.agressiveRatio = -6
            data.color = mixColors(colors.black, colors.orange, 0.44)
          } else {
            data.color = mixColors(colors.black, colors.emerald, 0.22)
          }

          ratios.push(data)
        })

        setStore({
          ratios,
        })
      })
    })
  },
})
