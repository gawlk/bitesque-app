import server$ from 'solid-start/server'

import { colors, mixColors } from '/src/scripts'

import { fetchCandlesticks, lookIntoBitcoinFetcher } from './scripts'

export const [store, setStore] = createStore({
  candlesticks: [] as CandlestickDataWithVolume[],
  realizedPrice: [] as LightweightCharts.SingleValueData[],
  balancedPrice: [] as LightweightCharts.SingleValueData[],
  cvddPrice: [] as LightweightCharts.SingleValueData[],
  terminalPrice100: [] as LightweightCharts.SingleValueData[],
  terminalPrice75: [] as LightweightCharts.SingleValueData[],
  terminalPrice50: [] as LightweightCharts.SingleValueData[],
  terminalPrice25: [] as LightweightCharts.SingleValueData[],
  percentageRatio: [] as Required<LightweightCharts.LineData>[],
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
        storeKey: 'realizedPrice',
      },
      {
        fetcherKey: 'fetchBalancedPrice',
        storeKey: 'balancedPrice',
      },
      {
        fetcherKey: 'fetchCVDDPrice',
        storeKey: 'cvddPrice',
      },
      {
        fetcherKey: 'fetchTerminalPrice',
        storeKey: 'terminalPrice100',
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
      const { terminalPrice100 } = store

      const parametersList: {
        storeKey: keyof typeof store
        multiplier: number
      }[] = [
        {
          storeKey: 'terminalPrice75',
          multiplier: 0.75,
        },
        {
          storeKey: 'terminalPrice50',
          multiplier: 0.5,
        },
        {
          storeKey: 'terminalPrice25',
          multiplier: 0.25,
        },
      ]

      parametersList.forEach((parameters) =>
        setStore({
          [parameters.storeKey]: terminalPrice100.map((data) => ({
            time: data.time,
            value: data.value ? data.value * parameters.multiplier : data.value,
          })),
        })
      )
    })

    createEffect(() => {
      const {
        realizedPrice,
        balancedPrice,
        cvddPrice,
        terminalPrice100,
        terminalPrice75,
        terminalPrice50,
        terminalPrice25,
      } = store

      if (
        !realizedPrice.length ||
        !balancedPrice.length ||
        !cvddPrice.length ||
        !terminalPrice100.length ||
        !terminalPrice75.length ||
        !terminalPrice50.length ||
        !terminalPrice25.length
      )
        return

      untrack(() => {
        const percentageRatio: typeof store.percentageRatio = []

        const colorBuy = colors.sky
        const colorCaution = colors.yellow
        const colorSell = colors.orange
        const colorWait = colors.emerald

        let top: number | null = null

        candlesticks.slice(0, -1).forEach((candlestick, index) => {
          const { low, high, close } = candlestick

          if (close < realizedPrice[index].value) {
            top = null
          }

          if (high > terminalPrice100[index].value) {
            top = terminalPrice100[index].value
          }

          let data: (typeof store.percentageRatio)[number] = {
            time: candlestick.time,
            value: 1,
            color: colorBuy,
          }

          if (
            low < cvddPrice[index].value &&
            low < balancedPrice[index].value
          ) {
            data.value = 1
            data.color = colorBuy
          } else if (
            low < cvddPrice[index].value ||
            low < balancedPrice[index].value
          ) {
            data.value = 1
            data.color = mixColors(colors.black, colorBuy, 0.75)
          } else if (low < realizedPrice[index].value) {
            data.value = 1
            data.color = mixColors(colors.black, colorBuy, 0.66)
          } else if (!top && low < terminalPrice25[index].value) {
            data.value = 1
            data.color = mixColors(colors.black, colorBuy, 0.45)
          } else if (!top && low < terminalPrice50[index].value) {
            data.value = 1
            data.color = mixColors(colors.black, colorBuy, 0.33)
          } else if (top && close > top) {
            data.value = 1
            data.color = mixColors(colors.black, colorSell, 0.33)
          } else if (top) {
            data.value = 1
            data.color = mixColors(colors.black, colorWait, 0.33)
          } else {
            data.value = 1
            data.color = mixColors(colors.black, colorCaution, 0.33)
          }

          percentageRatio.push(data)
        })

        setStore({
          percentageRatio,
        })
      })
    })
  },
})
