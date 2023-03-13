import { createFetcher, dateToString, debounce } from '/src/scripts'

type BinanceCandlestickData = [
  timestampFrom: number,
  open: string,
  high: string,
  low: string,
  close: string,
  volume: string,
  timestampTo: number
]

const convertRawToFetchedCandlestickData = (data: {
  time: number
  open: string
  high: string
  low: string
  close: string
  volume: string
}): CandlestickDataWithVolume => ({
  time: dateToString(new Date(data.time)),
  open: Number(data.open),
  high: Number(data.high),
  low: Number(data.low),
  close: Number(data.close),
  volume: Number(data.volume),
})

export const binanceFetcher = {
  ...createFetcher('https://www.binance.com/api/v3'),
  fetchBitcoinMarketChart: async function () {
    const limit = 1000

    let full = [] as BinanceCandlestickData[]
    let fetched = [] as BinanceCandlestickData[]
    let endTime = new Date().getTime()

    do {
      fetched = await this.fetchJSON<BinanceCandlestickData[]>(
        `/uiKlines?limit=${limit}&symbol=BTCUSDT&interval=1d&endTime=${endTime}`
      )

      if (fetched.length) {
        endTime = fetched[0][0] - 1
        full = [...fetched, ...full]
      }
    } while (fetched.length === limit)

    return full
      .filter(([time]) => time > new Date('2017-11-17').getTime())
      .map(([time, open, high, low, close, volume]: BinanceCandlestickData) =>
        convertRawToFetchedCandlestickData({
          time,
          open,
          high,
          low,
          close,
          volume,
        })
      )
  },
  createLiveCandlestickWebsocket: function (
    callback: (candlestick: CandlestickDataWithVolume) => void
  ) {
    const debouncedCallback = debounce(callback, 200)

    let ws: WebSocket | null = null

    let candlestick: CandlestickDataWithVolume | undefined

    const initWebSocket = () => {
      ws = new WebSocket(
        'wss://stream.binance.com:443/stream?streams=btcusdt@aggTrade/btcusdt@kline_1d'
      )

      ws.addEventListener('message', (event) => {
        const result = JSON.parse(event.data)

        const streamName = String(result.stream.split('@').pop())

        const data = result.data

        switch (streamName) {
          case 'kline_1d':
            candlestick = convertRawToFetchedCandlestickData({
              time: data.k.t,
              open: data.k.o,
              high: data.k.h,
              low: data.k.l,
              close: data.k.c,
              volume: data.k.v,
            })
            break
          case 'aggTrade':
            const time = dateToString(new Date(data.T))
            const close = Number(data.p)

            if (candlestick?.time === time) {
              candlestick = {
                time,
                open: !candlestick ? close : candlestick.open,
                high:
                  !candlestick || candlestick.high < close
                    ? close
                    : candlestick.high,
                low:
                  !candlestick || candlestick.low > close
                    ? close
                    : candlestick.low,
                close,
                volume: candlestick?.volume || 0,
              }
            } else {
              candlestick = undefined
            }
            break
        }

        candlestick && debouncedCallback({ ...candlestick })
      })
    }

    initWebSocket()

    document.addEventListener('focus', () => {
      if (!ws || ws.readyState === ws.CLOSED) {
        initWebSocket()
      }
    })
  },
}
