interface RawCurrency {
  symbol: string
  name: string
  icon?: (...args: any[]) => Solid.JSX.Element
}

interface Currency extends RawCurrency {
  icon: (...args: any[]) => Solid.JSX.Element
}
