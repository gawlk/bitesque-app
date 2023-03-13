import { ColorSpace, mix, parse, sRGB, serialize, to } from 'colorjs.io/fn'
import { type ColorTypes } from 'colorjs.io/types/src/color'

ColorSpace.register(sRGB)

// Colors from UnoCSS: c-COLOR-500
export const colors = {
  black: '#000',
  gray: '#737373',
  white: '#fff',
  rose: '#f43f5e',
  pink: '#ec4899',
  fuchsia: '#d946ef',
  purple: '#a855f7',
  violet: '#8b5cf6',
  indigo: '#6366f1',
  blue: '#3b82f6',
  sky: '#0ea5e9',
  cyan: '#06b6d4',
  teal: '#14b8a6',
  emerald: '#10b981',
  green: '#22c55e',
  lime: '#84cc16',
  yellow: '#eab308',
  amber: '#f59e0b',
  orange: '#f97316',
  red: '#ef4444',
}

export const mixColors = (
  color1: string,
  color2: string,
  percentage?: number
) => colorToHex(mix(parse(color1), parse(color2), percentage as any))

export const getCandleToColor = (candle: LightweightCharts.CandlestickData) =>
  (candle.close || 1) > (candle.open || 0) ? colors.green : colors.red

const colorToHex = (color: ColorTypes | number) =>
  serialize(to(typeof color === 'number' ? String(color) : color, 'srgb'), {
    format: 'hex',
  })
