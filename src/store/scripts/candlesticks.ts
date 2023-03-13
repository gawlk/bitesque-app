import { binanceFetcher } from '.'

export const fetchCandlesticks = async () => {
  const candlesticks = createMutable(
    (
      await Promise.all([
        import('/src/assets/data/btcusd.json?raw').then(
          (i) => JSON.parse(i.default) as CandlestickDataWithVolume[]
        ),
        binanceFetcher.fetchBitcoinMarketChart(),
      ])
    ).flat()
  )

  binanceFetcher.createLiveCandlestickWebsocket((candlestick) => {
    const lastCandlestick = candlesticks.at(-1)

    if (!lastCandlestick || lastCandlestick.time !== candlestick.time) {
      candlesticks.push(candlestick)
    } else {
      Object.assign(lastCandlestick, candlestick)
    }
  })

  return candlesticks
}
