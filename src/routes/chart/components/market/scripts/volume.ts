import { average, colors, getCandleToColor, mixColors } from '/src/scripts'

export const getAverageVolume = (
  candlesticks: CandlestickDataWithVolume[],
  ma: number
) =>
  candlesticks.map((data, index, arr) => ({
    time: data.time,
    value:
      index >= ma - 1
        ? average(
            arr.slice(index - (ma - 1), index).map((data) => data.volume || 0)
          )
        : NaN,
  }))

export const getVolumeBlockColor = (
  candle: CandlestickDataWithVolume,
  averageVolume: number
) =>
  mixColors(
    colors.black,
    getCandleToColor(candle),
    (candle.volume || 0) > averageVolume * 1.5 ? 0.875 : 0.5
  )
