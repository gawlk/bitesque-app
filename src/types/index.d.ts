interface CandlestickDataWithVolume extends LightweightCharts.CandlestickData {
  time: string
  volume: number
}

interface LineDataWithQuantity extends LightweightCharts.LineData {
  fiatQuantity: number
  bitcoinQuantity: number
}

interface RatioData extends Required<LightweightCharts.LineData> {
  cautiousRatio: number
  agressiveRatio: number | null
}
